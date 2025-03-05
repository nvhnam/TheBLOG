/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import InputBox from "../components/InputBox";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import api from "../api/api.js";

const Verify = () => {
  const location = useLocation();
  const email = location.state?.email;

  const [inputs, setInput] = useState({});

  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Verification code inputs: ", {
        email: email,
        verificationCode: inputs.code,
      });
      const res = await api.post("/auth/verify", {
        email: email,
        verificationCode: inputs.code,
      });
      console.log("Verify res: ", res);
      if (res.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      setErrors(error.response?.data?.message);
    }
  };

  const handleResendCode = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/resend");
      // console.log("Register res: ", res);
      // if (res.status === 201) {
      //   navigate("/register/verify", { state: { email: inputs.email } });
      // }
    } catch (error) {
      setErrors(error.response?.data?.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-slate-900">
      <div className="w-full max-w-screen-xl h-screen flex flex-col justify-center items-center gap-y-5">
        {/* Title */}
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="text-center text-white text-3xl tracking-widest">
            Email Verification
          </h1>
        </div>

        {/* Form */}
        <div className="md:w-1/3 h-auto flex flex-col justify-center items-center p-4">
          <form className="w-full h-full flex flex-col justify-center items-center rounded gap-y-3 bg-slate-200 shadow-lg px-5 pt-8 pb-5">
            <div className="gap-y-4 w-full h-full flex flex-col px-5">
              {/* <InputBox
                placeholder="example@mail.com"
                name="email"
                label="Email Address"
                type="email"
                error={errors}
                inputHandler={handleChange}
              /> */}
              <InputBox
                placeholder="Enter your verification code"
                name="code"
                label=""
                type="text"
                error={errors}
                inputHandler={handleChange}
              />
            </div>
            <div className="w-full flex flex-col px-5 pt-5">
              <Button
                label="Enter"
                className="bg-green-400 text-white hover:bg-slate-300 hover:outline-slate-900 hover:text-slate-900"
                buttonHandler={handleSubmit}
              />
            </div>
            <span className="text-sm">
              <Button
                label="Resend verification code"
                className="cursor-pointer italic text-blue-400 font-semibold underline ml-1 hover:text-blue-300 hover:no-underline"
                buttonHandler={handleResendCode}
              >
                <Link to="/register/verify">Resend verification code</Link>
              </Button>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Verify;
