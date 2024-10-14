// import React from "react";

import Button from "../components/Button";

const WritePost = () => {
  return (
    <div className="w-full h-screen bg-slate-50 flex justify-center">
      <div className="w-full h-full max-w-screen-xl flex px-3">
        <div className="w-full h-full flex flex-col">
          <h3 className="text-4xl mt-24 pl-2">Write something...</h3>
          <div className="w-full h-full mt-14">
            <form className="w-2/5 h-fit p-5 bg-gray-100 rounded-md flex flex-col gap-3">
              <input
                type="text"
                className="px-5 py-3 outline-none rounded-md"
                placeholder="Title"
                required
              />
              <input
                type="file"
                accept="image/"
                className="w-full my-3 rounded-md"
              />
              <textarea
                placeholder="..."
                className="rounded-md px-2 w-full h-full py-1 outline-none"
                required
              />
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
