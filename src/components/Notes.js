import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

function Notes(props) {
  const context = useContext(noteContext);
  let navigate = useNavigate();

  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "default",
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Note updated successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote showAlert={props.showAlert} />

      {/* Hidden button to trigger modal */}
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        ref={ref}
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      {/* Modal for editing notes */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div
            className="modal-content"
            style={{
              fontFamily: "'Patrick Hand', cursive",
              border: "3px dashed #8a4fff",
              borderRadius: "15px",
              backgroundColor: "#fffaf0",
              boxShadow: "0 4px 15px rgba(138, 75, 255, 0.2)",
            }}
          >
            <div
              className="modal-header"
              style={{ borderBottom: "2px dashed #8a4fff" }}
            >
              <h5
                className="modal-title"
                id="exampleModalLabel"
                style={{ color: "#8a4fff", fontWeight: "bold", fontSize: "1.7rem" }}
              >
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label
                    htmlFor="etitle"
                    className="form-label"
                    style={{ fontSize: "1.3rem", color: "#8a4fff" }}
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    onChange={onChange}
                    minLength={5}
                    required
                    value={note.etitle}
                    style={{
                      border: "2px dashed #8a4fff",
                      borderRadius: "10px",
                      fontFamily: "'Patrick Hand', cursive",
                      padding: "8px",
                      fontSize: "1.1rem",
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="edescription"
                    className="form-label"
                    style={{ fontSize: "1.3rem", color: "#8a4fff" }}
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onChange}
                    minLength={5}
                    required
                    value={note.edescription}
                    style={{
                      border: "2px dashed #8a4fff",
                      borderRadius: "10px",
                      fontFamily: "'Patrick Hand', cursive",
                      padding: "8px",
                      fontSize: "1.1rem",
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label
                    className="form-label"
                    htmlFor="etag"
                    style={{ fontSize: "1.3rem", color: "#8a4fff" }}
                  >
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={onChange}
                    value={note.etag}
                    style={{
                      border: "2px dashed #8a4fff",
                      borderRadius: "10px",
                      fontFamily: "'Patrick Hand', cursive",
                      padding: "8px",
                      fontSize: "1.1rem",
                    }}
                  />
                </div>
              </form>
            </div>

            <div className="modal-footer" style={{ borderTop: "2px dashed #8a4fff" }}>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
                style={{
                  borderRadius: "20px",
                  fontFamily: "'Patrick Hand', cursive",
                  fontWeight: "bold",
                  padding: "8px 20px",
                  border: "2px dashed #8a4fff",
                  backgroundColor: "#fffaf0",
                  color: "#8a4fff",
                  transition: "transform 0.2s ease",
                }}
                onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
                onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
              >
                Close
              </button>
              <button
                type="button"
                disabled={note.etitle.length < 5 || note.edescription.length < 5}
                onClick={handleClick}
                className="btn"
                style={{
                  borderRadius: "20px",
                  fontFamily: "'Patrick Hand', cursive",
                  fontWeight: "bold",
                  padding: "8px 20px",
                  border: "2px dashed #8a4fff",
                  backgroundColor: "#8a4fff",
                  color: "#fff",
                  transition: "transform 0.2s ease",
                }}
                onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
                onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notes Section */}
      <div
        className="row my-3"
        style={{
          fontFamily: "'Patrick Hand', cursive",
          color: "#8a4fff",
        }}
      >
        <h2 className="mt-3" style={{ fontSize: "1.8rem", fontWeight: "bold" }}>Your Notes</h2>
        <div className="container" style={{ minHeight: "25px" }}>
          {notes.length === 0 && (
            <p style={{ fontStyle: "italic", color: "#444" }}>
              No notes to display!
            </p>
          )}
        </div>
        <div className="d-flex flex-wrap gap-3">
          {notes.map((note) => {
            return (
              <Noteitem
                key={note._id}
                showAlert={props.showAlert}
                updateNote={updateNote}
                note={note}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Notes;
