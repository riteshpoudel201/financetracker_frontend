import { Button, Label, TextInput } from "flowbite-react";
import Layout from "../components/common/Layout";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getRandomQuotes, postNewUser } from "../utils/axiosHelper";
import { useForm } from "../hooks/useForm";
import Coins from "../components/icons/Coins";
const Register = () => {
  const [fact, setFact] = useState("");
  const { form, handleChange, loading, setLoading } = useForm({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { c_password, password, name, email } = form;
    if (c_password !== password) {
      toast.error("Password does not match", { toastId: c_password });
      return;
    }

    const { status, message } = await postNewUser({name,email,password});

    toast[status](message, {toastId: status,});

    setLoading(false);
    if (status !== "error") setTimeout(redirect, 1000);
    
  };

  const redirect = () => window.location.href = "/";

  useEffect(() => {
    getRandomQuotes(setFact);
  }, []);

  return (
    <Layout className={`flex justify-center items-center overflow-y-hidden`}>
      <section className="min-w-sm w-[99vw] sm:w-[630px] md:w-[700px] max-w-screen-md bg-cyan-700 flex flex-col sm:flex-row rounded-lg items-center">
        <div className="w-full h-full flex flex-col gap-5 justify-center items-center py-3 px-5">
          <Coins />
          <h1 className="text-lg sm:text-2xl font-bold">
            Create your account in Finance Tracker
          </h1>
          <div className="flex flex-col gap-1">
            <h1 className="font-bold text-xs sm:text-sm">Did you know?</h1>
            <p className="text-xs sm:text-sm">&quot;{fact && fact}&quot;</p>
          </div>
        </div>
        <form
          className="flex flex-col gap-4 w-full px-5 py-5 justify-center bg-cyan-700 sm:bg-zinc-200 rounded-tr-lg rounded-br-lg"
          onSubmit={handleSubmit}
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Your Name" />
            </div>
            <TextInput
              id="name"
              name="name"
              value={form.name}
              type="text"
              placeholder="Ram Parsad"
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              id="email1"
              name="email"
              type="email"
              value={form.email}
              placeholder="ram@gmail.com"
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Create password" />
            </div>
            <TextInput
              id="password1"
              name="password"
              type="password"
              value={form.password}
              placeholder="password"
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="password2"
                name="c_password"
                value="Confirm password"
              />
            </div>
            <TextInput
              id="password2"
              type="password"
              name="c_password"
              value={form.c_password}
              placeholder="confirm password"
              onChange={handleChange}
            />
          </div>
          <Button
            type="submit"
            className="bg-zinc-200 text-cyan-800 sm:bg-cyan-800 sm:text-zinc-200"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </section>
    </Layout>
  );
};

export default Register;
