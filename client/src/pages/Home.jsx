/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// import React from "react";
import { Link } from "react-router-dom";
import GetPath from "../utils/GetPath";
import { categories, posts, postsCategories, users } from "../utils/Data.js";
import { MdEditNote } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import moment from "moment";

const Home = () => {
  function getCategoriesForPost(postId) {
    return postsCategories
      .filter((pc) => pc.post_id === postId)
      .map((postCategory) =>
        categories.find((category) => category.id === postCategory.category_id)
      );
  }

  const lastestPost = posts.reduce((lastest, current) => {
    return new Date(current.created_at) > new Date(lastest.created_at)
      ? current
      : lastest;
  }, posts[0]);

  const author = users.find(
    (user) => user.id === lastestPost.user_id
  )?.username;

  const authorImg = users.find(
    (user) => user.id === lastestPost.user_id
  )?.image;

  return (
    <div className="w-full h-full bg-slate-50 flex justify-center">
      <div className="w-full h-full max-w-screen-xl flex flex-col items-center px-4">
        {/* Pagination + Write Post link */}
        <div className="w-full h-1/6 flex flex-row items-end justify-between  border-b-2 border-b-slate-900 pb-3 mt-10">
          {/* <Link>Home</Link> */}
          <GetPath className="text-slate-900 font-light" />
          <Link className="flex items-center justify-center gap-x-1.5 text-slate-600 hover:text-red-400 duration-300 ease-in-out">
            <span className="text-sm font-semibold font-xlight">
              Write a Post
            </span>
            <MdEditNote className="text-xl" />
          </Link>
        </div>

        {/* Lastest Post Feed */}
        {lastestPost && (
          <div className="w-full h-full flex justify-center">
            <div className="w-full h-full flex justify-center">
              <Link className="w-full h-64 flex items-center justify-center gap-10 my-14">
                {lastestPost.image && (
                  <div className="flex-1 w-1/2 h-full justify-center items-center">
                    <img
                      className="w-full h-full rounded-lg object-cover"
                      src={lastestPost.image}
                    />
                  </div>
                )}
                <div className="flex-1 flex flex-col justify-around w-1/2 h-full">
                  <div className="flex items-center gap-2">
                    <span className="size-8">
                      <img
                        className="size-full rounded-full rounded object-cover"
                        src={authorImg}
                        alt={author + " image"}
                      />
                    </span>
                    <p className="text-md text-slate-600">{author}</p>
                  </div>
                  <div className="">
                    <h1 className="text-4xl text-slate-900 font-semibold mb-6 line-clamp-2">
                      {lastestPost.title}
                    </h1>
                    <p className="text-sm leading-normal text-slate-600 line-clamp-3">
                      {lastestPost.body}
                    </p>
                  </div>
                  <div className="flex flex-row justify-between pr-5">
                    <div className="flex gap-4 items-center">
                      {getCategoriesForPost(lastestPost.id).map((category) => (
                        <span
                          className="font-bold text-red-400"
                          key={category.id}
                        >
                          {category.name}
                        </span>
                      ))}
                      <span className="text-sm text-slate-600">
                        {moment(lastestPost.created_at)
                          .startOf("hour")
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
                                .startOf("hours")
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
