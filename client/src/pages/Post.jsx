/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { defaultImg } from "../utils/Data";
import moment from "moment";
import RecentPosts from "../components/RecentPosts";

const Post = () => {
  const [post, setPost] = useState(null);
  const { postId } = useParams();

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/posts/${postId}`);
        setPost(res.data[0]);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, [postId]);

  return (
    <div className="w-full h-full min-h-screen bg-slate-50 flex justify-center">
      <div className="w-full h-full max-w-screen-xl flex flex-col items-center my-16 px-4">
        {post ? (
          <div className="w-full max-w-5xl  h-fit flex flex-col items-center justify-center">
            <h1 className="my-4 text-3xl text-slate-900 font-bold text-center">
              {post.title}
            </h1>
            <div className="w-full h-full">
              <img
                className="mx-auto my-12 rounded-lg size-full object-cover max-w-3xl"
                src={post.image ? `../upload/${post.image}` : defaultImg.img}
                alt={post.title}
              />
            </div>
            <div className="w-full h-fit flex items-center justify-between mb-12">
              <div className="flex items-center gap-2">
                <span className="size-6">
                  <img
                    className="size-full rounded-full rounded object-cover"
                    src={post.author_img ? post.author_img : defaultImg.img}
                    alt={post.author_name}
                  />
                </span>
                <h3>{post.author_name}</h3>
              </div>
              <div>
                <p>{moment(post.created_at).startOf("minutes").fromNow()}</p>
              </div>
            </div>
            <div className="w-full h-fit">
              <p>{post.body}</p>
            </div>
            <div className="w-full px-3 mt-6 h-fit flex justify-end items-center">
              <p className="font-bold italic text-md text-red-400">
                {post.category_name.toLowerCase()}
              </p>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="italic">This post does not exist</h3>
          </div>
        )}
        <RecentPosts />
      </div>
    </div>
  );
};

export default Post;
