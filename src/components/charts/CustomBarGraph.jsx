import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const colors = ["#0088FE", "red"];

const CustomBarGraph = ({ data, types }) => {
  
  return (
    <div className="w-full h-[400px] bg-blue-300 rounded-md grid grid-rows-1 place-items-center overflow-x-auto">
      <BarChart width={1250} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        {types.map((type, index) => (
          <Bar key={type} dataKey={type} fill={colors[index % 2]} name={type.toUpperCase()}/>
        ))}
        <Legend />
      </BarChart>
    </div>
  );
};

export default CustomBarGraph;
