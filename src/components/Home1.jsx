import React, { Component } from "react";
import { Link } from "react-router-dom";
import { BASEURL, callApi, setSession } from "./Api.js";
import { Routes, Route } from "react-router-dom";
import "./Home12.css";
import "./../css/Home1.css";
import { withTranslation } from "react-i18next"; // Import withTranslation HOC
import img1 from "./images1/1.png";

import HomePage from "./HomePage";
// import PayApp from "./PayApp";
import Captcha from "./Captcha"; // Import Captcha component
import LanguageSelector from "../LanguageSelector.jsx";

export class Home1 extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: !!sessionStorage.getItem("csrid"),
      fullname: sessionStorage.getItem("fullname") || "",
      captchaValid: false,
      loginAttempts: 0,
      blockUntil: null,
    };

    this.userRegistration = this.userRegistration.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.signin = this.signin.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    const fullname = sessionStorage.getItem("fullname");
    const loggedIn = !!sessionStorage.getItem("csrid");
    this.setState({ fullname, loggedIn });
  }

  showSignin() {
    let popup = document.getElementById("popup");
    let signin = document.getElementById("signin");
    let signup = document.getElementById("signup");
    let popupHeader = document.getElementById("popupHeader");
    popupHeader.innerHTML = "Login";
    signin.style.display = "block";
    signup.style.display = "none";
    popup.style.display = "block";
    username.value = "";
    password.value = "";
  }

  showSignup() {
    let popup = document.getElementById("popup");
    let signin = document.getElementById("signin");
    let signup = document.getElementById("signup");
    let popupHeader = document.getElementById("popupHeader");
    popupHeader.innerHTML = "Signup";
    signin.style.display = "none";
    signup.style.display = "block";
    popup.style.display = "block";

    let fullname = document.getElementById("fullname");
    let email = document.getElementById("email");
    let role = document.getElementById("role");
    let signuppassword = document.getElementById("signuppassword");
    let confirmpassword = document.getElementById("confirmpassword");

    fullname.value = "";
    email.value = "";
    role.value = "";
    signuppassword.value = "";
    confirmpassword.value = "";
  }

  closeSignin(event) {
    if (event.target.id === "popup") {
      let popup = document.getElementById("popup");
      popup.style.display = "none";
    }
  }

  userRegistration() {
    let fullname = document.getElementById("fullname");
    let email = document.getElementById("email");
    let role = document.getElementById("role");
    let signuppassword = document.getElementById("signuppassword");
    let confirmpassword = document.getElementById("confirmpassword");

    fullname.style.border = "";
    email.style.border = "";
    role.style.border = "";
    signuppassword.style.border = "";
    confirmpassword.style.border = "";

    if (fullname.value === "") {
      fullname.style.border = "1px solid red";
      fullname.focus();
      return;
    }
    if (email.value === "") {
      email.style.border = "1px solid red";
      email.focus();
      return;
    }
    if (role.value === "") {
      role.style.border = "1px solid red";
      role.focus();
      return;
    }
    if (signuppassword.value === "") {
      signuppassword.style.border = "1px solid red";
      signuppassword.focus();
      return;
    }
    if (confirmpassword.value === "") {
      confirmpassword.style.border = "1px solid red";
      confirmpassword.focus();
      return;
    }
    if (signuppassword.value !== confirmpassword.value) {
      signuppassword.style.border = "1px solid red";
      signuppassword.focus();
      return;
    }

    var data = JSON.stringify({
      fullname: fullname.value,
      email: email.value,
      role: role.value,
      password: signuppassword.value,
    });

    callApi(
      "POST",
      "http://localhost:8083/users/signup",
      data,
      this.getResponse
    );
  }

  getResponse(res) {
    let resp = res.split("::");
    alert(resp[1]);
    if (resp[0] === "200") {
      let signin = document.getElementById("signin");
      let signup = document.getElementById("signup");
      signin.style.display = "block";
      signup.style.display = "none";
    }
  }

  forgotPassword() {
    username.style.border = "";
    if (username.value === "") {
      username.style.border = "1px solid red";
      username.focus();
      return;
    }

    let url = "http://localhost:8083/users/forgotpassword/" + username.value;
    callApi("GET", url, "", this.forgotPasswordResponse);
  }

  forgotPasswordResponse(res) {
    let data = res.split("::");
    if (data[0] === "200")
      responseDiv.innerHTML = `<br/><br/><label style='color:green'>${data[1]}</label>`;
    else
      responseDiv.innerHTML = `<br/><br/><label style='color:red'>${data[1]}</label>`;
  }
  signin() {
    const now = new Date().getTime();
    const blockUntil = localStorage.getItem("blockUntil");

    if (blockUntil && now < parseInt(blockUntil)) {
      const remaining = Math.ceil((parseInt(blockUntil) - now) / 1000);
      responseDiv.innerHTML = `<br/><br/><label style="color:red">Too many failed attempts. Try again in ${remaining} seconds.</label>`;
      return;
    }

    username.style.border = "";
    password.style.border = "";
    responseDiv.innerHTML = "";

    if (username.value === "") {
      username.style.border = "1px solid red";
      username.focus();
      return;
    }
    if (password.value === "") {
      password.style.border = "1px solid red";
      password.focus();
      return;
    }
    if (!this.state.captchaValid) {
      responseDiv.innerHTML = `<br/><br/><label style="color:red">Please enter the correct CAPTCHA</label>`;
      return;
    }

    let data = JSON.stringify({
      email: username.value,
      password: password.value,
    });

    callApi(
      "POST",
      "http://localhost:8083/users/signin",
      data,
      this.signinResponse.bind(this)
    );
  }

  signinResponse(res) {
    let rdata = res.split("::");

    if (rdata[0] === "200") {
      setSession("csrid", rdata[1], 1);
      localStorage.removeItem("loginAttempts");
      localStorage.removeItem("blockUntil");
      window.location.replace("/propertymanagementsystem/dashboard");
    } else {
      let attempts = parseInt(localStorage.getItem("loginAttempts") || "0") + 1;
      localStorage.setItem("loginAttempts", attempts);

      if (attempts >= 3) {
        const blockTime = 60 * 1000; // 1 minute
        const blockUntil = new Date().getTime() + blockTime;
        localStorage.setItem("blockUntil", blockUntil);
        localStorage.setItem("loginAttempts", 0);
        responseDiv.innerHTML = `<br/><br/><label style="color:red">Too many failed attempts. Try again in 60 seconds.</label>`;
      } else {
        responseDiv.innerHTML = `<br/><br/><label style="color:red">${rdata[1]}</label>`;
      }
    }
  }

  logout() {
    sessionStorage.removeItem("csrid");
    sessionStorage.removeItem("fullname");
    this.setState({ loggedIn: false, fullname: "" });
    window.location.replace("/");
  }

  render() {
    const { t } = this.props;
    return (
      <div className="base">
        {/* <PayApp/> */}
        <div id="popup" onClick={this.closeSignin}>
          <div className="popupWindow">
            <div id="popupHeader">{t("Login")}</div>
            <div id="signin">
              <label className="usernameLabel">{t("Username")}:</label>
              <input type="text" id="username" />
              <label className="passwordLabel">{t("Password")}:</label>
              <input type="password" id="password" />
              <div className="forgotPassword">
                {" "}
                <label onClick={this.forgotPassword}>Forgot Password?</label>
              </div>
              <Captcha
                captchaValid={(valid) => this.setState({ captchaValid: valid })}
              />

              <button className="siginButton" onClick={this.signin}>
                Sign In
              </button>
              <div className="div1" id="responseDiv"></div>
              <div className="div2">
                {t("Don't have an account")}?
                <label onClick={this.showSignup}>{t("SIGNUP NOW")}</label>
              </div>
            </div>

            <div id="signup">
              <label>{t("Full Name")}:</label>
              <input type="text" id="fullname" />
              <label>{t("Email")}:</label>
              <input type="email" id="email" />
              <label>{t("Select Role")}:</label>
              <select id="role">
                <option value=""></option>
                <option value="1">{t("Admin")}</option>
                <option value="2">{t("Owner")}</option>
                <option value="3">{t("Tenant")}</option>
              </select>
              <label>{t("Password")}:</label>
              <input type="password" id="signuppassword" />
              <label>{t("Confirm Password")}:</label>
              <input type="password" id="confirmpassword" />
              <button onClick={this.userRegistration}>
                {t("Register Now")}
              </button>
              <div>
                {t("Already have an account")}?{" "}
                <span onClick={this.showSignin}>{t("SIGN IN")}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="header">
          <nav className="BlackBackground">
            <ul className="NavList">
              <li id="image-logo">
                <img src={img1} width="230vh" alt="logo" />
              </li>
              <li>
                <Link to="/">{t("Home")}</Link>
              </li>

              <li>
                <Link to="/propertymanagementsystem/dashboard">
                  {t("Dashboard")}
                </Link>
              </li>

              <li>
                <Link to="/contact">{t("Contact")}</Link>
              </li>
              <li>
                <Link to="/AboutUs">{t("About")}</Link>
              </li>
              <div>
                <LanguageSelector />
              </div>
              <li>
                <Link to="/chatbot">
                  <div
                    style={{
                      position: "fixed",
                      bottom: "30px",
                      right: "30px",
                      width: "60px",
                      height: "60px",
                      backgroundColor: "#007bff",
                      color: "white",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "30px",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                      cursor: "pointer",
                      zIndex: 1000,
                    }}
                    title="Open Chatbot"
                  >
                    💬
                  </div>
                </Link>
              </li>

              {this.state.loggedIn ? (
                <>
                  <li>
                    <div className="right">
                      <div className="signText">
                        <span>{this.state.fullname}</span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="right" onClick={this.logout}>
                      <div className="signText">
                        {/* <img
                          src="./images/logout.png"
                          alt="Logout"
                          width="20px"
                        /> */}
                        <i className="fas fa-sign-out-alt">{t("Logout")}</i>
                      </div>
                    </div>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <div className="right" onClick={this.showSignin}>
                      <div className="signText">
                        <span>{t("Sign-In")}</span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="right" onClick={this.showSignup}>
                      <div className="signText">
                        <span>{t("Sign-up")}</span>
                      </div>
                    </div>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>

        <div className="container">
          {/* <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes> */}
        </div>
      </div>
    );
  }
}

export default withTranslation()(Home1);
