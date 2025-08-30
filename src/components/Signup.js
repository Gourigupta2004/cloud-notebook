import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

  const host =
    (typeof window !== "undefined" &&
      (window.location.hostname === "localhost" ||
       window.location.hostname === "127.0.0.1"))
      ? "http://localhost:5000"
      : "";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem("token", json.authToken);
      navigate("/");
      props.showAlert("Account created successfully", "success");
    } else {
      props.showAlert("Invalid credentials", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="container mt-3 p-3"
      style={{
        maxWidth: "450px",
        backgroundColor: "#fffaf0",
        border: "2px dashed #8a2be2",
        borderRadius: "15px",
        fontFamily: "'Patrick Hand', cursive",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2
        className="text-center mb-3"
        style={{ color: "#8a2be2", fontWeight: "bold", fontSize: "1.5rem" }}
      >
        ✏️ Create an account to use Cloud Notebook
      </h2>
      <form onSubmit={handleSubmit}>
        {["name", "email", "password"].map((field) => (
          <div className="mb-2" key={field}>
            <label
              htmlFor={field}
              className="form-label"
              style={{ fontSize: "1rem" }}
            >
              {field === "cpassword" ? "Confirm Password" : field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={field.includes("password") ? "password" : "text"}
              className="form-control"
              id={field}
              name={field}
              onChange={onChange}
              required
              minLength={field.includes("password") ? 5 : undefined}
              style={{
                border: "2px dashed #8a2be2",
                borderRadius: "10px",
                fontFamily: "'Patrick Hand', cursive",
                padding: "6px 8px",
                fontSize: "1rem",
                height: "36px",
              }}
            />
          </div>
        ))}

        <button
          type="submit"
          className="btn w-100"
          style={{
            backgroundColor: "#8a2be2",
            color: "#fff",
            border: "2px dashed #444",
            borderRadius: "20px",
            fontWeight: "bold",
            padding: "7px",
            fontSize: "1.05rem",
            transition: "transform 0.2s ease",
          }}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
