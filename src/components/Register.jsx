// import "../css/Register.css";
// import React, { useState, useEffect } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import Footer from "./Footer";
// import countriesAndCitiesData from "../json/countriesAndCities.json";
// const Register = () => {
//   const [fullname, setFullname] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [selectedCountry, setSelectedCountry] = useState("");
//   const [selectedCity, setSelectedCity] = useState(""); // City selection state
//   const [address, setAddress] = useState(""); // New state for Address
//   const [state, setState] = useState(""); // New state for State
//   const [termsAccepted, setTermsAccepted] = useState(false); // New state for Terms checkbox
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState(""); // New state for Confirm Password
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // State for confirm password visibility

//   const [countries, setCountries] = useState([]);
//   const [cities, setCities] = useState([]);

//   useEffect(() => {
//     setCountries(countriesAndCitiesData.countries);
//   }, []);

//   const handleCountryChange = (e) => {
//     const selectedCountry = e.target.value;
//     setSelectedCountry(selectedCountry);

//     const country = countries.find(
//       (country) => country.name === selectedCountry
//     );
//     if (country) {
//       setCities(country.cities);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }
//     alert("Registered successfully!");
//   };

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   const toggleConfirmPasswordVisibility = () => {
//     setConfirmPasswordVisible(!confirmPasswordVisible);
//   };

//   return (
//     <div>
//       <div className="login-form">
//         <h2>Register</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="input-field">
//             <label htmlFor="fullname">
//               <h3>Full Name</h3>
//             </label>
//             <input
//               id="fullname"
//               type="text"
//               placeholder="Enter your Full Name"
//               value={fullname}
//               onChange={(e) => setFullname(e.target.value)}
//               required
//             />
//           </div>
//           <div className="input-field">
//             <label htmlFor="email">
//               <h3>Email</h3>
//             </label>
//             <input
//               id="email"
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="input-field">
//             <label htmlFor="phone">
//               <h3>Phone</h3>
//             </label>
//             <input
//               id="phone"
//               type="tel"
//               placeholder="Enter your Phone"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               required
//             />
//           </div>
//           <div className="input-field">
//             <label htmlFor="country">
//               <h3>Country</h3>
//             </label>
//             <select
//               id="country"
//               value={selectedCountry}
//               onChange={handleCountryChange}
//               required
//             >
//               <option value="">Select your country</option>
//               {countries.map((country, index) => (
//                 <option key={index} value={country.name}>
//                   {country.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="input-field">
//             <label htmlFor="city">
//               <h3>City</h3>
//             </label>
//             <select
//               id="city"
//               value={selectedCity}
//               onChange={(e) => setSelectedCity(e.target.value)}
//               required
//               disabled={!selectedCountry}
//             >
//               <option value="">Select your city</option>
//               {cities.map((city, index) => (
//                 <option key={index} value={city}>
//                   {city}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="input-field">
//             <label htmlFor="address">
//               <h3>Address</h3>
//             </label>
//             <input
//               id="address"
//               type="text"
//               placeholder="Enter your Address"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               required
//             />
//           </div>
//           <div className="input-field">
//             <label htmlFor="state">
//               <h3>State</h3>
//             </label>
//             <input
//               id="state"
//               type="text"
//               placeholder="Enter your State"
//               value={state}
//               onChange={(e) => setState(e.target.value)}
//               required
//             />
//           </div>
//           <div className="input-field password-field">
//             <label htmlFor="password"  >
//               <h3>Password</h3>
//             </label>
//             <span className="eye-icon" onClick={togglePasswordVisibility}>
//               {passwordVisible ? <FaEyeSlash /> : <FaEye />}
//             </span>
//             <input
//               id="password"
//               type={passwordVisible ? "text" : "password"}
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <div className="input-field password-field">
//             <label htmlFor="confirmPassword">
//               <h3>Confirm Password</h3>
//             </label>
//             <span
//               className="eye-icon"
//               onClick={toggleConfirmPasswordVisibility}
//             >
//               {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
//             </span>
//             <input
//               id="confirmPassword"
//               type={confirmPasswordVisible ? "text" : "password"}
//               placeholder="Confirm your password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//             />
//           </div>
//           <input
//             type="checkbox"
//             id="terms"
//             checked={termsAccepted}
//             onChange={() => setTermsAccepted(!termsAccepted)}
//             required
//           />
//           I agree to the Terms and Conditions
//           <button
//             type="submit"
//             className="login-button"
//             disabled={!termsAccepted}
//           >
//             Register
//           </button>
//         </form>

//         <p className="signup-link">
//           Already have an account? <a href="/login">Login Here</a>
//         </p>
//       </div>
//   <Footer />


//     </div>
//   );
// };

// export default Register;