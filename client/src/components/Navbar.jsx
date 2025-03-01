/* eslint-disable no-unused-vars */
// import React from "react";
import { MdOutlineLogout, MdOutlineLogin } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Button from "./Button";
import axios from "axios";

const PORT = import.meta.env.VITE_API_PORT;
const URL = import.meta.env.VITE_API_URL || `http://localhost:${PORT}`;

const IS_SPRING = import.meta.env.VITE_API_SPRING || false;

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get(
          `${URL || `http://localhost:${PORT}`}/categories/all`,
          IS_SPRING && {
            validateStatus: () => {
              return true;
            },
          }
        );
        // if (res.status === 302) {
        setCategories(res.data);
        // }
      } catch (error) {
        console.log("Error fetching navbar categories from client: ", error);
      }
    };

    getCategories();
  }, []);

  // console.log("Navbar categories: ", categories);

  return (
    <div className="w-full h-[60px] bg-slate-900 text-white flex  items-center justify-center sticky top-0 left-0 right-0">
      <div className="w-full max-w-screen-xl h-full flex items-center justify-between gap-x-32">
        {/* Logo */}
        <div className="w-full h-full flex items-center">
          <Link to="/" className="font-semibold text-xl">
            The <span className="text-l -mr-2 text-green-400">{">"}</span>
            <span className="text-l text-green-400">{"_"}</span>{" "}
            <span className="text-s font-light ml-1 tracking-widest">BLOG</span>
          </Link>
        </div>

        {/* Links */}
        <div className="w-full h-full flex items-center ">
          <div className="w-full h-full flex items-center justify-center gap-x-20 p-3">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/${category.name}`}
                className="text-gray-300 hover:text-red-300 hover:border-b-red-300 hover:border-b-2 border-b-2 border-transparent p-2 hover:transition delay-100 "
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Login / Logout */}

        <div className="w-full h-full flex items-center">
          <div className="w-full h-full flex items-center justify-end">
            {currentUser ? (
              <>
                <Link
                  to={`/profile/${currentUser.id}`}
                  className="flex items-center justify-center gap-x-2 mr-7 text-gray-300"
                >
                  <FaUser />
                  <span>{currentUser?.username}</span>
                </Link>
                <Button
                  label="Logout"
                  icon={<MdOutlineLogout />}
                  className="text-sm bg-transparent px-4 py-1.5 text-white flex items-center justify-center gap-x-1.5 hover:bg-red-300 border-2 border-red-300 hover:border-red-300"
                  buttonHandler={logout}
                />
              </>
            ) : (
              <Link to="/login">
                <Button
                  label="Login"
                  icon={<MdOutlineLogin />}
                  className="text-sm bg-transparent px-4 py-1.5 text-white flex items-center justify-center gap-x-1.5 hover:bg-red-300 border-2 border-red-300 hover:border-red-300"
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
