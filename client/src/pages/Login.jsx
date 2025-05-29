/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import React from "react";
import { useContext, useState } from "react";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import { AuthContext } from "../context/authContext";
import { AnimatePresence, motion } from "framer-motion";
import Spinner from "../components/Spinner";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInput] = useState({
    email: "",
    password: "",
  });

  console.log(inputs);

  const [errors, setErrors] = useState(null);

  const { setCurrentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await api.post("/auth/login", inputs, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        mode: "cors",
      });
      console.log("Login res: ", res);
      if (res.status === 200) {
        console.log("Login res.data: ", res.data);
        const userData = res.data;
        setCurrentUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));

        if (userData.token) {
          localStorage.setItem("token", userData.token);
        }

        navigate("/home");
      }
    } catch (error) {
      setErrors(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">{isLoading && <Spinner />}</AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex flex-col justify-center items-center w-full min-h-screen bg-slate-900 px-4">
          <div className="w-full max-w-screen-xl flex flex-col justify-center items-center gap-y-6">
            {/* Title */}
            <h1 className="text-center text-white text-3xl md:text-4xl tracking-widest">
              LOGIN
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
                    label="Login"
                    className="w-full bg-green-400 text-white font-semibold py-2 rounded-md transition-all hover:bg-green-500 hover:shadow-md"
                    buttonHandler={handleSubmit}
                  />
                </div>

                {/* Register Link */}
                <span className="text-sm text-gray-700">
                  Create account
                  <Link
                    to="/register"
                    className="ml-1 text-blue-500 font-semibold underline hover:text-blue-400 hover:no-underline"
                  >
                    now
                  </Link>
                </span>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Login;
