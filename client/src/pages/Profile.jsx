/* eslint-disable no-unused-vars */
// import React from "react";

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { defaultImg } from "../utils/Data";
import moment from "moment";
import { AuthContext } from "../context/authContext";

const Profile = () => {
  const [userPosts, setUserPosts] = useState([]);
  const { userId } = useParams();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getUserPosts = async () => {
      const res = await axios.get(`http://localhost:8800/profile/${userId}`, {
        withCredentials: true,
      });
      const sortedResults = res.data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setUserPosts(sortedResults);
    };

    getUserPosts();
  }, [userId]);

  //   console.log(userPosts);

  return (
    <div className="w-full h-full flex justify-center bg-slate-50 min-h-screen">
      <div className="w-full h-full max-w-screen-xl flex flex-col items-center px-4 mb-28">
        <div className="w-full h-fit my-14 flex justify-start items-center gap-3">
          <span className="size-24">
            <img
              className="size-full rounded-full rounded object-cover"
              src={
                userPosts.author_img
                  ? `../upload/${userPosts.author_img}`
                  : defaultImg.img
              }
            />
          </span>
          <p className="text-4xl text-slate-600">{currentUser.username}</p>
        </div>

        <div className="w-full h-full max-w-6xl flex flex-col items-center gap-24">
          {userPosts.map((post) => (
            <div
              key={post.id}
              className="w-full h-fit flex flex-col justify-center items-center"
            >
              <div className="w-full h-full  flex items-center justify-center">
                <div className="w-1/4 h-full  flex flex-col items-center justify-center">
                  <p className="text-md w-full text-center h-full text-slate-600">
                    {moment(post.created_at).startOf("minutes").fromNow()}
                  </p>
                </div>
                <div className="w-2/3 bg-gray-50 shadow-xl gap-5 rounded-t-md  h-full flex flex-col justify-center items-center">
                  <div className="w-full h-full flex mt-4 p-3 gap-4">
                    <span className="size-24 w-1/3 h-full">
                      <img
                        className="size-full rounded-lg rounded object-cover"
                        src={
                          post.image
                            ? `../upload/${post.image}`
                            : defaultImg.img
                        }
                      />
                    </span>
                    <div className="w-2/4 h-full flex flex-col gap-3 justify-center">
                      <h1 className="text-2xl text-slate-900 line-clamp-3 font-semibold">
                        {post.title}
                      </h1>
                      <p className="text-sm line-clamp-2 text-slate-600">
                        {post.body}
                      </p>
                    </div>
                  </div>
                  <div className="w-full bg-neutral-200 h-full flex items-center p-2 justify-end rounded-b-md">
                    <Link
                      className="w-full hover:text-red-300 font-semibold text-red-500 text-center h-full"
                      to={`/post/${post.id}`}
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
