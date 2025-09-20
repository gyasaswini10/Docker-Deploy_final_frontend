// import React, { useState } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing the eye icons
// import Footer from "./Footer";
// import "../css/LoginForm.css";
// const LoginForm = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [passwordVisible, setPasswordVisible] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Logged in successfully!");
//   };

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   return (
//     <div>
//       <div className="custom-login-container">
//         <h2 id="one">Login</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="input-field">
//             <label htmlFor="email" id="email">
//               <h3 id="one"> Email</h3>
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
//           <div className="input-field password-field">
//             <label htmlFor="password" id="password">
//               <h3 id="one">Password</h3>
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
//           <button type="submit" className="login-button">
//             Login
//           </button>
//         </form>
//         <p className="signup-link">
//           Don't have an account? <a href="/register">Sign up</a>
//         </p>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default LoginForm;
