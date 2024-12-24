import { Button, Label, Select, TextInput } from "flowbite-react";
import { useForm } from "../../hooks/useForm";
import { toast } from "react-toastify";
import { postTransaction } from "../../utils/axiosHelper";
import { useUserContext } from "../../context/UserContext";
import PlusIcon from "../icons/PlusIcon";
import { useState } from "react";
import CrossIcon from "../icons/CrossIcon";
const initialState = {
  type: "",
  amount: "",
  title: "",
  date: "",
};

const fields = [
  {
    label: "Title",
    name: "title",
    type: "text",
    placeholder: "Enter Title",
  },
  {
    label: "Amount",
    name: "amount",
    type: "number",
    placeholder: "Enter Amount",
  },
  {
    label: "Type",
    name: "type",
    type: "select",
    options: [
      { value: "income", label: "Income" },
      { value: "expense", label: "Expense" },
    ],
  },
  {
    label: "Date",
    name: "date",
    type: "date",
    placeholder: "Enter Date",
  },
];
const TransactionForm = () => {
  const { form, handleChange } = useForm(initialState);
  const { fetchTransactions } = useUserContext();
  const [isModelOpen, setIsModelOpen] = useState(false);

  // const modelRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pending = postTransaction(form);
    toast.promise(pending, {
      pending: "Adding Transaction...",
    });

    const { status, message } = await pending;

    toast[status](message);
    if (status === "success") {
      e.target.reset();
      setIsModelOpen(false);
     await fetchTransactions();
     const event = new CustomEvent("transactionAdded");
     dispatchEvent(event);

    }
  };
  return (
    <>
      <Button
        className="flex justify-center items-center text-nowrap"
        onClick={() => setIsModelOpen((prev) => !prev)}
      >
        <PlusIcon className="text-inherit mr-2" />
        <span className="hidden sm:inline-block">Add New Transaction</span>
      </Button>
      <div
        className={`${
          isModelOpen ? "flex flex-col" : "hidden"
        } fixed inset-0 w-full h-full bg-black/50 border-[1px] z-50 m-auto flex justify-center items-center`}
         onClick={() => setIsModelOpen(false)}
      >
        <div className="w-[98%] h-[80vh] lg:w-1/2 bg-white px-4 pt-4  rounded-md relative" onClick={(e) => e.stopPropagation()}>
          <h1 className="text-2xl font-bold text-center mb-4">Transaction Form</h1>
          <div className="float-right">
            <span className="absolute top-4 right-4 cursor-pointer" onClick={() => setIsModelOpen(false)}>
              <CrossIcon />
            </span>
          </div>
          <form className=" flex flex-col gap-3 relative z-[51]" onSubmit={handleSubmit}>
            {fields.map((field, index) => {
              return (
                <div className="flex flex-col gap-1" key={index}>
                  <Label htmlFor={field.name}>{field.label}</Label>
                  {field.type === "select" ? (
                    <Select
                      name={field.name}
                      id={field.name}
                      onChange={handleChange}
                    >
                      <option value="">Select Type</option>
                      {field.options.map((option, index) => {
                        return (
                          <option value={option.value} key={index}>
                            {option.label}
                          </option>
                        );
                      })}
                    </Select>
                  ) : (
                    <TextInput
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      onChange={handleChange}
                    />
                  )}
                </div>
              );
            })}

            <Button type="submit">Add Transaction</Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default TransactionForm;
