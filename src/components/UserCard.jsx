import React from "react";
import { BASE_URL } from "./../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  console.log("User", user._id);
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(userId));
      console.log(res);
    } catch (err) {
      console.log("Error: " + err.message);
    }
  };

  return (
    <div className="card shadow" style={{ width: "18rem" }}>
      <img
        src={user.photoURL}
        className="card-img-top"
        alt={`${user.firstName} ${user.lastName}`}
      />
      <div className="card-body">
        <h5 className="card-title">
          {user.firstName} {user.lastName}
        </h5>
        {user.age && <span className="card-text me-3">Age: {user.age}</span>}
        {user.gender && <span>Gender: {user.gender}</span>}
        <p className="card-text">{user.about || "No description available."}</p>
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-danger me-2"
            onClick={() => handleSendRequest("ignored", user._id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-success"
            onClick={() => handleSendRequest("interested", user._id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
