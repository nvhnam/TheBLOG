/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LatestPost from "../components/LatestPost";

const PostCategories = () => {
  const { category } = useParams();
  const [posts, setPosts] = useState({});
  const theCategory = category.charAt(0).toUpperCase() + category.slice(1);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get("http://localhost:8800/posts/all");

        const sortedResults = res.data.sort(
          (a, b) => new Date(b.create_at) - new Date(a.create_at)
        );

        const postsByCategory = sortedResults.reduce((acc, post) => {
          const category = post.category_name;
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(post);
          return acc;
        }, {});

        const filteredPostsByCategory = Object.keys(postsByCategory)
          .filter((category) => category === theCategory)
          .reduce((acc, category) => {
            acc[category] = postsByCategory[category];
            return acc;
          }, {});

        setPosts(filteredPostsByCategory);

        console.log(filteredPostsByCategory);
      } catch (error) {
        console.log(error);
      }
    };
    getPosts();
  }, [theCategory]);

  return (
    <div className="w-full h-full flex min-h-screen justify-center bg-slate-50">
      <div className="w-full h-full  max-w-screen-xl flex flex-col items-center px-4 my-12">
        <div className="w-full h-full flex items-end justify-between">
          <h1 className="text-slate-900 font-bold text-2xl">{theCategory}</h1>
        </div>
        {posts[theCategory] && posts[theCategory].length > 0 ? (
          posts[theCategory].map((post) => (
            <LatestPost key={post.id} latestPost={post} />
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
