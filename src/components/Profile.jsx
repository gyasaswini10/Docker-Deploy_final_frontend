import React from "react";

function Profile({ fullname }) {
  return (
    <div>
      <h1>Profile Component</h1>
      <p>Name: {fullname}</p>
      {/* Add more fields if you pass them as props */}
    </div>
  );
}

export default Profile;
