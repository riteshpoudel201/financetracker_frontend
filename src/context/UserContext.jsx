import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { autoLogin } from "../utils/user";
import { getTransactions } from "../utils/axiosHelper";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = useCallback(async () => {
    const { status, transactions } = await getTransactions();
    status === "success" && setTransactions(transactions);
  }, []);
  const updateUser = useCallback(async () => {
    const userData = await autoLogin();
    setUser((prev) => ({
      ...prev,
      _id: userData?.user?._id,
      email: userData?.user?.email,
      name: userData?.user?.name,
      token: userData?.token,
    }));
  }, []);

  useEffect(()=>{
    fetchTransactions()
  },[fetchTransactions, user])

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token")) || "";
    if (token.length > 0) {
      setUser((prevUser) => ({ ...prevUser, token }));
      updateUser();
    }
    fetchTransactions();
    window.addEventListener("transactionAdded", fetchTransactions());
    return () => {
      window.removeEventListener("transactionAdded", fetchTransactions());
    };
  }, [fetchTransactions, updateUser]);

  return (
    <UserContext.Provider
      value={{ user, setUser, transactions, fetchTransactions }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => useContext(UserContext);
