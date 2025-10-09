import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import { BASE_URL } from "./../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  useEffect(() => {
    if (userData) return;
    const fetchUser = async () => {
      try {
        const user = await axios.get(BASE_URL + "/profile/view", {
          withCredentials: true,
          headers: {
            "Cache-Control": "no-cache", // bypass cache
          },
        });
        dispatch(addUser(user.data));
      } catch (err) {
        navigate("/login");
        console.error("Error fetching user: ", err);
      }
    };
    fetchUser();
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Body;
