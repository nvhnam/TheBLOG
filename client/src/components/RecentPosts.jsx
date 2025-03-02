// import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { defaultImg } from "../utils/Data";

const PORT = import.meta.env.VITE_API_PORT;
const URL = import.meta.env.VITE_API_URL || `http://localhost:${PORT}`;

const IS_SPRING = import.meta.env.VITE_API_SPRING || false;

const RecentPosts = () => {
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get(
          `${URL || `http://localhost:${PORT}`}/posts/all`,
          IS_SPRING && {
            validateStatus: () => {
              return true;
            },
          }
        );
        if (res.status === 302) {
          const sortedPosts = res.data.sort(
            (a, b) =>
              new Date(IS_SPRING ? b.createdAt : b.created_at) -
              new Date(IS_SPRING ? a.createdAt : a.created_at)
          );
          setRecentPosts(sortedPosts.slice(0, 8));
        }
        // console.log(recentPosts);
      } catch (error) {
        console.log("Error fecthing posts: ", error);
      }
    };
    getPosts();
  }, []);

  // console.log("RecentPost: ", recentPosts);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center mt-20">
      <div className="w-full h-full">
        <h3 className="text-slate-900 font-bold text-2xl">Recent posts</h3>
      </div>
      <div className="grid md:grid-cols-4 gap-10 w-full h-full mt-12 mb-14">
        {recentPosts.map((post) => (
          <Link
            to={`/post/${post.id}`}
            key={post.id}
            className="flex flex-col gap-3 w-full h-full"
          >
            <img
              className="rounded-lg size-full object-cover max-h-48"
              src={
                IS_SPRING
                  ? post.image
                  : post.image
                  ? `../upload/${post.image}`
                  : defaultImg.img
              }
              alt={post.title}
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="size-6">
                  <img
                    className="size-full rounded-full rounded object-cover"
                    src={
                      IS_SPRING
                        ? post.authorImg
                          ? post.authorImg
                          : defaultImg.img
                        : post.author_img
                        ? post.author_img
                        : defaultImg.img
                    }
                  />
                </span>
                <p className="text-sm text-slate-600">
                  {IS_SPRING ? post.authorName : post.author_name}
                </p>
              </div>
              <span className="text-sm text-slate-600">
                {moment(IS_SPRING ? post.createdAt : post.created_at)
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

              <span className="font-bold text-sm text-red-400">
                {IS_SPRING ? post.categoryName : post.category_name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentPosts;
