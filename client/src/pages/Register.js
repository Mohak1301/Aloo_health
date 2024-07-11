import React, { useState } from "react";
import "./Register.css";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/server/api/auth/register", {
        name,
        email,
        password,
      });
      if (res || res.data || res.data.success) {
        alert("user Registerd Successfully")
      } else {
        alert("error in registration")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="left"></div>
        <div className="right">
          <h1>Sign Up</h1>
          <form className="Login-main-form form-group">
            <div className="register-inputbox">
              {/* <label htmlFor="username">Username: </label> */}
              <input
                type="text"
                placeholder="Full Name"
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="register-inputbox">
              {/* <label htmlFor="Email">Email</label> */}
              <input
                type="text"
                placeholder="Email"
                id="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="register-inputbox">
              {/* <label htmlFor="password">Password</label> */}
              <input
                type="password"
                placeholder="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="register-button">
              <button type="submit" onClick={handlesubmit}>
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
