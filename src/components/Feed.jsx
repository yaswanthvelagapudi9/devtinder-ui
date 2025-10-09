import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  useEffect(() => {
    if (feed?.data) return;

    const getFeed = async () => {
      try {
        const res = await axios.get(BASE_URL + "/feed", {
          withCredentials: true,
          headers: { "Cache-Control": "no-cache" },
        });
        dispatch(addFeed(res.data)); // res.data = { data: [...] }
      } catch (err) {
        console.error("Feed API Error:", err.response?.data || err.message);
      }
    };

    getFeed();
  }, []);

  if (!feed) return;

  return feed?.data?.length > 0 ? (
    <div className="d-flex flex-wrap justify-content-center mt-4 gap-3">
      {feed.data.map((user) => (
        <UserCard key={user._id} user={user} />
      ))}
    </div>
  ) : (
    <p className="text-center mt-5">No feed data available.</p>
  );
};

export default Feed;
