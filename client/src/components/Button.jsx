/* eslint-disable react/prop-types */
// import React from "react";
import clsx from "clsx";

const Button = ({ icon, label, className, buttonHandler, type }) => {
  return (
    <button
      onClick={buttonHandler}
      className={clsx(
        "transition-all duration-200 px-1 py-1.5 outline-none rounded",
        className
      )}
      type={type}
    >
      <span>{label}</span>
      {icon && icon}
    </button>
  );
};

export default Button;
