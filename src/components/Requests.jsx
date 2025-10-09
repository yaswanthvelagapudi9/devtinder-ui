import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.request);
  const dispatch = useDispatch();

  const reviewRequests = async (status, _id) => {
    try {
      const res = axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      console.log(res);
      dispatch(removeRequests(_id));
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(BASE_URL + "/user/requests/received", {
          withCredentials: true,
          headers: {
            "Cache-Control": "no-cache",
          },
        });
        dispatch(addRequests(res.data.data));
      } catch (err) {
        console.error("Error: ", err);
      }
    };
    fetchRequests();
  }, []);

  if (!requests) return;
  if (requests.length === 0)
    return <p className="text-center mt-5">No requests found.</p>;

  return (
    <div className="text-center my-5">
      <h3 className="mb-4">Requests</h3>
      <div className="d-flex flex-column align-items-center gap-3">
        {requests.map((connection, index) => (
          <div key={index} className="card shadow" style={{ width: "34rem" }}>
            <div className="card-body d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <img
                  className="rounded-circle"
                  src={connection.fromUserId.photoURL}
                  alt="profile"
                  width="60"
                  height="60"
                />
                <div className="ms-3 text-start">
                  <h6 className="card-title fw-bold mb-1">
                    {connection.fromUserId.firstName +
                      " " +
                      connection.fromUserId.lastName}
                  </h6>
                  <p className="card-text mb-0">
                    {connection.fromUserId.about}
                  </p>
                </div>
              </div>
              <div className="d-flex ms-3">
                <button
                  className="btn btn-danger me-2"
                  onClick={() => reviewRequests("rejected", connection._id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => reviewRequests("accepted", connection._id)}
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requests;
