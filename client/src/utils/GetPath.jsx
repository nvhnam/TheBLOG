/* eslint-disable react/prop-types */
import { useLocation } from "react-router-dom";
import clsx from "clsx";

const GetPath = ({ className }) => {
  const location = useLocation();

  const getName = location.pathname.split("/").filter(Boolean).pop() || "Home";
  const pathName = getName.charAt(0).toUpperCase() + getName.slice(1);

  return <h1 className={clsx("text-3xl", className)}>{pathName}</h1>;
};

export default GetPath;
