/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// import React from "react";
import { Link } from "react-router-dom";
import GetPath from "../utils/GetPath";
import { MdEditNote } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import moment from "moment";
import LatestPost from "../components/LatestPost.jsx";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/authContext.jsx";
import api from "../api/api";
import { defaultImg } from "../utils/Data.js";

const Home = ({ setIsLoading }) => {
  const { currentUser } = useContext(AuthContext);
  const [groupedPosts, setGroupedPosts] = useState({});
  const [latestPost, setLatestPost] = useState({});

  useEffect(() => {
    const getPosts = async () => {
      try {
        setIsLoading(true);
        const res = await api.get("/posts/all/paginated", {
          params: { page: 0, size: 20, sortBy: "createdAt" }
        });

        // The endpoint returns sorted data by createdAt descending
        const sortedPosts = res.data.content;

        setLatestPost(sortedPosts[0]);

        const postsByCategory = sortedPosts.reduce((acc, post) => {
          // In Spring, categoryNames is a List<String>. For grouping, we'll use the first one.
          const category = Array.isArray(post.categoryNames)
            ? post.categoryNames[0]
            : post.categoryNames;
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(post);

          return acc;
        }, {});

        const filteredPostsByCategory = Object.keys(postsByCategory)
          .reduce((acc, category) => {
            acc[category] = postsByCategory[category];
            return acc;
          }, {});

        setGroupedPosts(filteredPostsByCategory);      } catch (error) {
        console.log("Error fetching posts: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    getPosts();
  }, [setIsLoading]);

  return (
    <div className="w-full h-full min-h-screen bg-slate-50 flex justify-center">
      <div className="w-full h-full min-h-screen max-w-screen-xl flex flex-col items-center px-4">
        {/* Pagination + Write Post link */}
        <div className="w-full h-1/6 flex flex-row items-end justify-between  border-b-2 border-b-slate-900 pb-3 mt-10">
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

        {/* Latest Post Feed */}
        <LatestPost setIsLoading={setIsLoading} />

        {/* Posts Feed */}
        <div className="w-full h-full justify-center items-center ">
          {Object.keys(groupedPosts).map((category) => (
            <div key={category}>
              <div className="w-full h-full flex items-end justify-between pb-3">
                <h1 className="text-slate-900 font-bold text-2xl">
                  {category}
                </h1>
                <Link
                  to={`/${category}`}
                  className="flex justify-center items-center gap-1.5 text-base font-semibold text-red-500 hover:text-red-300 duration-300 ease-in-out"
                >
                  See all
                  <FaArrowRight className="text-xs" />
                </Link>
              </div>
              <div className="grid md:grid-cols-4 gap-10 w-full h-full mt-3 mb-14">
                {groupedPosts[category].slice(0, 4).map((post) => (
                  <Link
                    key={post.id}
                    className="flex flex-col gap-3 w-full h-full"
                    to={`/post/${post.id}`}
                  >
                    <img
                      className="rounded-lg size-full object-cover max-h-48"
                      src={post.image || defaultImg.img}
                      alt={post.title}
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="size-6">
                          <img
                            className="size-full rounded-full rounded object-cover"
                            src={post.authorImg || defaultImg.img}
                            alt={post.authorName}
                          />
                        </span>
                        <p className="text-sm text-slate-600">
                          {post.authorName}
                        </p>
                      </div>
                      <span className="text-sm text-slate-600">
                        {moment(post.createdAt).startOf("minutes").fromNow()}
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
                      <span className="font-bold text-sm text-red-400">
                        {category}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
