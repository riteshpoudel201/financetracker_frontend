import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import Layout from "../components/common/Layout";
import { useForm } from "../hooks/useForm";
import { loginUser } from "../utils/axiosHelper";
import { toast } from "react-toastify";
import Coins from "../components/icons/Coins";
import { useUserContext } from "../context/UserContext";

const Login = () => {
  const { setUser } = useUserContext();
const navigate = useNavigate();
  const { form, handleChange, loading, setLoading } = useForm({});

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const pendingPromise = loginUser(form);
    toast.promise(pendingPromise, { pending: "Logging in..." });
    const { status, message, token, _id, email, name } = await pendingPromise;
    toast[status](message);
    if (status === "success") {
      if (e.target.remember.checked) {
        localStorage.setItem("token", JSON.stringify(token));
      }
      setUser({_id, email,name, token });
      toast.dismiss();
      navigate("/dashboard");
    }
    setLoading(false);
  };

  return (
    <Layout className={`flex justify-center items-center overflow-y-hidden`}>
      <section className="min-w-sm w-[99vw] h-fit sm:w-[630px] max-w-screen-md bg-zinc-200 text-cyan-800 sm:bg-cyan-700 sm:text-zinc-100 grid grid-rows-1 sm:grid-cols-2 place-items-center rounded-lg ">
        <div className="w-full h-full flex flex-col justify-center items-center py-3 px-2">
          <Coins />
          <h1 className="block text-2xl font-bold self-center">
            Login to Finance Tracker
          </h1>
        </div>
        <form
          className="flex flex-col gap-4 w-full px-5 py-5 justify-center bg-zinc-200 rounded-tr-lg rounded-br-lg"
          onSubmit={handleSubmit}
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="ram@gmail.com"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput
              id="password1"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="password"
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remember" name="remember" defaultChecked/>
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <Button type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit"}</Button>
        </form>
      </section>
    </Layout>
  );
};

export default Login;
