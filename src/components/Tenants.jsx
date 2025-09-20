import React, { useEffect, useState } from "react";
import axios from "axios";
import "./../css/Rentals.css"; // Import the CSS file
import Footer from "./Footer";

const Rentals = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8083/api/properties")
      .then((response) => {
        setProperties(response.data);
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
      });
  }, []);

  return (
    <div>
      <div className="rentals-container">
        <h2>Available Rentals</h2>
        <div className="property-grid">
          {properties.length === 0 ? (
            <p>Properties are yet to be listed PLease Visit again</p>
          ) : (
            properties.map((property) => (
              <div className="property-card" key={property.id}>
                <img
                  src={property.image}
                  alt={property.title}
                  className="property-image"
                />
                <div className="property-info">
                  <h3>{property.title}</h3>
                  <p>Type: {property.type}</p>
                  <p>Location: {property.location}</p>
                  <p>Price: ${property.price}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div
        style={{
          position: "fixed",
          bottom: "0",
          color: "white",
          width: "100%",
          padding: "10px",
        }}
      >
        <Footer />
      </div>
    </div>
  );
};

export default Rentals;
