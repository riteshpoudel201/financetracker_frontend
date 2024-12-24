import {
    Checkbox,
    Label,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeadCell,
    TableRow,
  } from "flowbite-react";
import { DateTime } from "luxon";
import EditTransaction from "./EditTransaction";

const TransactionTable = ({handleCheckedChange, filteredTransactions, selectedTransactions}) => {
  return (
    <Table className="transaction border-l-2 border-r-2 border-t-2 border-cyan-800 dark:border-gray-700 shadow-md px-2 rounded-b-md">
        <caption className="text-2xl font-bold bg-cyan-800 text-white rounded-t-md relative">
          <div className="flex items-center gap-2 absolute top-2 left-2">
            <Checkbox
              title={"Select All Checkbox"}
              name="selectAll"
              onChange={handleCheckedChange}
            />
            <Label className="text-white">Select All</Label>
          </div>
          Transactions
        </caption>
        <TableHead style={{ backgroundColor: "#000" }}>
          <TableHeadCell>Title</TableHeadCell>
          <TableHeadCell>In</TableHeadCell>
          <TableHeadCell>Out</TableHeadCell>
          <TableHeadCell>Date</TableHeadCell>
          <TableHeadCell>
            <span className="sr-only">Edit</span>
          </TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {filteredTransactions?.length > 0 &&
            filteredTransactions.map((transaction) => (
              <TableRow
                key={transaction._id}
                className={`dark:border-gray-700 dark:bg-gray-800 ${
                  selectedTransactions.has(transaction._id)
                    ? "bg-cyan-100"
                    : "bg-white"
                }`}
              >
                <Label htmlFor={transaction._id}>
                  <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white flex gap-1">
                    <Checkbox
                      className="hidden"
                      value={transaction._id}
                      name="select"
                      id={transaction._id}
                      onChange={handleCheckedChange}
                      checked={selectedTransactions.has(transaction._id)}
                    />
                    {transaction.title}
                  </TableCell>
                </Label>
                <TableCell className="text-green-500">
                  {transaction.type === "income"
                    ? "+Rs. " + transaction.amount
                    : ""}
                </TableCell>
                <TableCell className="text-red-500">
                  {transaction.type === "expense"
                    ? "-Rs. " + transaction.amount
                    : ""}
                </TableCell>
                <TableCell>
                  {DateTime.fromISO(transaction.date).toLocaleString({
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell>
                  
                    <EditTransaction transaction={transaction} />
            
                </TableCell>
              </TableRow>
            ))}
          <TableRow className="bg-cyan-800 text-white dark:border-gray-700 dark:bg-gray-800 ">
            <TableCell
              className="whitespace-nowrap font-bold text-centerdark:text-white !rounded-none"
              colSpan={2}
            >
              Total Balance:
            </TableCell>
            <TableCell colSpan="4" className="!rounded-none">
              Rs.{" "}
              {filteredTransactions?.reduce((acc, transaction) => {
                if (transaction.type === "income") {
                  return acc + parseInt(transaction.amount);
                } else {
                  return acc - parseInt(transaction.amount);
                }
              }, 0)}
            </TableCell>
          </TableRow>
        </TableBody>
        
      </Table>
  )
}

export default TransactionTable