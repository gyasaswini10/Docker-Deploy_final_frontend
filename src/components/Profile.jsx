import React, { useState, useEffect } from "react";
import axios from "axios";

function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const token = localStorage.getItem("auth_token");
  console.log(token);

  // Fetch user data when component mounts
  useEffect(() => {
    if (token) {
      // Get the full name of the user
      axios
        .post("http://localhost:8083/users/getfullname", { csrid: token })
        .then((response) => {
          setUserData(response.data);
        })
        .catch((err) => {
          setError("Failed to fetch user data");
          console.error(err);
        });
    } else {
      setError("No token found. Please sign in.");
    }
  }, [token]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>Full Name: {userData.fullname}</p>
      <p>Email: {userData.email}</p>
    </div>
  );
}

export default UserProfile;
