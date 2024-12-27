import {
  Checkbox,
  Label,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "flowbite-react";
import { DateTime } from "luxon";
import EditTransaction from "./EditTransaction";

const TransactionTable = ({
  handleCheckedChange,
  filteredTransactions,
  selectedTransactions,
}) => {
  return (
    <Table className="transaction border-l-2 border-r-2 border-t-2 border-cyan-800 dark:border-gray-700 shadow-md px-2 rounded-b-md text-center">
      <caption className="text-2xl font-bold bg-cyan-800 text-white rounded-t-md relative py-4">
        Transactions
      </caption>
      <thead className="bg-cyan-800 text-white py-3 uppercase pb-3">
        <tr>
          <th><Checkbox
            title={"Select All Checkbox"}
            name="selectAll"
            id="selectAll"
            onChange={handleCheckedChange}
          />
          <Label htmlFor="selectAll" className="ml-2 text-inherit">Title</Label></th>
          <th>In</th>
          <th>Out</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
        
      </thead>
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
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white flex justify-center gap-1">
                  <Checkbox
                    value={transaction._id}
                    name="select"
                    id={transaction._id}
                    onChange={handleCheckedChange}
                    checked={selectedTransactions.has(transaction._id)}
                  />
                  {transaction.title}
                </TableCell>
              <TableCell className="text-green-500">
                {transaction.type === "income"
                  ? "+Rs. " + transaction.amount
                  : ""}
              </TableCell>
              <TableCell className="text-red-500">
                <Label htmlFor={transaction?._id} className="w-full h-full">
                  {transaction.type === "expense"
                    ? "-Rs. " + transaction.amount
                    : ""}
                </Label>
              </TableCell>
              <TableCell>
                {DateTime.fromISO(transaction.date).toLocaleString({
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </TableCell>

              <TableCell className="flex justify-center">
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
  );
};

export default TransactionTable;
