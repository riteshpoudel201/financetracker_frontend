import { useCallback, useEffect, useState } from "react";
import CustomBarGraph from "../components/charts/CustomBarGraph";
import CustomPieChart from "../components/charts/CustomPieChart";
import ProtectedLayout from "../components/common/ProtectedLayout";
import WelcomeMessage from "../components/WelcomeMessage";
import { useUserContext } from "../context/UserContext";
import CustomLineGraph from "../components/charts/CustomLineGraph";
import BalanceIcon from "../components/icons/BalanceIcon";
import IncomeIcon from "../components/icons/IncomeIcon";
import ExpenseIcon from "../components/icons/ExpenseIcon";
const Dashboard = () => {
  const { user, transactions } = useUserContext();
  const [data, setData] = useState([]);
  const [expense, setExpense] = useState([]);
  const [income, setIncome] = useState([]);

  //calculating total expenses
  const getTotalExpense = useCallback(() => {
    const total = transactions.reduce((acc, transaction) => {
      return (
        acc + parseInt(transaction.type === "expense" ? transaction.amount : 0)
      );
    }, 0);
    return total;
  }, [transactions]);

  //calculating total income
  const getTotalIncome = useCallback(() => {
    const total = transactions.reduce((acc, transaction) => {
      return (
        acc + parseInt(transaction.type === "income" ? transaction.amount : 0)
      );
    }, 0);
    return total;
  }, [transactions]);

  //formatting transaction so that it can be viewd in bar graph date wise
  const groupByDate = (data) => {
    const groupedData = data.reduce((acc, current) => {
      // format the date (removing time)
      const formattedDate = new Date(current.date).toISOString().split("T")[0];

      // if date exists in acc , update the income/expense values
      if (acc[formattedDate]) {
        if (current.type === "income") {
          acc[formattedDate].income += Number(current.amount);
        } else if (current.type === "expense") {
          acc[formattedDate].expense += Number(current.amount);
        }
      } else {
        // if no date, initialize it with corresponding income/expense
        acc[formattedDate] = {
          date: formattedDate,
          income: current.type === "income" ? Number(current.amount) : 0,
          expense: current.type === "expense" ? Number(current.amount) : 0,
        };
      }

      return acc;
    }, {});

    // converting the object to an array and sort it by date
    return Object.values(groupedData).sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
  };

  useEffect(() => {
    //setting data for viewing total expenses and income in pie chart
    setData([
      {
        name: "Income",
        value: getTotalIncome() || 0,
      },
      {
        name: "Expenses",
        value: getTotalExpense() || 0,
      },
    ]);

    //filtering and setting all the income to state after formatting date
    const income = transactions
      .filter((transaction) => transaction.type === "income")
      .map(({ date, ...rest }) => ({
        ...rest,
        date: new Date(date).toISOString().split("T")[0],
      }));
    setIncome(income);

    //filtering and setting all the expenses to state after formatting date
    const expense = transactions
      .filter((transaction) => transaction.type === "expense")
      .map(({ date, ...rest }) => ({
        ...rest,
        date: new Date(date).toISOString().split("T")[0],
      }));
    setExpense(expense);
  }, [getTotalExpense, getTotalIncome, transactions]);

  return (
    <ProtectedLayout>
      {user?._id && <WelcomeMessage />}
      <section className="w-full h-full flex flex-col items-start justify-center overflow-hidden">
        <h1 className="text-2xl font-bold text-black w-full">Dashboard </h1>
        {transactions.length === 0 && (
          <p className="text-gray-500 text-sm mt-3">
            Add Transaction to view in graphs.
          </p>
        )}
        <div className="w-full grid grid-cols-1 grid-rows-3 lg:grid-cols-3 lg:grid-rows-1 gap-3 mt-4">
          <div className="grid grid-rows-2 grid-cols-1 sm:grid-cols-2 sm:grid-rows-1 place-items-center bg-blue-300 rounded-md py-5 px-3 h-[200px]">
            <BalanceIcon className="text-cyan-600" />
            <div className="flex flex-col items-center justify-evenly">
              <h1 className="text-2xl text-nowrap">Total Balance</h1>
              <p
                className={`text-3xl font-bold ${
                  getTotalIncome() - getTotalExpense() > 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {getTotalIncome() - getTotalExpense()}
              </p>
            </div>
          </div>
          <div className="grid grid-rows-2 grid-cols-1 sm:grid-cols-2 sm:grid-rows-1 place-items-center bg-blue-300 rounded-md py-5 px-3 h-[200px]">
            <IncomeIcon className="text-green-600" />
            <div className="flex flex-col items-center justify-evenly bg-blue-300 rounded-md py-5 px-3">
              <h1 className="text-2xl text-nowrap">Total Income</h1>
              <p className="text-3xl font-bold">{getTotalIncome()}</p>
            </div>
          </div>
          <div className="grid grid-rows-2 grid-cols-1 sm:grid-cols-2 sm:grid-rows-1 place-items-center bg-blue-300 rounded-md py-5 px-3 h-[200px]">
            <ExpenseIcon className="text-red-600" />
            <div className="flex flex-col items-center justify-evenly bg-blue-300 rounded-md py-5 px-3">
              <h1 className="text-2xl text-nowrap">Total Expense</h1>
              <p className="text-3xl font-bold">{getTotalExpense()}</p>
            </div>
          </div>
        </div>
        <div className="w-full h-full grid grid-flow-row gap-2 place-items-center mt-4 mb-20">
          <div className="w-full h-full flex flex-col lg:flex-row  gap-3">
            {data && transactions[0]?.amount > 0 && (
              <CustomPieChart data={data} />
            )}

            {getTotalIncome() > 0 && (
              <CustomLineGraph data={income} lineColor="green" />
            )}
            {getTotalIncome() > 0 && (
              <CustomLineGraph data={expense} lineColor="red" />
            )}
          </div>
          {transactions[0]?.amount > 0 && (
            <CustomBarGraph
              data={groupByDate(transactions)}
              types={["income", "expense"]}
            />
          )}
        </div>
      </section>
    </ProtectedLayout>
  );
};

export default Dashboard;
