import { useState } from "react";

const handleChange = (e, form, setForm) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

const useForm = (initialState) => {

  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  
  return {
    form,
    handleChange: (e) => handleChange(e, form, setForm ),
    loading,
    setLoading
  };
};
export { useForm };
