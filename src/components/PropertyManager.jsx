import React, { useState } from "react";
import axios from "axios";
import "./../css/PropertyManager.css";
import Footer from "./Footer";

const PropertyManager = () => {
  const [property, setProperty] = useState({
    title: "",
    price: "",
    type: "",
    image: "",
    location: "",
  });

  const handleChange = (e) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setProperty({ ...property, image: URL.createObjectURL(file) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8083/api/properties", property);
      alert("Property added successfully!");
    } catch (error) {
      console.error("Error adding property:", error);
    }
  };

  return (
    <div>
      <div className="property-container">
        <h2>Add Property</h2>
        <form onSubmit={handleSubmit} className="property-form">
          <input
            type="text"
            name="title"
            placeholder="Title"
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            required
          />
          <select name="type" onChange={handleChange} required>
            <option value="">Select Type</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Villa">Villa</option>
          </select>
          <input
            type="text"
            name="location"
            placeholder="Location"
            onChange={handleChange}
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            required
          />
          <button type="submit" className="submit-btn">
            Add Property
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default PropertyManager;
