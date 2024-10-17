/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// import React from "react";
import { Link } from "react-router-dom";
import GetPath from "../utils/GetPath";
import { categories, posts, postsCategories, users } from "../utils/Data.js";
import { MdEditNote } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import moment from "moment";
import LatestPost from "../components/LatestPost.jsx";
import getCategoriesForPost from "../utils/GetCategoriesForPost.js";
import { useContext } from "react";
import { AuthContext } from "../context/authContext.jsx";

const Home = () => {
  const { currentUser } = useContext(AuthContext);

  // console.log(currentUser);
  return (
    <div className="w-full h-full bg-slate-50 flex justify-center">
      <div className="w-full h-full max-w-screen-xl flex flex-col items-center px-4">
        {/* Pagination + Write Post link */}
        <div className="w-full h-1/6 flex flex-row items-end justify-between  border-b-2 border-b-slate-900 pb-3 mt-10">
          {/* <Link>Home</Link> */}
          <GetPath className="text-slate-900 font-light" />
          {currentUser && (
            <Link
              to="/write"
              className="flex items-center justify-center gap-x-1.5 text-slate-600 hover:text-red-400 duration-300 ease-in-out"
            >
              <span className="text-sm font-semibold font-xlight">
                Write a Post
              </span>
              <MdEditNote className="text-xl" />
            </Link>
          )}
        </div>

        {/* Lastest Post Feed */}
        <LatestPost />

        {/* Posts Feed */}
        <div className="w-full h-full justify-center items-center ">
          {categories
            .filter((category) => {
              const postNumber = postsCategories.filter(
                (pc) => pc.category_id === category.id
              ).length;
              return postNumber >= 4;
            })
            .map((category) => (
              <>
                <div
                  key={category.id}
                  className="w-full h-full flex items-end justify-between pb-3"
                >
                  <h1 className="text-slate-900 font-bold text-2xl">
                    {category.name}
                  </h1>
                  <Link className="flex justify-center items-center gap-1.5 text-base font-semibold text-red-500 hover:text-red-300 duration-300 ease-in-out">
                    See all
                    <FaArrowRight className="text-xs" />
                  </Link>
                </div>
                <div className="grid md:grid-cols-4 gap-10 w-full h-full mt-3 mb-14">
                  {postsCategories
                    .filter((pc) => pc.category_id === category.id)
                    .map((pc) => {
                      const post = posts.find((p) => p.id === pc.post_id);
                      return post ? (
                        <Link
                          key={post.id}
                          className="flex flex-col gap-3 w-full h-full"
                        >
                          <img
                            className="rounded-lg size-full object-cover max-h-48"
                            src={post.image}
                            alt={post.title}
                          />
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="size-6">
                                <img
                                  className="size-full rounded-full rounded object-cover"
                                  src={
                                    users.find(
                                      (user) => user.id === post.user_id
                                    )?.image
                                  }
                                />
                              </span>
                              <p className="text-sm text-slate-600">
                                {
                                  users.find((user) => user.id === post.user_id)
                                    ?.username
                                }
                              </p>
                            </div>
                            <span className="text-sm text-slate-600">
                              {moment(post.created_at)
                                .startOf("minutes")
                                .fromNow()}
                            </span>
                          </div>
                          <div className="flex flex-col gap-3 justify-between h-full">
                            <div className="flex flex-col gap-2">
                              <h1 className="text-xl text-slate-900 font-semibold line-clamp-3">
                                {post.title}
                              </h1>
                              <p className="text-sm line-clamp-4 text-slate-600">
                                {post.body}
                              </p>
                            </div>
                            {getCategoriesForPost(post.id).map((category) => (
                              <span
                                className="font-bold text-sm text-red-400"
                                key={category.id}
                              >
                                {category.name}
                              </span>
                            ))}
                          </div>
                        </Link>
                      ) : null;
                    })}
                </div>
              </>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
