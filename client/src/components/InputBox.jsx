/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const InputBox = React.forwardRef(
  ({ type, name, label, placeholder, error, inputHandler }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && <label className="text-slate-900">{label}</label>}
        <div className="">
          <input
            onChange={inputHandler}
            type={type}
            placeholder={placeholder}
            name={name}
            ref={ref}
            aria-invalid={error ? "true" : "false"}
            className="px-3 py-1.5 bg-white outline-none border border-gray-900 text-gray-900 placeholder-gray-400 text-base focus:ring-2 ring-blue-300 rounded w-full"
            required
          />
        </div>
        {error && <span className="text-sm italic text-red-500">{error}</span>}
      </div>
    );
  }
);

export default InputBox;
