import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Toast } from "bootstrap";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [emailId, setEmailId] = useState(user.emailId);
  const [photoURL, setPhotoURL] = useState(user.photoURL);
  const [skills, setSkills] = useState(user.skills);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          emailId,
          photoURL,
          age,
          gender,
          skills,
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      console.log("Res", res.data.data);
      const toastElement = document.getElementById("liveToast");
      const toast = new Toast(toastElement);
      toast.show();
    } catch (err) {
      setError(err.message);
      console.log("Error: " + err.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        {/* Left Column - Edit Profile Form */}
        <div className="col-md-6 mb-4">
          <div className="card shadow">
            <div className="card-body p-4">
              <h3 className=" text-center mb-3">Edit Profile</h3>
              <form>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label htmlFor="firstname" className="form-label">
                      First Name
                    </label>
                    <input
                      onChange={(e) => setFirstName(e.target.value)}
                      value={firstName}
                      type="text"
                      className="form-control"
                      id="firstname"
                      required
                    />
                  </div>

                  <div className="mb-3 col-md-6">
                    <label htmlFor="lastname" className="form-label">
                      Last Name
                    </label>
                    <input
                      onChange={(e) => setLastName(e.target.value)}
                      value={lastName}
                      type="text"
                      className="form-control"
                      id="lastname"
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email ID
                  </label>
                  <input
                    onChange={(e) => setEmailId(e.target.value)}
                    value={emailId}
                    type="email"
                    className="form-control"
                    id="email"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="photoURL" className="form-label">
                    Photo URL
                  </label>
                  <input
                    onChange={(e) => setPhotoURL(e.target.value)}
                    value={photoURL}
                    type="text"
                    className="form-control"
                    id="photoURL"
                    required
                  />
                </div>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label htmlFor="age" className="form-label">
                      Age
                    </label>
                    <input
                      onChange={(e) => setAge(e.target.value)}
                      value={age}
                      type="number"
                      className="form-control"
                      id="age"
                      required
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label htmlFor="gender" className="form-label">
                      Gender
                    </label>
                    <input
                      onChange={(e) => setGender(e.target.value)}
                      value={gender}
                      type="text"
                      className="form-control"
                      id="gender"
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="about" className="form-label">
                    About
                  </label>
                  <input
                    onChange={(e) => setAbout(e.target.value)}
                    value={about}
                    type="text"
                    className="form-control"
                    id="about"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="skills" className="form-label">
                    Skills
                  </label>
                  <input
                    onChange={(e) => setSkills(e.target.value)}
                    value={skills}
                    type="text"
                    className="form-control"
                    id="skills"
                    required
                  />
                </div>
                <span className="text-danger">{error}</span>
                <div className="d-grid mt-4">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={saveProfile}
                  >
                    Update Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div
          className="toast-container position-fixed top-0 end-0 p-3"
          style={{ zIndex: 9999 }}
        >
          <div
            id="liveToast"
            className="toast"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="toast-header">
              <strong className="me-auto text-black">Profile</strong>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="toast"
                aria-label="Close"
              ></button>
            </div>
            <div className="toast-body">✅ Profile updated successfully!</div>
          </div>
        </div>

        {/* Right Column - UserCard */}
        <div className="col-md-4">
          <UserCard
            user={{
              _id: user._id,
              firstName,
              lastName,
              emailId,
              photoURL,
              skills,
              about,
              gender,
              age,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
