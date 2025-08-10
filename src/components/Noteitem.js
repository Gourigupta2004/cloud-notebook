import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

function Noteitem(props) {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  return (
    <div className="col-md-3">
      <div
        className="card my-3"
        style={{
          backgroundColor: "#fffaf0",
          border: "3px dashed #8a4fff",
          borderRadius: "15px",
          boxShadow: "0 4px 10px rgba(138, 75, 255, 0.15)",
          fontFamily: "'Patrick Hand', cursive",
          transition: "transform 0.2s ease",
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.03)")}
        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
      >
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between">
            <h5
              className="card-title"
              style={{ color: "#8a4fff", fontWeight: "bold", fontSize: "1.4rem", marginBottom: "0" }}
            >
              {note.title}
            </h5>

            <div>
              <i
                className="fa-solid fa-trash mx-2"
                onClick={() => {
                  deleteNote(note._id);
                  props.showAlert("Note deleted successfully", "success");
                }}
                style={{
                  color: "#d9534f",
                  cursor: "pointer",
                  fontSize: "1.3rem",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "#a12d2d")}
                onMouseLeave={e => (e.currentTarget.style.color = "#d9534f")}
                title="Delete Note"
              ></i>

              <i
                className="fa-solid fa-pen-to-square mx-2"
                onClick={() => updateNote(note)}
                style={{
                  color: "#8a4fff",
                  cursor: "pointer",
                  fontSize: "1.3rem",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "#6b38c9")}
                onMouseLeave={e => (e.currentTarget.style.color = "#8a4fff")}
                title="Edit Note"
              ></i>
            </div>
          </div>

          <p
            className="card-text mt-2"
            style={{ color: "#444", fontSize: "1.1rem", lineHeight: "1.4" }}
          >
            {note.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Noteitem;
