/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
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
    // const res = await axios.post(
    //   `${URL || `http://localhost:${PORT}`}/auth/logout`,
    //   IS_SPRING && {
    //     validateStatus: () => {
    //       return true;
    //     },
    //     credentials: "include",
    //   }
    // );
    // console.log("Logout res: ", res);

    setCurrentUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{ currentUser, login, logout, setCurrentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
