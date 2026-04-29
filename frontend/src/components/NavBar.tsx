import { Link, useLocation } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const location = useLocation();

  const hideNavBar = ["/", "/register"].includes(location.pathname);

  if (hideNavBar) return null;

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/home" className="navbar-title">
          StoryBox
        </Link>
      </div>

      <ul className="navbar-right">
        <li>
          <Link
            to="/home"
            className={`navbar-link ${
              location.pathname === "/home" ? "active" : ""
            }`}
          >
            Home
          </Link>
        </li>

        <li>
          <Link
            to="/add-post"
            className={`navbar-link ${
              location.pathname === "/add-post" ? "active" : ""
            }`}
          >
            Add Post
          </Link>
        </li>

        <li>
          <Link
            to="/my-posts"
            className={`navbar-link ${
              location.pathname === "/my-posts" ? "active" : ""
            }`}
          >
            My Posts
          </Link>
        </li>

        <li>
          <Link
            to="/profile"
            className={`navbar-link ${
              location.pathname === "/profile" ? "active" : ""
            }`}
          >
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;