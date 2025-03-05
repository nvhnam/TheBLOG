/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { defaultImg } from "../utils/Data";
import moment from "moment";
import RecentPosts from "../components/RecentPosts";

const PORT = import.meta.env.VITE_API_PORT;
const URL = import.meta.env.VITE_API_URL || `http://localhost:${PORT}`;

const IS_SPRING = import.meta.env.VITE_API_SPRING || false;

const Post = ({ setIsLoading }) => {
  const [post, setPost] = useState(null);
  const { postId } = useParams();

  useEffect(() => {
    const getPost = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `${URL || `http://localhost:${PORT}`}/posts/id/${postId}`,
          IS_SPRING && {
            validateStatus: () => {
              return true;
            },
          }
        );
        setPost(res.data);
        // console.log("post: ", res.data);
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

  // console.log("post: ", post);

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
                src={
                  IS_SPRING
                    ? post.image
                    : post.image
                    ? `../upload/${post.image}`
                    : defaultImg.img
                }
                alt={post.title}
              />
            </div>

            {/* Author Info & Post Date */}
            <div className="w-full flex flex-col sm:flex-row items-center justify-between mb-8 px-4 sm:px-0">
              <div className="flex items-center gap-x-3">
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={
                    IS_SPRING
                      ? post.authorImg || defaultImg.img
                      : post.author_img || defaultImg.img
                  }
                  alt={IS_SPRING ? post.authorName : post.author_name}
                />
                <h3 className="text-lg font-medium">
                  {IS_SPRING ? post.authorName : post.author_name}
                </h3>
              </div>
              <p className="text-sm text-gray-600 mt-2 sm:mt-0">
                {moment(IS_SPRING ? post.createdAt : post.created_at)
                  .startOf("minutes")
                  .fromNow()}
              </p>
            </div>

            {/* Post Body */}
            <div className="w-full px-4 md:px-8">
              <p className="text-base md:text-lg text-gray-800 leading-relaxed">
                {post.body}
              </p>
            </div>

            {/* Category Label */}
            <div className="w-full px-4 mt-6 flex justify-end">
              <p className="font-bold italic text-md text-red-400">
                {IS_SPRING ? post.categoryName : post.category_name}
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
