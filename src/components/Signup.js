import React from "react";
import {useNavigate } from "react-router-dom";
import { useState } from "react";


const Signup = (props) => {

const [credentials, setCredentials] = useState({name:"", email:"", password:"", cpassword:""});

let navigate = useNavigate();

  const handleSubmit = async(e) =>{
    e.preventDefault();
    const {name, email, password} = credentials;
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name, email, password}),
  });

    const json = await response.json();
    console.log(json);

    if(json.success){
      //Save the auth token and redirect
      localStorage.setItem('token', json.authToken);
      navigate("/");
      props.showAlert('Account created successfully', 'success');

    } else {
      props.showAlert('Invalid credentials', 'danger');
    }
}

const onChange = (e) => {
  setCredentials({...credentials, [e.target.name]:e.target.value});
}


  return (
    <div>
      <form className="container" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            onChange={onChange}
            name="name"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={onChange}
            name="email"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={onChange}
            required
            minLength={5}
            name="password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            onChange={onChange}
            required
            minLength={5}
            name="cpassword"
          />
        </div>
        
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
