import { Link, NavLink, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import Logo from "./Logo";
import LoginIcon from "../icons/LoginIcon";
import RegisterIcon from "../icons/RegisterIcon";
import DashboardIcon from "../icons/DashboardIcon";
import TransactionIcon from "../icons/TransactionIcon";
import LogoutIcon from "../icons/LogoutIcon";
import { useState } from "react";
import { Button } from "flowbite-react";

const Header = () => {
  const { user, setUser } = useUserContext();
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("welcomeMessageLastShown");
    setUser(null);
    navigate("/");
  };

  const toggleNavbar = () => {
    setIsOpen((prev) => !prev);
  };

  
  

  return (
    <>
      <nav className="w-full h-auto sticky top-0 bg-white shadow-md z-50">
        <div className="container mx-auto flex items-center justify-between p-4">
          {/* Navbar Brand */}
          <Link
            to={`${user?._id ? "/dashboard" : "/"}`}
            className="flex items-center"
          >
            <Logo />
          </Link>

          {/* Navbar Toggle (for smaller screens) */}
          <button
            className="block lg:hidden text-gray-700 focus:outline-none"
            onClick={toggleNavbar}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>

          {/* Navbar Collapse */}
          <div
            className={`${
              isOpen
                ? "flex flex-col absolute top-[10vh] right-0 w-[90vw] bg-zinc-200 px-3 py-5"
                : "hidden"
            } lg:flex flex-col lg:flex-row lg:items-center lg:space-x-6 uppercase w-full lg:w-auto`}
          >
            {!user?._id ? (
              <>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block lg:inline-block py-2 lg:py-0 text-gray-700 hover:text-gray-900 ${
                      isActive ? "font-bold text-gray-900" : ""
                    }`
                  }
                >
                  <div className="flex items-center gap-1">
                    <LoginIcon />
                    Login
                  </div>
                </NavLink>
                <NavLink
                  to="/create-account"
                  className={({ isActive }) =>
                    `block lg:inline-block py-2 lg:py-0 text-gray-700 hover:text-gray-900 ${
                      isActive ? "font-bold text-gray-900" : ""
                    }`
                  }
                >
                  <div className="flex items-center gap-1">
                    <RegisterIcon />
                    Register
                  </div>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `block lg:inline-block py-2 lg:py-0 text-gray-700 hover:text-gray-900 ${
                      isActive ? "font-bold text-gray-900" : ""
                    }`
                  }
                >
                  <div className="flex items-center gap-1">
                    <DashboardIcon />
                    Dashboard
                  </div>
                </NavLink>
                <NavLink
                  to="/transaction"
                  className={({ isActive }) =>
                    `block lg:inline-block py-2 lg:py-0 text-gray-700 hover:text-gray-900 ${
                      isActive ? "font-bold text-gray-900" : ""
                    }`
                  }
                >
                  <div className="flex items-center gap-1">
                    <TransactionIcon />
                    Transaction
                  </div>
                </NavLink>
                <Button onClick={handleLogout} gradientMonochrome="failure">
                  Logout <LogoutIcon className="ml-1" />
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>
      
    </>
  );
};

export default Header;
