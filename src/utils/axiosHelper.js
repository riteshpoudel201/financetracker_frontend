import axios from "axios";
import { getLocalToken } from "./user";

const baseUrl = import.meta.env.VITE_API_URL;
const apiProcessor = async (method, url, data = {}, isSendToken = false) => {
  try {
    const token = isSendToken ? await getLocalToken() : null;
    const config = token ? { headers: { Authorization: `${token}` } } : {};
    const response = await axios({
      method,
      url,
      data, 
      ...config,
    });

    return response.data;
  } catch (error) {
    return {
      status: "error",
      message: error.response?.data?.message || error.message,
    };
  }
};


export const postNewUser = async (data) => {
  return await apiProcessor("post", `${baseUrl}/users`, data);
};
export const loginUser = async (data) => {
  return await apiProcessor("post", `${baseUrl}/login`, data);
};

export const getUser =async ()=>{
    return await apiProcessor("get", `${baseUrl}/users/verify`,null, true);
}

export const getTransactions = async () => {
  return await apiProcessor("get", `${baseUrl}/transactions`, null, true);
};

export const postTransaction = async (data) => {
  return await apiProcessor("post", `${baseUrl}/transactions`, data, true);
}
export const updateTransaction = async (data) => {
  return await apiProcessor("put", `${baseUrl}/transactions`, data, true);
}
export const deleteTransaction = async (id) => {
  return await apiProcessor("delete", `${baseUrl}/transactions`, { id }, true);
}

export const getRandomQuotes = async (setFact) => {
  const response = await axios.get(import.meta.env.VITE_RANDOM_QUOTE_API_URL, {
    headers: {
      "X-Api-Key": `${import.meta.env.VITE_RANDOM_QUOTE_API_KEY}`,
    },
  });
  setFact(response?.data[0]?.fact);
};