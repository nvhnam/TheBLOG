/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// import React from "react";

import { useContext, useEffect, useState } from "react";
import Button from "../components/Button";
import { AuthContext } from "../context/authContext";
import moment from "moment";
import RecentPosts from "../components/RecentPosts";
import api from "../api/api";

const WritePost = ({ setIsLoading }) => {
  const [title, setTitle] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [chosenCategoryIds, setChosenCategoryIds] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories/all");
        setCategories(response.data);
      } catch (error) {
        console.log("Error fetching categories: ", error);
      }
    };
    fetchCategories();
  }, []);

  const handleCheckbox = (categoryId) => {
    setChosenCategoryIds((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      window.alert("Please select an image for your post.");
      return;
    }
    if (chosenCategoryIds.length === 0) {
      window.alert("Please choose at least one category.");
      return;
    }

    try {
      setIsLoading(true);
      const currentDateTime = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
      const userId = currentUser.id;

      const formData = new FormData();
      formData.append("title", title);
      formData.append("userId", userId);
      formData.append("body", paragraph);
      formData.append("created_at", currentDateTime);
      formData.append("img", file);
      
      chosenCategoryIds.forEach((cateID) => {
        formData.append("categoriesId", cateID);
      });

      console.log("Sending formData: ", formData);

      try {
        const res = await api.post("/posts/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (res.status === 201) {
          setTitle("");
          setParagraph("");
          setFile(null);
          setChosenCategoryIds([]);
          window.alert("Post uploaded successfully!");
          window.location.reload();
        } else {
          console.log("Error submitting the form");
        }
      } catch (error) {
        console.log("Upload error: ", error);
        window.alert("Error uploading post: " + (error.response?.data?.message || error.message));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const column = Math.ceil(categories.length / 2);

  return (
    <div className="w-full min-h-screen bg-slate-100 flex justify-center px-4">
      <div className="w-full max-w-screen-xl flex flex-col px-3 mb-36">
        {/* Title Section */}
        <div className="w-full flex flex-col items-center mb-12">
          <h3 className="text-3xl md:text-4xl mt-20 md:mt-24 font-semibold">
            Write something...
          </h3>

          {/* Form Container */}
          <div className="w-full mt-10">
            <form
              onSubmit={handleSubmit}
              className="w-full sm:w-full md:w-3/4 lg:w-2/3 p-6 shadow-2xl mx-auto rounded-lg flex flex-col gap-y-6 bg-white"
            >
              {/* Title Input */}
              <input
                type="text"
                className="px-4 py-3 rounded-md w-full bg-white border border-slate-300 placeholder-slate-400 focus:ring-2 focus:ring-slate-500 outline-none"
                placeholder="Title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              {/* File Upload */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <label className="block w-full sm:w-auto">
                  <span className="sr-only">Choose post image</span>
                  <input
                    type="file"
                    name="file"
                    className="block w-full sm:w-auto text-sm file:cursor-pointer text-slate-500
                  file:mr-4 file:py-2 file:px-5 file:rounded file:border-0
                  file:text-sm file:font-semibold file:bg-red-50 file:text-red-700
                  hover:file:bg-red-100"
                    onChange={(e) => setFile(e.target.files[0])}
                    required
                  />
                </label>

                {/* Categories Section */}
                <div className="flex flex-col gap-3">
                  <p className="font-medium">Category:</p>
                  <div className="flex flex-wrap gap-4">
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
              {/* Paragraph Input */}
              <div className="h-60">
                <textarea
                  placeholder="Write here..."
                  className="w-full h-full bg-white border border-slate-300 placeholder-slate-400 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-slate-500"
                  required
                  value={paragraph}
                  onChange={(e) => setParagraph(e.target.value)}
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button
                  label="Submit"
                  className="bg-slate-700 text-white px-6 py-2 rounded-md hover:bg-slate-800 transition-all"
                  type="submit"
                />
              </div>
            </form>
          </div>
        </div>

        {/* Recent Posts */}
        <RecentPosts />
      </div>
    </div>
  );
};

export default WritePost;
