import { getUser } from "./axiosHelper";

export const autoLogin = async () => {
  const token = JSON.parse(localStorage.getItem("token")) || "";
  if (token.length > 0) {
    return await getUser(token);
  }
};

export const getLocalToken = async () => {
  return await JSON.parse(localStorage.getItem("token")) || "";
}
