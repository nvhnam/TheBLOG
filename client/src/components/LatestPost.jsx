/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { defaultImg } from "../utils/Data";
import { useEffect, useState } from "react";
import axios from "axios";

const PORT = import.meta.env.VITE_API_PORT;
const URL = import.meta.env.VITE_API_URL || `http://localhost:${PORT}`;

const IS_SPRING = import.meta.env.VITE_API_SPRING || false;

const LatestPost = () => {
  const [latestPost, setLatestPost] = useState(null);

  useEffect(() => {
    const getLatestPost = async () => {
      const res = await axios.get(
        `${URL || `http://localhost:${PORT}`}/posts/latest`,
        IS_SPRING && {
          validateStatus: () => {
            return true;
          },
        }
      );
      // console.log("getLatestPost: ", res.data);
      if (res.status === 302) {
        setLatestPost(res.data);
      }
    };

    getLatestPost();
  }, []);

  return (
    <>
      {latestPost && (
        <div className="w-full h-full flex justify-center">
          <div className="w-full h-full flex justify-center">
            <Link
              to={`/post/${latestPost.id}`}
              className="w-full h-64 flex items-center justify-center gap-10 my-14"
            >
              {latestPost.image && (
                <div className="flex-1 w-1/2 h-full justify-center items-center">
                  <img
                    className="w-full h-full rounded-lg object-cover"
                    src={
                      IS_SPRING
                        ? latestPost.image
                        : latestPost.image
                        ? `../upload/${latestPost.image}`
                        : defaultImg.img
                    }
                  />
                </div>
              )}
              <div
                className={`flex-1 flex flex-col justify-around h-full ${
                  latestPost.image ? "w-1/2" : "w-full"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="size-8">
                    <img
                      className="size-full rounded-full rounded object-cover"
                      src={
                        latestPost.author_img
                          ? `../upload/${
                              IS_SPRING
                                ? latestPost.authorImg
                                : latestPost.author_img
                            }`
                          : defaultImg.img
                      }
                      alt={latestPost.author_name + " image"}
                    />
                  </span>
                  <p className="text-md text-slate-600">
                    {IS_SPRING ? latestPost.authorName : latestPost.author_name}
                  </p>
                </div>
                <div className="">
                  <h1 className="text-4xl text-slate-900 font-semibold mb-6 line-clamp-2">
                    {latestPost.title}
                  </h1>
                  <p className="text-sm leading-normal text-slate-600 line-clamp-3">
                    {latestPost.body}
                  </p>
                </div>
                <div className="flex flex-row justify-between pr-5">
                  <div className="flex gap-4 items-center">
                    <span className="font-bold text-red-400">
                      {IS_SPRING
                        ? latestPost.categoryName
                        : latestPost.category_name}
                    </span>
                    <span className="text-sm text-slate-600">
                      {moment(
                        IS_SPRING ? latestPost.createdAt : latestPost.created_at
                      )
                        .startOf("minute")
                        .fromNow()}
                    </span>
                  </div>
                  <p className="text-sm italic underline text-red-500 hover:text-red-300 duration-300 ease-in-out">
                    read more
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default LatestPost;
