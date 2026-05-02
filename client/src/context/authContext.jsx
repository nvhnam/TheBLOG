/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import api from "../api/api.js";
import axios from "axios";

import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();
const PORT = import.meta.env.VITE_API_PORT;
const URL = import.meta.env.VITE_API_URL || `http://localhost:${PORT}`;
const IS_SPRING = import.meta.env.VITE_API_SPRING || false;

export const AuthContextProvider = ({ children, setIsLoading }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      return null;
    }
  });

  const navigate = useNavigate();

  const login = async (inputs) => {
    console.log("AuthContext inputs: ", inputs);

    const res = await api.post("/auth/login", inputs, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      mode: "cors",
    });

    console.log("AuthContext login res.data: ", res.data);
    const userData = res.data;
    
    // Calculate expiration time immediately
    if (userData.expiresIn) {
      userData.expiresAt = new Date().getTime() + userData.expiresIn;
    }
    
    setCurrentUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));

    if (userData.token) {
      localStorage.setItem("token", userData.token);
    }

    return userData;
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      const res = await api.post(`/auth/logout`);
      console.log("Logout res: ", res);

      if (res.status === 200) {
        setCurrentUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.alert(res.data);
        navigate("/home");
      } else {
        console.log("Error logout");
        window.alert(res.data);
      }
    } catch (error) {
      console.log(error);
      // Even if backend logout fails, clear local state
      setCurrentUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/home");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
      
      if (currentUser.expiresAt) {
        const currentTime = new Date().getTime();
        const timeLeft = currentUser.expiresAt - currentTime;
        
        console.log("Time left until token expires (ms): ", timeLeft);
        
        if (timeLeft <= 0) {
          logout();
        } else {
          // Set a timeout to logout when token expires
          const timer = setTimeout(() => {
            logout();
          }, timeLeft);
          return () => clearTimeout(timer);
        }
      }
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
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
