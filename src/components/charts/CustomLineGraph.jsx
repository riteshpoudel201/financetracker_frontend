import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CustomLineGraph = ({ data, lineColor }) => {
  // Function to find the nearest multiple of 1000
  const findNearestThousand = (value) => {
    return Math.floor(value / 1000) * 1000;
  };

  // Find min and max values for the Y-axis
  const dataMax = Math.max(...data.map((d) => d.amount));
  const dataMin = Math.min(...data.map((d) => d.amount));

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <ResponsiveContainer width="100%" height="100%" className="bg-blue-300 rounded-md shadow-md">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis dataKey="date" />
          <YAxis
            domain={[
              findNearestThousand(dataMin), // nearest 1000 below the min value
              findNearestThousand(dataMax) + 1000, // nearest 1000 above the max value
            ]}
            tickFormatter={(tick) => `${tick / 1000}K`} // Format ticks in thousands
          />
          <Line 
            type="monotone" 
            dataKey="amount" 
            name={data[0]?.type.toUpperCase()} 
            stroke={lineColor || "blue"} 
          />
          <Legend 
            color={`${data[0]?.type === "expense" ? "red" : "blue"}`} 
            className={`${data[0]?.type === "expense" ? "text-red-500" : "text-blue-500"}`} 
          />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineGraph;
