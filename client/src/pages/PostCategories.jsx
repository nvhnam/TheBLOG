/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";
import { defaultImg } from "../utils/Data";
import moment from "moment";

const PostCategories = ({ setIsLoading }) => {
  const { category } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPostsByCategory = async () => {
      try {
        setIsLoading(true);
        const res = await api.get(`/posts/category/${category}`);
        console.log("PostCategories res.data: ", res.data);
        setPosts(res.data);
      } catch (error) {
        console.log("Error getting posts by category ", error);
      } finally {
        setIsLoading(false);
      }
    };
    getPostsByCategory();
  }, [category, setIsLoading]);

  return (
    <div className="w-full h-full flex min-h-screen justify-center bg-slate-50">
      <div className="w-full h-full  max-w-screen-xl flex flex-col items-center px-4 my-12">
        <div className="w-full h-full flex items-end justify-between">
          <h1 className="text-slate-900 font-bold text-2xl">{category}</h1>
        </div>
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="w-full h-full flex justify-center">
              <div className="w-full h-full flex justify-center">
                <Link
                  to={`/post/${post.id}`}
                  className="w-full h-64 flex items-center justify-center gap-10 my-14"
                >
                  {post.image && (
                    <div className="flex-1 w-1/2 h-full justify-center items-center">
                      <img
                        className="w-full h-full rounded-lg object-cover"
                        src={post.image || defaultImg.img}
                      />
                    </div>
                  )}
                  <div
                    className={`flex-1 flex flex-col justify-around h-full ${
                      post.image ? "w-1/2" : "w-full"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="size-8">
                        <img
                          className="size-full rounded-full rounded object-cover"
                          src={post.authorImg || defaultImg.img}
                          alt={post.authorName + " image"}
                        />
                      </span>
                      <p className="text-md text-slate-600">
                        {post.authorName}
                      </p>
                    </div>
                    <div className="">
                      <h1 className="text-4xl text-slate-900 font-semibold mb-6 line-clamp-2">
                        {post.title}
                      </h1>
                      <p className="text-sm leading-normal text-slate-600 line-clamp-3">
                        {post.body}
                      </p>
                    </div>
                    <div className="flex flex-row justify-between pr-5">
                      <div className="flex gap-4 items-center">
                        <span className="font-bold text-red-400">
                          {Array.isArray(post.categoryNames) ? post.categoryNames[0] : post.categoryNames}
                        </span>
                        <span className="text-sm text-slate-600">
                          {moment(post.createdAt)
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
          ))
        ) : (
          <div className="w-full h-full min-h-screen -mt-24 flex justify-center items-center">
            <h3 className="text-center italic">There are no post</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCategories;
