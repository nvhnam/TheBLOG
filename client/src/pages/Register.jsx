/* eslint-disable react/prop-types */
// import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import api from "../api/api.js";

const Register = ({ setIsLoading }) => {
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
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen bg-slate-900 px-4">
      <div className="w-full max-w-screen-xl flex flex-col justify-center items-center gap-y-6">
        {/* Title */}
        <h1 className="text-center text-white text-3xl md:text-4xl tracking-widest">
          REGISTER
        </h1>

        {/* Form */}
        <div className="w-full sm:w-2/3 md:w-1/3 flex flex-col justify-center items-center p-4">
          <form className="w-full flex flex-col items-center rounded-lg gap-y-6 bg-slate-200 shadow-lg px-6 pt-8 pb-6">
            {/* Input Fields */}
            <div className="w-full flex flex-col gap-y-4 px-2">
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
                type="text"
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

            {/* Submit Button */}
            <div className="w-full px-4">
              <Button
                label="Create"
                className="w-full bg-green-400 text-white font-semibold py-2 rounded-md transition-all hover:bg-green-500 hover:shadow-md"
                buttonHandler={handleSubmit}
              />
            </div>

            {/* Login Link */}
            <span className="text-sm text-gray-700">
              Already have an account? Click
              <Link
                to="/login"
                className="ml-1 text-blue-500 font-semibold underline hover:text-blue-400 hover:no-underline"
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
