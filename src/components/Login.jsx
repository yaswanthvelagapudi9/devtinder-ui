import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isLoginForm, setLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Invalid credentials or server error.");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      console.error(err);
      setError("User already exists or server error.");
    }
  };

  const activeColor = isLoginForm ? "#007bff" : "#9b51e0";

  return (
    <div
      className="card shadow-lg border-0 d-flex justify-content-center mx-auto my-5"
      style={{
        width: "400px",
        borderRadius: "20px",
        overflow: "hidden",
        background: "#fff",
      }}
    >
      <div className="card-body p-4">
        {/* Toggle Header */}
        <div className="d-flex justify-content-around mb-4 position-relative">
          <p
            className="fw-semibold mb-0"
            style={{
              cursor: "pointer",
              color: isLoginForm ? activeColor : "#6c757d",
              fontSize: "1.1rem",
              transition: "color 0.3s ease",
            }}
            onClick={() => setLoginForm(true)}
          >
            Login
          </p>
          <p
            className="fw-semibold mb-0"
            style={{
              cursor: "pointer",
              color: !isLoginForm ? activeColor : "#6c757d",
              fontSize: "1.1rem",
              transition: "color 0.3s ease",
            }}
            onClick={() => setLoginForm(false)}
          >
            Sign Up
          </p>

          {/* Animated underline */}
          <div
            style={{
              position: "absolute",
              bottom: "-4px",
              left: isLoginForm ? "15%" : "65%",
              width: "18%",
              height: "3px",
              backgroundColor: activeColor,
              borderRadius: "3px",
              transition: "all 0.3s ease",
            }}
          ></div>
        </div>

        {/* Form */}
        <form onSubmit={isLoginForm ? handleLogin : handleSignUp}>
          {!isLoginForm && (
            <>
              <div className="mb-3">
                <label className="form-label fw-semibold">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          <div className="mb-3">
            <label className="form-label fw-semibold">Email ID</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-danger small mt-2">{error}</p>}

          <div className="d-grid mt-4">
            <button
              type="submit"
              className="btn fw-semibold text-white btn-lg"
              style={{
                backgroundColor: activeColor,
                border: "none",
                borderRadius: "10px",
                transition: "background 0.3s ease",
              }}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="small text-muted">
            {isLoginForm
              ? "Don’t have an account?"
              : "Already have an account?"}{" "}
            <span
              className="fw-semibold"
              style={{
                color: activeColor,
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => setLoginForm(!isLoginForm)}
            >
              {isLoginForm ? "Sign Up" : "Login"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
