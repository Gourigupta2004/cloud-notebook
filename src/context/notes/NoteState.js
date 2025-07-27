import { useState } from "react";
import NoteContext from "..context/notes/noteContext";

const NoteState = (props) =>{
    const host = "http://localhost:5000";
    const noteInitial = []
    const [notes, setNotes] = useState(noteInitial)

//Get all notes
const getNotes = async()=>{
  //API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg3YzkxZmNlNmQ4ZGY2MDIyYjZhZTE0In0sImlhdCI6MTc1MzA1NzczMX0.BBrA1QbDOPXWwYK7ItD0Tipz_ASa6yQp_fJtAhDeRVY"
  }
}); 
    const json = await response.json();
    console.log(json);
    setNotes(json);
}

//Add a Note 
const addNote = async(title, description, tag)=>{
  //TODO: API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg3YzkxZmNlNmQ4ZGY2MDIyYjZhZTE0In0sImlhdCI6MTc1MzA1NzczMX0.BBrA1QbDOPXWwYK7ItD0Tipz_ASa6yQp_fJtAhDeRVY"
  },
  body: JSON.stringify({title, description, tag}),
});

const json = response.json();

  //Logic to add note
  console.log("adding a new note");
  let note = {
    "_id": "687dfd5abec2340e71fyfdf2c651519",
    "user": "687c91fce6d8df6022b6ae14",
    "title": title,
    "description": description,
    "tag": tag,
    "date": "2025-07-21T08:42:02.691Z",
    "__v": 0
  };
  
  setNotes(notes.concat(note))
}

//Delete a Note 
const deleteNote =(id)=>{
  //TODO API Call
  console.log("deleting the note with ID " + id);
  const newNotes = notes.filter((note) =>{return note._id!==id});
  setNotes(newNotes);
}

//Edit a Note 
const editNote = async (id, title, description, tag)=>{
  //API call
  const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg3YzkxZmNlNmQ4ZGY2MDIyYjZhZTE0In0sImlhdCI6MTc1MzA1NzczMX0.BBrA1QbDOPXWwYK7ItD0Tipz_ASa6yQp_fJtAhDeRVY"
  },
  body: JSON.stringify(title, description, tag),
});

const json = response.json();

  //Logic to edit in client
    for (let index = 0; index < notes.length; index++){
        const element = notes[index]; 
        if(element._id === id){
          element.title = title;
          element.description = description; 
          element.tag = tag;
        }
    }
}
    return (
        <NoteContext.Provider value={{notes, setNotes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState; 