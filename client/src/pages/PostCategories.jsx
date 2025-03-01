/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LatestPost from "../components/LatestPost";

const PORT = import.meta.env.VITE_API_PORT;
const URL = import.meta.env.VITE_API_URL || `http://localhost:${PORT}`;

const IS_SPRING = import.meta.env.VITE_API_SPRING || false;

const PostCategories = () => {
  const { category } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPostsByCategory = async () => {
      try {
        const res = await axios.get(
          `${URL || `http://localhost:${PORT}`}/posts/category/${category}`,
          IS_SPRING && {
            validateStatus: () => {
              return true;
            },
          }
        );
        // console.log("PostCategories res.data: ", res.data);
        setPosts(res.data);
      } catch (error) {
        console.log("Error getting posts by category ", error);
      }
    };
    getPostsByCategory();
  }, [category]);

  // console.log("Params category: ", category);

  return (
    <div className="w-full h-full flex min-h-screen justify-center bg-slate-50">
      <div className="w-full h-full  max-w-screen-xl flex flex-col items-center px-4 my-12">
        <div className="w-full h-full flex items-end justify-between">
          <h1 className="text-slate-900 font-bold text-2xl">{category}</h1>
        </div>
        {posts && posts.length > 0 ? (
          posts.map((post) => <LatestPost key={post.id} latestPost={post} />)
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
