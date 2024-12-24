import { Navigate, useLocation } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

const Auth = ({ children }) => {
  const { user } = useUserContext();
  const location = useLocation();
  return user?._id ? children : <Navigate to="/" replace state={{from: location}}/>;
};

export default Auth;
