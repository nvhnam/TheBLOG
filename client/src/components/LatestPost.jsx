// import React from "react";
import { posts, users } from "../utils/Data";
import { Link } from "react-router-dom";
import moment from "moment";
import getCategoriesForPost from "../utils/GetCategoriesForPost";

const LatestPost = () => {
  const latestPost = posts.reduce((latest, current) => {
    return new Date(current.created_at) > new Date(latest.created_at)
      ? current
      : latest;
  }, posts[0]);

  const latestAuthor = users.find(
    (user) => user.id === latestPost.id
  )?.username;

  const latestAuthorImage = users.find(
    (user) => user.id === latestPost.id
  )?.image;

  return (
    <>
      {latestPost && (
        <div className="w-full h-full flex justify-center">
          <div className="w-full h-full flex justify-center">
            <Link className="w-full h-64 flex items-center justify-center gap-10 my-14">
              {latestPost.image && (
                <div className="flex-1 w-1/2 h-full justify-center items-center">
                  <img
                    className="w-full h-full rounded-lg object-cover"
                    src={latestPost.image}
                  />
                </div>
              )}
              <div
                className={`flex-1 flex flex-col justify-around h-full ${
                  latestPost.image ? "w-1/2" : "w-full"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="size-8">
                    <img
                      className="size-full rounded-full rounded object-cover"
                      src={latestAuthorImage}
                      alt={latestAuthor + " image"}
                    />
                  </span>
                  <p className="text-md text-slate-600">{latestAuthor}</p>
                </div>
                <div className="">
                  <h1 className="text-4xl text-slate-900 font-semibold mb-6 line-clamp-2">
                    {latestPost.title}
                  </h1>
                  <p className="text-sm leading-normal text-slate-600 line-clamp-3">
                    {latestPost.body}
                  </p>
                </div>
                <div className="flex flex-row justify-between pr-5">
                  <div className="flex gap-4 items-center">
                    {getCategoriesForPost(latestPost.id).map((category) => (
                      <span
                        className="font-bold text-red-400"
                        key={category.id}
                      >
                        {category.name}
                      </span>
                    ))}
                    <span className="text-sm text-slate-600">
                      {moment(latestPost.created_at).startOf("hour").fromNow()}
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
    </>
  );
};

export default LatestPost;
