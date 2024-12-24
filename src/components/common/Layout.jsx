import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { useUserContext } from "../../context/UserContext";
import Header from './Header';

const Layout = ({ children, className }) => {
  const { user } = useUserContext();
 const navigate = useNavigate();
 const location = useLocation();
 const goTo = location.state?.from?.pathname || "/dashboard";
  useEffect(() => {
    user?._id && navigate(goTo);
  }, [goTo, navigate, user?._id, user?.token]);
    
  
  return (
    <>
      <Header />
      <div className={`min-w-screen min-h-screen ${className}`}>{children}</div>
    </>
  );
};

export default Layout;
