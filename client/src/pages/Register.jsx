// import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import api from "../api/api.js";

const Register = () => {
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
  });

  console.log(inputs);

  const [errors, setErrors] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/signup", inputs, {
        credentials: "include",
        mode: "cors",
      });
      console.log("Register res: ", res);
      if (res.status === 201) {
        navigate("/register/verify", { state: { email: inputs.email } });
      }
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-slate-900">
      <div className="w-full max-w-screen-xl h-screen flex flex-col justify-center items-center gap-y-5">
        {/* Title */}
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="text-center text-white text-3xl tracking-widest">
            REGISTER
          </h1>
        </div>

        {/* Form */}
        <div className="md:w-1/3 h-auto flex flex-col justify-center items-center p-4">
          <form className="w-full h-full flex flex-col justify-center items-center rounded gap-y-3 bg-slate-200 shadow-lg px-5 pt-8 pb-5">
            <div className="gap-y-4 w-full h-full flex flex-col px-5">
              <InputBox
                placeholder="example@mail.com"
                name="email"
                label="Email Address"
                type="email"
                error={errors}
                inputHandler={handleChange}
              />
              <InputBox
                placeholder="your username"
                name="username"
                label="Username"
                type="username"
                error={errors}
                inputHandler={handleChange}
              />
              <InputBox
                placeholder="password"
                name="password"
                label="Password"
                type="password"
                error={errors}
                inputHandler={handleChange}
              />
            </div>
            <div className="w-full flex flex-col px-5 pt-4 pb-1">
              <Button
                label="Create"
                className="bg-green-400 text-white hover:bg-slate-300 hover:outline-slate-900 hover:text-slate-900"
                buttonHandler={handleSubmit}
              />
            </div>
            <span className="text-sm">
              Already have account? Click
              <Link
                to="/login"
                className="cursor-pointer italic text-blue-400 font-semibold underline ml-1 hover:text-blue-300 hover:no-underline"
              >
                here
              </Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
