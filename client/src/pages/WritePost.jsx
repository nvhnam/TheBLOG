/* eslint-disable no-unused-vars */
// import React from "react";

import { useContext, useEffect, useState } from "react";
import Button from "../components/Button";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import moment from "moment";

const WritePost = () => {
  const [title, setTitle] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  // const [chosenCategory, setChosenCategory] = useState({});
  const [chosenCategoryIds, setChosenCategoryIds] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8800/categories");
        // console.log(response.data);
        setCategories(response.data);
      } catch (error) {
        console.log("Error fetching categories: ", error);
      }
    };
    fetchCategories();
  }, []);

  // console.log(categories);

  const handleCheckbox = (categoryId) => {
    setChosenCategoryIds((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  // console.log(chosenCategoryIds);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = currentUser.id;
    const currentDateTime = moment().toISOString();

    let base64File = null;

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        base64File = reader.result;
        submitPost(base64File);
      };
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
      };
    } else {
      submitPost(base64File);
    }

    const submitPost = async (fileData) => {
      const formData = {
        title: title,
        userId: userId,
        body: paragraph,
        created_at: currentDateTime,
        img: fileData,
      };

      try {
        const res = await axios.post("http://localhost:8800/posts/write", {
          formData: formData,
          categoriesId: chosenCategoryIds,
        });

        if (res.status === 200) {
          setTitle("");
          setParagraph("");
          setFile(null);
          setChosenCategoryIds([]);
        } else {
          console.log("Error submitting the form");
        }
      } catch (error) {
        console.log(error);
      }
    };
  };

  const column = Math.ceil(categories.length / 2);

  return (
    <div className="w-full h-full bg-slate-100 flex justify-center">
      <div className="w-full h-full max-w-screen-xl flex px-3 mb-36">
        <div className="w-full h-full flex flex-col">
          <h3 className="text-4xl mt-24 pl-2">Write something...</h3>
          <div className="w-full h-full mt-14">
            <form
              onSubmit={handleSubmit}
              className="w-2/4 h-100 p-5 shadow-2xl rounded-md flex flex-col gap-3"
            >
              <input
                type="text"
                className="px-4 py-3 outline-none rounded-md w-full mt-3 bg-white border border-slate-300 placeholder-slate-400 focus:ring-1 focus:ring-slate-600"
                placeholder="Title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </label>

                <div className="flex gap-x-4 w-100 h-100 p-2 items-center">
                  {/* <label htmlFor="category">Category:</label>

                  <select
                    className="px-4 py-1 rounded-md border border-slate-300"
                    name="category"
                    id="category"
                    value={chosenCategory}
                    onChange={(e) => setChosenCategory(e.target.value)}
                  >
                    <option className="" value="science">
                      Science
                    </option>
                    <option value="politic">Politic</option>
                    <option value="health">Health</option>
                    <option value="art">Art</option>
                  </select> */}
                  <p>Category: </p>
                  <div className="flex w-100 justify-between items-center gap-2">
                    {Array.from({ length: column }).map((_, index) => (
                      <div key={index} className="flex flex-col">
                        {categories
                          .slice(index * 2, index * 2 + 2)
                          .map((category) => (
                            <label
                              key={category.id}
                              className="flex items-center"
                            >
                              <input
                                type="checkbox"
                                value={category.name}
                                onChange={() => handleCheckbox(category.id)}
                                checked={
                                  chosenCategoryIds?.includes(category.id) ||
                                  false
                                }
                              />
                              <span className="ml-2">{category.name}</span>
                            </label>
                          ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-100 h-80">
                <textarea
                  placeholder="..."
                  className="bg-white border border-slate-300 placeholder-slate-400 rounded-md px-4 w-full h-full py-2 outline-none focus:ring-1 focus:ring-slate-600"
                  required
                  value={paragraph}
                  onChange={(e) => setParagraph(e.target.value)}
                />
              </div>
              <div className="w-full h-full flex justify-end mt-3 px-2">
                <Button
                  label="Submit"
                  className="text-white bg-slate-700 px-5 h-fit"
                  type="submit"
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
