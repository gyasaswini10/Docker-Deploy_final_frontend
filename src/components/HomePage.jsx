import React, { useEffect } from "react";
import "../css/HomePage.css";
import Footer from "./Footer";
import { withTranslation } from "react-i18next";

import homePic from './../components/images1/home_page_pic.jpeg';

import homepageVideo from './images1/homepage.mp4';

function HomePage({ t }) {
  useEffect(() => {
    const animateNumbers = (element, target) => {
      let current = 0;
      const increment = target / 50;
      const animate = () => {
        const interval = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(interval);
            setTimeout(() => {
              current = 0;
              animate();
            }, 5000);
          }
          element.textContent = Math.floor(current);
        }, 30);
      };
      animate();
    };

    const numbers = document.querySelectorAll(".Achievement h3");
    numbers.forEach((number) => {
      const target = parseInt(number.getAttribute("data-target"), 10);
      animateNumbers(number, target);
    });
  }, []);

  return (
    <div>
      <div
        className="video-container"
        style={{
          position: "",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          zIndex: -1,
          marginTop: "-20px",
        }}
      >
 <video 
  src={homepageVideo}
  autoPlay
  loop
  muted
  style={{
    objectFit: "cover",
    width: "100%",
    height: "100%",
  }}
/>

      </div>

      <div className="HomePage1" style={{ display: "flex" }}>
        <div className="text">
          <h5 style={{ textAlign: "left", color: "Black", fontSize: "17px" }}>
            {t("intro")}
          </h5>
        </div>
        <img
         src={homePic}
          alt="Home Page GIF"
          style={{ width: "30%", height: "auto", marginBottom: "20px" }}
        />
      </div>

      <div className="Our_Achievements">
        <h2>{t("Our Achievements")}</h2>
        <div className="Achievements">
          <div className="Achievement">
            <h3 data-target="100">0</h3>
            <p>{t("Properties Managed")}</p>
          </div>
          <div className="Achievement">
            <h3 data-target="200">0</h3>
            <p>{t("Happy Residents")}</p>
          </div>
          <div className="Achievement">
            <h3 data-target="50">0</h3>
            <p>{t("Years of Experience")}</p>
          </div>
        </div>
      </div>

      <div className="WhyOurCompany">
        <h2>{t("Why Our Company?")}</h2>
        <div className="CompanyInfo">
          <div className="InfoItem">
            <h3>{t("Qualified Property Dealers")}</h3>
            <p>{t("Qualified Property Dealers desc")}</p>
          </div>
          <div className="InfoItem">
            <h3>{t("Buy Rent Lease")}</h3>
            <p>{t("Buy Rent Lease desc")}</p>
          </div>
          <div className="InfoItem">
            <h3>{t("Register Properties")}</h3>
            <p>{t("Register Properties desc")}</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default withTranslation()(HomePage);
