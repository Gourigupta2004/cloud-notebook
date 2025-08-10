import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  let location = useLocation();
  const token = localStorage.getItem("token");

  
  // Determine the message based on current path
  const message = !token
    ? location.pathname === "/signup"
      ? "Hey, welcome!"
      : "Hello, Welcome Back!"
    : null;

  return (
    <nav
      className="navbar navbar-expand-lg shadow-sm"
      style={{
        backgroundColor: "#fffaf0", // light beige notebook paper tone
        fontFamily: "'Patrick Hand', cursive", // handwritten font
        borderBottom: "2px dashed #8a4fff", // doodle-style purple border
      }}
    >
      <div className="container-fluid">
        <Link
          className="navbar-brand fw-bold"
          to="/"
          style={{
            color: "#8a4fff",
            fontSize: "1.7rem", // slightly bigger for handwritten font
          }}
        >
          📓 iNotebook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
                style={{
                  color: location.pathname === "/" ? "#8a4fff" : "#444",
                  borderBottom:
                    location.pathname === "/" ? "2px solid #8a4fff" : "none",
                  transition: "all 0.2s ease",
                }}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
                style={{
                  color: location.pathname === "/about" ? "#8a4fff" : "#444",
                  borderBottom:
                    location.pathname === "/about" ? "2px solid #8a4fff" : "none",
                  transition: "all 0.2s ease",
                }}
              >
                About
              </Link>
            </li>
          </ul>

          {!token ? (
            <span
              style={{
                color: "#8a4fff",
                fontStyle: "italic",
                fontWeight: "bold",
                paddingRight: "10px",
                userSelect: "none",
                whiteSpace: "nowrap",
              }}
            >
              {message}
            </span>
          ) : (
            <button
              className="btn"
              onClick={handleLogout}
              style={{
                backgroundColor: "#8a4fff",
                color: "#fff",
                border: "2px dashed #444",
                borderRadius: "20px",
                fontWeight: "bold",
                transition: "transform 0.2s ease",
              }}
              onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
