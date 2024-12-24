import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Transaction from "./pages/Transaction";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Auth from "./components/common/Auth";
const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/create-account" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <Auth>
            <Dashboard />
          </Auth>
        }
      />
      <Route
        path="/transaction"
        element={
          <Auth>
            <Transaction />
          </Auth>
        }
      />
    </Routes>
  );
};

export default PageRoutes;
