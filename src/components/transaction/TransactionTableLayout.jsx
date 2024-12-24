import { Button, TextInput } from "flowbite-react";
import { useUserContext } from "../../context/UserContext";
import { useEffect, useState } from "react";
import TransactionForm from "./TransactionForm";
import TransactionTable from "./TransactionTable";
import { deleteTransaction } from "../../utils/axiosHelper";
import { toast } from "react-toastify";

const TransactionTableLayout = () => {
  const { transactions, fetchTransactions } = useUserContext();
  const [filteredTransactions, setFilteredTransactions] = useState();
  const [selectedTransactions, setSelectedTransactions] = useState(new Set());

  const handleSearch = (e) => {
    const filters = transactions.filter((transaction) =>
      transaction.title.toLowerCase().includes(e.target.value)
    );
    if (e.target.value === "") {
      setFilteredTransactions(transactions);
      return;
    }
    setFilteredTransactions(filters);
  };

  const handleCheckedChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "selectAll") {
      if (checked) {
        setSelectedTransactions(
          new Set(transactions.map((transaction) => transaction._id))
        );
      } else {
        setSelectedTransactions(new Set());
      }
      return;
    }

    setSelectedTransactions((prev) => {
      const updatedSet = new Set(prev);
      if (checked) {
        updatedSet.add(value);
      } else {
        updatedSet.delete(value);
      }
      return updatedSet;
    });
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    const pending = deleteTransaction([...selectedTransactions]);
    toast.promise(pending, {
      pending: "Deleting Transactions...",
    });
    const { status, message } = await pending;
    toast[status](message);
    if (status === "success") {
      setSelectedTransactions(new Set());
      fetchTransactions();
    }
  };

  useEffect(() => {
    setFilteredTransactions(transactions);
  }, [transactions]);

  return (
    <div className="overflow-x-auto w-[95%] mx-auto mt-4 mb-4">
      <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-3 py-3 px-2">
        <span className="text-gray-600">
          {filteredTransactions?.length} transaction(s) listed.
        </span>
        <div className="flex flex-nowrap gap-3 grow-[1] w-full">
          <TextInput
            placeholder="Search here..."
            className="grow-[1]"
            onChange={handleSearch}
          />
          <TransactionForm />
        </div>
      </div>
      {filteredTransactions?.length > 0 ? (
        <>
        <p className="text-gray-500 text-sm text-center mb-3"> Click on transaction title to select for deletion purpose.</p>
          <TransactionTable
            handleCheckedChange={handleCheckedChange}
            filteredTransactions={filteredTransactions}
            selectedTransactions={selectedTransactions}
          />
        </>
      ) : (
        <div className="text-center text-2xl text-gray-600">
          No transactions found
        </div>
      )}
      {[...selectedTransactions].length > 0 && (
        <Button
          gradientMonochrome="failure"
          className="w-full h-full rounded-b-md rounded-t-none"
          onClick={handleDelete}
        >
          Delete {[...selectedTransactions].length} transaction(s)
        </Button>
      )}
    </div>
  );
};

export default TransactionTableLayout;
