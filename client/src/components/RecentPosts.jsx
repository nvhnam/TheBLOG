// import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import api from "../api/api";
import { defaultImg } from "../utils/Data";

const RecentPosts = () => {
  const [recentPosts, setRecentPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await api.get("/posts/all/paginated", {
          params: { page, size: 8, sortBy: "createdAt" }
        });
        setRecentPosts(res.data.content);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.log("Error fetching posts: ", error);
      }
    };
    getPosts();
  }, [page]);

  const handleNext = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (page > 0) {
      setPage(page - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

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
                <p className="text-sm text-slate-600">{post.authorName}</p>
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
                {Array.isArray(post.categoryNames)
                  ? post.categoryNames.join(", ")
                  : post.categoryNames}
              </span>
            </div>
          </Link>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mb-14">
          <button
            onClick={handlePrev}
            disabled={page === 0}
            className={`px-4 py-2 rounded font-semibold ${page === 0 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-red-400 text-white hover:bg-red-500 duration-200"}`}
          >
            Previous
          </button>
          <span className="text-slate-700 font-medium text-sm">Page {page + 1} of {totalPages}</span>
          <button
            onClick={handleNext}
            disabled={page >= totalPages - 1}
            className={`px-4 py-2 rounded font-semibold ${page >= totalPages - 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-red-400 text-white hover:bg-red-500 duration-200"}`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentPosts;
