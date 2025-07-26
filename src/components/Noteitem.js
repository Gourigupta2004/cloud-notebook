import React from "react";

function Noteitem(props) {
  //Destructuring props
  const { note } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">
           {note.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus totam adipisci explicabo, odit blanditiis hic, possimus nulla veritatis architecto quis pariatur! Quo, dolorum accusamus soluta tempora velit molestiae vitae fugiat a possimus, perspiciatis minus.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Noteitem;
