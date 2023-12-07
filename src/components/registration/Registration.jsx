import React, { useState } from "react";
import { useEffect } from "react";
import "./Registration.css"; // Import the CSS file

import { useNavigate } from "react-router-dom";

const Registration = () => {
    const navigate = useNavigate();
  const [userRegistration, setuserRegistration] = useState({
    fullname: "",
    username: "",
    email: "",
    phonenumber: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const [records, setRecords] = useState([]);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);

    setuserRegistration({ ...userRegistration, [name]: value });
  };
 
const login = () => {
    useNavigate = ""
}
  const handleSubmit =async (e) => {
    e.preventDefault();
console.log(userRegistration);
    try {
        const response = await fetch('http://localhost:5000/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userRegistration),
        });
        console.log(response)
        if (response.ok && response.status===201) {
          navigate("/login"); 
          // Handle successful insertion (e.g., show a success message)

          console.log('Data inserted successfully!');
        } else {
          // Handle insertion failure
          console.error('Failed to insert data.');
        }
      } catch (error) {
        console.error('Error:', error);
      }

    console.log(records);
    const newRecord = {
      ...userRegistration,
      id: new Date().getTime().toString(),
    };
    // setRecords([...records, newRecord]);
    // console.log(records);
    // console.log("I was called");

    setuserRegistration({
      username: "",
      fullname: "",
      email: "",
      phonenumber: "",
      password: "",
      confirmPassword: "",
      gender: "",

    });
   
  };


   // To retrieve data from the database and display on the page (GET call)
  //  useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('http://localhost:5000/api/users');
  //       if (response.ok) {
  //         const data = await response.json();
  //         // Handle retrieved data (e.g., set it in state to display on the page)
  //         setRecords(data);
  //         console.log(data);
  //       } else {
  //         // Handle failure to fetch data
  //         console.error('Failed to fetch data.');
  //       }
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   };
  
  //   fetchData();
  // }, []);
  

  return (
    <form action="" onSubmit={handleSubmit} className="form-body">
      <div className="inputGroup1">
        <h1>Registration</h1>
      </div>
      <div className="inputGroup1">
        <label htmlFor="fullname"></label>
      </div>

      <div className="inputGroup1">
        <label htmlFor="fullname">Full Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={userRegistration.fullname}
          onChange={handleInput}
          name="fullname"
          id="fullname"
        />
      </div>
      <div className="inputGroup1">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Enter your username"
          value={userRegistration.username}
          onChange={handleInput}
          name="username"
          id="username"
        />
      </div>
      <div className="inputGroup2">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={userRegistration.email}
          onChange={handleInput}
          name="email"
          id="email"
        />
      </div>
      <div className="inputGroup2">
        <label htmlFor="phonenumber">Phone Number</label>
        <input
          type="number"
          placeholder="Enter your number"
          value={userRegistration.phonenumber}
          onChange={handleInput}
          name="phonenumber"
          id="phonenumber"
        />
      </div>
      <div className="inputGroup3">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={userRegistration.password}
          onChange={handleInput}
          name="password"
          id="password"
        />
      </div>
      <div className="inputGroup3">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          placeholder="Enter your confirm password"
          value={userRegistration.confirmPassword}
          onChange={handleInput}
          name="confirmPassword"
          id="confirmPassword"
        />
      </div>
      <div className="inputGroup4">
        <label>Gender</label>
        <div className="genderOptions">
          <label htmlFor="male">
            <input
              type="radio"
              id="male"
              name="gender"
              value="Male" // Represents the gender option
              onChange={handleInput}
              checked={userRegistration.gender === "Male"}
            />
            Male
          </label>
          <label htmlFor="female">
            <input
              type="radio"
              id="female"
              name="gender"
              value="Female" // Represents the gender option
              onChange={handleInput}
              checked={userRegistration.gender === "Female"}
            />
            Female
          </label>
          <label htmlFor="other">
            <input
              type="radio"
              id="other"
              name="gender"
              value="Prefer not to say" // Represents the gender option
              onChange={handleInput}
              checked={userRegistration.gender === "Prefer not to say"}
            />
            Prefer not to say
          </label>
        </div>
      </div>
      <button
        type="submit"
      >Register
      </button>
    </form>
  );
};

export default Registration;

// Inside handleSubmit function in Registration.js

  
 