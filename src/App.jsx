// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import "./App.css";
// import Home1 from "./components/Home1";
// import Tenants from "./components/Tenants";
// import HomePage from "./components/HomePage";
// // import LoginForm from "./components/LoginForm";
// import Contact from "./components/Contact";
// import AboutUs from "./../src/components/AboutUs";
// // import Register from "./components/Register";
// import Rentals from "./components/Tenants";
// import PropertyManager from "./components/PropertyManager";
// import Dashboard from "./components/Dashboard";
// import ChatbotPage from "./components/ChatbotPage";
// import { useNavigate } from "react-router-dom";
// function Home1WithNavigate(props) {
//   const navigate = useNavigate();
//   return <Home1 {...props} navigate={navigate} />;
// }

// function App() {
//   return (
//     <Router>
//       {" "}
//       <Home1WithNavigate />{" "}
//       <Routes>
//         <Route path="/Rentals" element={<Rentals />} />
//         <Route path="/PropertyManager" element={<PropertyManager />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         {/* <Route
//               <li><Link to="/dashboard">Dashboard</Link></li>

//           path="/contact"
//           element={<h1 style={{ color: "white" }}>Contact Page</h1>}
//         /> */}

//         <Route path="/chatbot" element={<ChatbotPage />} />
//         <Route path="AboutUs" element={<AboutUs />} />
//         {/* <Route path="/login" element={<LoginForm />} />
//         <Route path="/register" element={<Register />} /> */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React from "react";
import "./i18n.jsx"; // Import before rendering components

import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import "./App.css";
import Home1 from "./components/Home1";
import Tenants from "./components/Tenants";
import HomePage from "./components/HomePage";
import Contact from "./components/Contact";
import AboutUs from "./components/AboutUs";
import Rentals from "./components/Tenants";
import PropertyManager from "./components/PropertyManager";
import Dashboard from "./components/Dashboard";
import ChatbotPage from "./components/ChatbotPage";
import { useNavigate } from "react-router-dom";
import "./i18n"; // <-- import i18n config
import { useTranslation } from "react-i18next";
import JobPosting from "./components/JobPosting"; // Import JobPosting component
import LanguageSelector from "./LanguageSelector"; // Import LanguageSelector
// Home1WithNavigate to pass useNavigate hook
function Home1WithNavigate(props) {
  const navigate = useNavigate();
  return <Home1 {...props} navigate={navigate} />;
}

// App Component
function App() {
  const { t } = useTranslation(); // Initialize translation
  const { i18n } = useTranslation();

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <BrowserRouter>
      <div>
        {/* Main UI */}
        <Home1WithNavigate />
        <Routes>
          <Route path="/Rentals" element={<Rentals />} />
          <Route path="/PropertyManager" element={<PropertyManager />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
