/* eslint-disable no-unused-vars */
// import React from "react";

import { useState } from "react";
import Button from "../components/Button";

const WritePost = () => {
  const [title, setTitle] = useState(null);
  const [paragraph, setParagraph] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-full h-full bg-slate-100 flex justify-center">
      <div className="w-full h-full max-w-screen-xl flex px-3 mb-36">
        <div className="w-full h-full flex flex-col">
          <h3 className="text-4xl mt-24 pl-2">Write something...</h3>
          <div className="w-full h-full mt-14">
            <form className="w-2/4 h-fit p-5 shadow-2xl rounded-md flex flex-col gap-3">
              <input
                type="text"
                className="px-4 py-3 outline-none rounded-md w-full mt-3 bg-white border border-slate-300 placeholder-slate-400 focus:ring-1 focus:ring-slate-600"
                placeholder="Title"
                required
              />

              <div className="flex w-100 justify-between items-center">
                <label className="block">
                  <span className="sr-only">Choose profile photo</span>
                  <input
                    type="file"
                    className="block w-full text-sm my-2 file:cursor-pointer text-slate-500
                    file:mr-4 file:py-2 file:px-5
                    file:rounded file:border-0
                    file:text-sm file:font-semibold
                    file:bg-red-50 file:text-red-700
                    hover:file:bg-red-100
                  "
                  />
                </label>

                <div className="flex gap-x-3 w-100 p-2 items-center">
                  <label htmlFor="category">Category:</label>

                  <select
                    className="px-4 py-1 rounded-md border border-slate-300"
                    name="category"
                    id="category"
                  >
                    <option className="" value="science">
                      Science
                    </option>
                    <option value="politic">Politic</option>
                    <option value="health">Health</option>
                    <option value="art">Art</option>
                  </select>
                </div>
              </div>
              <div className="w-100 h-80">
                <textarea
                  placeholder="..."
                  className="bg-white border border-slate-300 placeholder-slate-400 rounded-md px-4 w-full h-full py-2 outline-none focus:ring-1 focus:ring-slate-600"
                  required
                />
              </div>
              <div className="w-full h-full flex justify-end mt-3 px-2">
                <Button
                  label="Submit"
                  className="text-white bg-slate-700 px-5 h-fit"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritePost;
