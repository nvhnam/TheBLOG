/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// import React from "react";
import { MdOutlineLogout, MdOutlineLogin } from "react-icons/md";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Button from "./Button";
import axios from "axios";

const PORT = import.meta.env.VITE_API_PORT;
const URL = import.meta.env.VITE_API_URL || `http://localhost:${PORT}`;

const IS_SPRING = import.meta.env.VITE_API_SPRING || false;

const Navbar = ({ setIsLoading }) => {
  const { currentUser, logout } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

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
    <nav className="w-full h-[60px] bg-slate-900 text-white flex justify-center items-center sticky top-0 left-0 right-0 z-50 shadow-md px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-screen-xl h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-semibold text-xl flex items-center">
          The <span className="text-l -mr-2 text-green-400">{">"}</span>
          <span className="text-l text-green-400">{"_"}</span>{" "}
          <span className="text-s font-light ml-1 tracking-widest">BLOG</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-x-14">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/${category.name}`}
              className="text-gray-300 hover:text-red-300 hover:border-b-2 border-transparent p-2 hover:border-red-300 transition-all duration-200"
            >
              {category.name}
            </Link>
          ))}
        </div>

        {/* User Actions */}
        <div className="hidden md:flex items-center gap-x-6">
          {currentUser ? (
            <>
              <Link
                to={`/profile/${currentUser.id}`}
                className="flex items-center gap-x-2 text-gray-300 hover:text-red-300"
              >
                <FaUser />
                <span>{currentUser?.username}</span>
              </Link>
              <button
                onClick={logout}
                className="text-sm bg-transparent px-4 py-1.5 border-2 border-red-300 text-white hover:bg-red-300 flex items-center gap-x-1.5 transition-all duration-200"
              >
                <MdOutlineLogout />
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">
              <button className="text-sm bg-transparent px-4 py-1.5 border-2 border-red-300 text-white hover:bg-red-300 flex items-center gap-x-1.5 transition-all duration-200">
                <MdOutlineLogin />
                Login
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white text-2xl"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-[60px] left-0 w-full bg-slate-900 p-5 flex flex-col items-start gap-4 md:hidden shadow-lg">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/${category.name}`}
              className="text-gray-300 hover:text-red-300 border-b border-transparent hover:border-red-300 pb-1 transition-all duration-200"
              onClick={() => setMenuOpen(false)}
            >
              {category.name}
            </Link>
          ))}

          <div className="w-full flex flex-col items-start gap-3">
            {currentUser ? (
              <>
                <Link
                  to={`/profile/${currentUser.id}`}
                  className="flex items-center gap-x-2 text-gray-300 hover:text-red-300"
                  onClick={() => setMenuOpen(false)}
                >
                  <FaUser />
                  <span>{currentUser?.username}</span>
                </Link>
                <button
                  onClick={logout}
                  className="text-sm bg-transparent px-4 py-1.5 border-2 border-red-300 text-white hover:bg-red-300 flex items-center gap-x-1.5 transition-all duration-200"
                >
                  <MdOutlineLogout />
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <button className="text-sm bg-transparent px-4 py-1.5 border-2 border-red-300 text-white hover:bg-red-300 flex items-center gap-x-1.5 transition-all duration-200">
                  <MdOutlineLogin />
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
