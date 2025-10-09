import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const selecter = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log("Error: " + err.message);
    }
  };

  return (
    <div>
      <nav
        class="navbar navbar-expand-lg bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div class="container-fluid">
          <Link to={"/"} class="navbar-brand">
            🧑‍💻 DevTinder
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>

            {selecter && (
              <div class="dropdown">
                <a
                  class="navbar-brand"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={selecter.photoURL}
                    alt="Profile"
                    width="30"
                    height="30"
                    class="rounded-circle"
                  />{" "}
                  <span>{selecter.firstName}</span>
                </a>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link to={"/profile"} class="dropdown-item">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to={"/connections"} class="dropdown-item">
                      Connections
                    </Link>
                  </li>
                  <li>
                    <Link to={"/Requests"} class="dropdown-item">
                      Requests
                    </Link>
                  </li>
                  <li>
                    <a onClick={handleLogout} class="dropdown-item" href="#">
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
