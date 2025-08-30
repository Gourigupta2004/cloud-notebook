import { useState } from "react";
//Everything related to states for Notes, will be wrapped in this Context
import NoteContext from "./noteContext";

const NoteState = (props) => {
const host =
    (typeof window !== "undefined" &&
      (window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1"))
      ? "http://localhost:5000"
      : "";

  //States to change & update notes
  const noteInitial = [];
  const [notes, setNotes] = useState(noteInitial);

  //Get all notes 
  const getNotes = async () => {
    //API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"), // Get the token from localStorage
      },
    });

    //Recieved response
    const json = await response.json();
    setNotes(json);
  };

  //Add a New Note
  const addNote = async (title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token"), // Get the token from localStorage,
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json();
    setNotes(notes.concat(note));
  };

  //Delete a Note
  const deleteNote = async (id) => {
    //TODO API Call

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token"), // Get the token from localStorage,
      },
    });

    const json = await response.json();
    console.log(json);

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token"), // Get the token from localStorage,
      },
      body: JSON.stringify({title, description, tag}),
    });

    const json = await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));
    //Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
        break;
      }
    }
    setNotes(newNotes)
  };
  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

//Exporting Notestate
export default NoteState;
