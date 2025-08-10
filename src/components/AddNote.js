import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    props.showAlert("Note added successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="container my-3"
      style={{
        maxWidth: "600px",
        backgroundColor: "#fffaf0",
        border: "3px dashed #8a4fff",
        borderRadius: "15px",
        padding: "20px 25px",
        boxShadow: "0 4px 15px rgba(138, 75, 255, 0.15)",
        fontFamily: "'Patrick Hand', cursive",
        transition: "box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow = "0 6px 20px rgba(138, 75, 255, 0.3)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.boxShadow = "0 4px 15px rgba(138, 75, 255, 0.15)")
      }
    >
      <h2
        style={{
          color: "#8a4fff",
          fontWeight: "bold",
          fontSize: "2rem",
          marginBottom: "1rem",
          userSelect: "none",
        }}
      >
        ✍️ Add a Note
      </h2>
      <form>
        <div className="mb-3">
          <label
            htmlFor="title"
            className="form-label"
            style={{ fontSize: "1.2rem" }}
          >
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="titleHelp"
            onChange={onChange}
            minLength={5}
            value={note.title}
            required
            style={{
              border: "2px dashed #8a4fff",
              borderRadius: "10px",
              fontFamily: "'Patrick Hand', cursive",
              fontSize: "1.1rem",
              padding: "10px",
              transition: "border-color 0.3s ease",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#6b38c9")}
            onBlur={(e) => (e.target.style.borderColor = "#8a4fff")}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="description"
            className="form-label"
            style={{ fontSize: "1.2rem" }}
          >
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
            minLength={5}
            value={note.description}
            required
            style={{
              border: "2px dashed #8a4fff",
              borderRadius: "10px",
              fontFamily: "'Patrick Hand', cursive",
              fontSize: "1.1rem",
              padding: "10px",
              transition: "border-color 0.3s ease",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#6b38c9")}
            onBlur={(e) => (e.target.style.borderColor = "#8a4fff")}
          />
        </div>

        <div className="mb-3">
          <label
            className="form-label"
            htmlFor="tag"
            style={{ fontSize: "1.2rem" }}
          >
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={onChange}
            style={{
              border: "2px dashed #8a4fff",
              borderRadius: "10px",
              fontFamily: "'Patrick Hand', cursive",
              fontSize: "1.1rem",
              padding: "10px",
              transition: "border-color 0.3s ease",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#6b38c9")}
            onBlur={(e) => (e.target.style.borderColor = "#8a4fff")}
          />
        </div>

        <button
          type="submit"
          disabled={note.title.length < 5 || note.description.length < 5}
          className="btn w-100"
          onClick={handleClick}
          style={{
            backgroundColor: "#8a4fff",
            color: "#fff",
            border: "2px dashed #444",
            borderRadius: "25px",
            fontWeight: "bold",
            padding: "12px",
            fontSize: "1.3rem",
            cursor: note.title.length >= 5 && note.description.length >= 5 ? "pointer" : "not-allowed",
            transition: "transform 0.2s ease, background-color 0.3s ease",
            userSelect: "none",
          }}
          onMouseOver={(e) => {
            if (!e.target.disabled) {
              e.target.style.transform = "scale(1.05)";
              e.target.style.backgroundColor = "#6b38c9";
            }
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.backgroundColor = "#8a4fff";
          }}
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
