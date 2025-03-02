/* eslint-disable no-unused-vars */
// import React from "react";

import { useContext, useEffect, useState } from "react";
import Button from "../components/Button";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import moment from "moment";
import RecentPosts from "../components/RecentPosts";
// import { useLocation } from "react-router-dom";

const PORT = import.meta.env.VITE_API_PORT;
const URL = import.meta.env.VITE_API_URL || `http://localhost:${PORT}`;

const IS_SPRING = import.meta.env.VITE_API_SPRING || false;

const WritePost = () => {
  // const state = useLocation().state;
  const [title, setTitle] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [chosenCategoryIds, setChosenCategoryIds] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${URL || `http://localhost:${PORT}`}/categories/all`,
          IS_SPRING && {
            validateStatus: () => {
              return true;
            },
          }
        );
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

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("http://localhost:8800/upload", formData);
      // console.log(res.data);
      return res.data;
    } catch (error) {
      console.log("Error handling upload");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDateTime = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    const userId = currentUser.id;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("userId", userId);
    formData.append("body", paragraph);
    formData.append("created_at", currentDateTime);
    if (file) {
      formData.append("img", file);
    }
    chosenCategoryIds.forEach((cateID) => {
      formData.append("categoriesId", cateID);
    });
    // formData.append("categoriesId", chosenCategoryIds);
    // const uploadedImg = await handleUpload();
    // console.log(currentDateTime);

    // const formData = {
    //   title: title,
    //   userId: userId,
    //   body: paragraph,
    //   created_at: currentDateTime,
    //   // img: file ? uploadedImg : "",
    //   img: file,
    //   categoriesId: chosenCategoryIds,
    // };

    console.log("Sending formData: ", formData);

    try {
      const res = await axios.post(
        `${URL || `http://localhost:${PORT}`}/posts/upload`,
        formData,
        IS_SPRING && {
          headers: {
            "Content-Type": "multipart/form_data",
          },
          validateStatus: () => true,
        }
      );

      if (res.status === 201) {
        setTitle("");
        setParagraph("");
        setFile(null);
        setChosenCategoryIds([]);
        window.location.reload();
      } else {
        console.log("Error submitting the form");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const column = Math.ceil(categories.length / 2);

  return (
    <div className="w-full h-full bg-slate-100 flex justify-center">
      <div className="w-full h-full max-w-screen-xl flex flex-col px-3 mb-36">
        <div className="w-full h-full flex flex-col items-center mb-12">
          <h3 className="text-4xl mt-24">Write something...</h3>
          <div className="w-full h-full mt-14">
            <form
              onSubmit={handleSubmit}
              className="w-3/4 h-100 p-5 shadow-2xl mx-auto rounded-md flex flex-col gap-3"
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
                    name="file"
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
                  <p>Category: </p>
                  <div className="flex w-100 justify-between items-center gap-3">
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
              <div className="w-100 h-96">
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
        <RecentPosts />
      </div>
    </div>
  );
};

export default WritePost;
