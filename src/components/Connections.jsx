import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const res = await axios.get(BASE_URL + "/user/connections", {
          withCredentials: true,
          headers: {
            "Cache-Control": "no-cache",
          },
        });
        dispatch(addConnections(res.data.data));
      } catch (err) {
        console.error("Error: ", err);
      }
    };
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0)
    return <p className="text-center mt-5">No connections found.</p>;

  return (
    <div className="text-center my-5">
      <h3 className="mb-4">Connections</h3>
      <div className="d-flex flex-column align-items-center gap-3">
        {connections.map((connection, index) => (
          <div key={index} className="card shadow" style={{ width: "28rem" }}>
            <div className="card-body d-flex align-items-center">
              <img
                className="rounded-circle"
                src={connection.photoURL}
                alt="profile"
                width="60"
                height="60"
              />
              <div className="ms-3 text-start">
                <h6 className="card-title fw-bold mb-1">
                  {connection.firstName + " " + connection.lastName}
                </h6>
                <p className="card-text mb-2">{connection.about}</p>
                {/* <div className="d-flex justify-content-center">
                  <button className="btn btn-danger me-2">Ignore</button>
                  <button className="btn btn-success">Interested</button>
                </div> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;
