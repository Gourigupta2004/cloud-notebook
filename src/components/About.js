import React from "react";

const About = () => {
  return (
    <div
      className="container my-4 p-4"
      style={{
        maxWidth: "700px",
        backgroundColor: "#fffaf0",
        border: "3px dashed #8a4fff",
        borderRadius: "15px",
        boxShadow: "0 4px 20px rgba(138, 75, 255, 0.15)",
        fontFamily: "'Patrick Hand', cursive",
        color: "#4b3b99",
        userSelect: "none",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
        About iNotebook 📓
      </h1>
      <p style={{ fontSize: "1.3rem", lineHeight: "1.6" }}>
        Welcome to <strong>iNotebook</strong> — your friendly, digital notebook designed to
        capture your thoughts, ideas, and daily tasks with a touch of creativity! Whether you're a
        student, professional, or just someone who loves jotting down notes, iNotebook is here to
        keep everything organized in one beautiful place.
      </p>

      <h3 style={{ marginTop: "2rem", fontWeight: "bold", fontSize: "1.8rem" }}>
        Features you'll love:
      </h3>
      <ul style={{ fontSize: "1.2rem", lineHeight: "1.5", paddingLeft: "20px" }}>
        <li>✏️ Add, edit, and delete notes quickly and easily.</li>
        <li>🎨 Personalize your notes with tags to stay organized.</li>
        <li>🔒 Secure your notes with login authentication.</li>
        <li>⚡ Fast, responsive, and user-friendly interface inspired by real handwriting.</li>
        <li>📱 Access your notes anytime, anywhere.</li>
      </ul>

      <p style={{ fontSize: "1.3rem", marginTop: "2rem" }}>
        We believe note-taking should be as natural and enjoyable as putting pen to paper. That’s why
        iNotebook combines simplicity with a playful, handwritten style to make your experience
        truly delightful.
      </p>

      <p style={{ fontSize: "1.3rem" }}>
        Thanks for choosing iNotebook — happy noting!
      </p>

      <footer style={{ marginTop: "3rem", fontSize: "1rem", fontStyle: "italic", color: "#6b38c9" }}>
        — The iNotebook Team
      </footer>
    </div>
  );
};

export default About;
