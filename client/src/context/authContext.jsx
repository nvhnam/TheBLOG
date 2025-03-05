/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import api from "../api/api";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children, setIsLoading }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user") || null)
  );

  const login = async (inputs) => {
    console.log("AuthContext inputs: ", inputs);

    // const res = await api.post("/auth/login", inputs, {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //   },
    // });

    // console.log("AuthContext login res.data: ", res.data);
    // const userData = res.data;
    // setCurrentUser(userData);
    // localStorage.setItem("user", JSON.stringify(userData));

    // if (userData.token) {
    //   localStorage.setItem("token", userData.token);
    // }

    // return userData;
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      const res = await api.post(`/auth/logout`, {
        credentials: "include",
        mode: "cors",
      });
      console.log("Logout res: ", res);

      if (res.status === 200) {
        setCurrentUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.alert(res.data);
      } else {
        console.log("Error logout");
        window.alert(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
    // console.log("isUserAvailable: ", currentUser);
    if (currentUser != null) {
      const expireTime = new Date().getTime() + currentUser.expiresIn;
      const currentTime = new Date().getTime();
      console.log("expireTime: ", expireTime);
      console.log("currentTime: ", currentTime);
      if (currentTime >= parseInt(expireTime, 10)) {
        logout();
      }
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{ currentUser, login, logout, setCurrentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
