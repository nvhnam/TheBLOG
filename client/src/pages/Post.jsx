/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import { defaultImg } from "../utils/Data";
import moment from "moment";
import RecentPosts from "../components/RecentPosts";

const Post = ({ setIsLoading }) => {
  const [post, setPost] = useState(null);
  const { postId } = useParams();

  useEffect(() => {
    const getPost = async () => {
      try {
        setIsLoading(true);
        const res = await api.get(`/posts/id/${postId}`);
        setPost(res.data);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getPost();
  }, [postId, setIsLoading]);

  return (
    <div className="w-full min-h-screen bg-slate-50 flex justify-center">
      <div className="w-full max-w-screen-xl flex flex-col items-center my-16 px-4">
        {post ? (
          <div className="w-full max-w-5xl flex flex-col items-center">
            {/* Post Title */}
            <h1 className="my-4 text-3xl md:text-4xl text-slate-900 font-bold text-center">
              {post.title}
            </h1>

            {/* Post Image */}
            <div className="w-full flex justify-center">
              <img
                className="w-full max-w-3xl mx-auto my-6 rounded-lg object-cover"
                src={post.image || defaultImg.img}
                alt={post.title}
              />
            </div>

            {/* Author Info & Post Date */}
            <div className="w-full flex flex-col sm:flex-row items-center justify-between mb-8 px-4 sm:px-0">
              <div className="flex items-center gap-x-3">
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={post.authorImg || defaultImg.img}
                  alt={post.authorName}
                />
                <h3 className="text-lg font-medium">
                  {post.authorName}
                </h3>
              </div>
              <p className="text-sm text-gray-600 mt-2 sm:mt-0">
                {moment(post.createdAt)
                  .startOf("minutes")
                  .fromNow()}
              </p>
            </div>

            {/* Post Body */}
            <div className="w-full px-4 md:px-8 whitespace-pre-line">
              <p className="text-base md:text-lg text-gray-800 leading-relaxed">
                {post.body}
              </p>
            </div>

            {/* Category Label */}
            <div className="w-full px-4 mt-6 flex justify-end">
              <p className="font-bold italic text-md text-red-400">
                {Array.isArray(post.categoryName) ? post.categoryName.join(", ") : post.categoryName}
              </p>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="italic text-center text-gray-600">
              This post does not exist
            </h3>
          </div>
        )}

        {/* Recent Posts Section */}
        <RecentPosts />
      </div>
    </div>
  );
};

export default Post;
