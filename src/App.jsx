import PageRoutes from "./PageRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="min-h-screen min-w-screen">
      <PageRoutes />
      <ToastContainer closeOnClick theme="light" limit={1} />
    </div>
  );
};
export default App;
