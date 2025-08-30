import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

  // ✅ localhost in dev; relative /api in production (Render)
  const host =
    (typeof window !== "undefined" &&
      (window.location.hostname === "localhost" ||
       window.location.hostname === "127.0.0.1"))
      ? "http://localhost:5000"
      : "";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      navigate("/");
      props.showAlert("Logged in successfully", "success");
    } else {
      props.showAlert("Invalid credentials", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="container mt-4 p-4"
      style={{
        maxWidth: "500px",
        backgroundColor: "#fffaf0",
        border: "2px dashed #8a2be2",
        borderRadius: "15px",
        fontFamily: "'Patrick Hand', cursive",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2
        className="text-center mb-4"
        style={{ color: "#8a2be2", fontWeight: "bold", fontSize: "1.8rem" }}
      >
        ✏️ Login to Cloud Notebook
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label
            htmlFor="email"
            className="form-label"
            style={{ fontSize: "1.3rem" }}
          >
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={onChange}
            value={credentials.email}
            aria-describedby="emailHelp"
            style={{
              border: "2px dashed #8a2be2",
              borderRadius: "10px",
              fontFamily: "'Patrick Hand', cursive",
              padding: "8px",
              fontSize: "1.05rem",
            }}
          />
          <div
            id="emailHelp"
            className="form-text"
            style={{ fontSize: "0.9rem" }}
          >
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label
            htmlFor="password"
            className="form-label"
            style={{ fontSize: "1.3rem" }}
          >
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            value={credentials.password}
            style={{
              border: "2px dashed #8a2be2",
              borderRadius: "10px",
              fontFamily: "'Patrick Hand', cursive",
              padding: "8px",
              fontSize: "1.05rem",
            }}
          />
        </div>
        <button
          type="submit"
          className="btn w-100"
          style={{
            backgroundColor: "#8a2be2",
            color: "#fff",
            border: "2px dashed #444",
            borderRadius: "20px",
            fontWeight: "bold",
            padding: "8px",
            fontSize: "1.1rem",
            transition: "transform 0.2s ease",
          }}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        >
          Login
        </button>
      </form>

      <div
        style={{
          marginTop: "20px",
          textAlign: "center",
          fontFamily: "'Patrick Hand', cursive",
          fontSize: "1.05rem",
          color: "#8a2be2",
        }}
      >
        Don't have any account?{" "}
        <Link
          to="/signup"
          style={{
            color: "#8a2be2",
            textDecoration: "none",
            fontWeight: "bold",
            marginLeft: "5px",
            transition: "color 0.2s ease",
          }}
          onMouseOver={(e) => (e.target.style.color = "#5d23b5")}
          onMouseOut={(e) => (e.target.style.color = "#8a2be2")}
        >
          Signup →
        </Link>
      </div>
    </div>
  );
};

export default Login;
