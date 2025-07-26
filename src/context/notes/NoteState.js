import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) =>{

    const noteInitial = [
  {
    "_id": "687dfd5abec0e71df2c61513",
    "user": "687c91fce6d8df6022b6ae14",
    "title": "My Title",
    "description": "Please wake up early",
    "tag": "personal",
    "date": "2025-07-21T08:42:02.166Z",
    "__v": 0
  },
  {
    "_id": "687dfd5abec0e71df2c61515",
    "user": "687c91fce6d8df6022b6ae14",
    "title": "My Title",
    "description": "Please wake up early",
    "tag": "personal",
    "date": "2025-07-21T08:42:02.327Z",
    "__v": 0
  },
  {
    "_id": "687dfd5abec0e71df2c61517",
    "user": "687c91fce6d8df6022b6ae14",
    "title": "My Title",
    "description": "Please wake up early",
    "tag": "personal",
    "date": "2025-07-21T08:42:02.465Z",
    "__v": 0
  },
  {
    "_id": "687dfd5abec0e71df2c61519",
    "user": "687c91fce6d8df6022b6ae14",
    "title": "My Title",
    "description": "Please wake up early",
    "tag": "personal",
    "date": "2025-07-21T08:42:02.691Z",
    "__v": 0
  }
]

const [notes, setNotes] = useState(noteInitial)
    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState; 