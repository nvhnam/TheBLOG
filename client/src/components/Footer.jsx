// import React from "react";
import { FaFacebookF, FaLinkedinIn, FaGithub, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "./Button";

const Footer = () => {
  return (
    <div className="w-full h-[100px] bg-slate-900 text-white flex  items-center justify-center relative bottom-0">
      <div className="w-full h-full max-w-screen-xl flex justify-between items-center p-3">
        <div className="w-full h-full flex flex-col justify-center items-center">
          <div className="w-full h-full flex flex-row justify-center items-center gap-5">
            <Link to="/">
              <Button
                icon={<FaFacebookF />}
                className="rounded-full border-2 border-white text-white px-1.5 py-1.5 hover:bg-white hover:text-slate-900 transition-all duration-200"
              />
            </Link>
            <Link to="/">
              <Button
                icon={<FaLinkedinIn />}
                className="rounded-full border-2 border-white text-white px-1.5 py-1.5 hover:bg-white hover:text-slate-900 transition-all duration-200"
              />
            </Link>
            <Link to="/">
              <Button
                icon={<FaGithub />}
                className="rounded-full border-2 border-white text-white px-1.5 py-1.5 hover:bg-white hover:text-slate-900 transition-all duration-200"
              />
            </Link>
            <Link to="/">
              <Button
                icon={<FaTwitter />}
                className="rounded-full border-2 border-white text-white px-1.5 py-1.5 hover:bg-white hover:text-slate-900 transition-all duration-200"
              />
            </Link>
          </div>
          <div>
            <p className="text-light text-xs text-gray-300">
              Created by{" "}
              <Link
                className="text-light italic text-red-300 hover:text-red-200 transition duration-200"
                to="https://github.com/nvhnam"
              >
                @nvhnam01
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
