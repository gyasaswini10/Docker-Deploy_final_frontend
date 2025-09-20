import React, { Component } from "react";
import { withTranslation } from "react-i18next";
class Captcha extends Component {
  constructor(props) {
    super(props);
    this.state = {
      captcha: this.generateCaptcha(),
      userInput: "",
      isCaptchaValid: null,
    };
  }
  generateCaptcha() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
  }

  handleInputChange = (event) => {
    this.setState({ userInput: event.target.value, isCaptchaValid: null });
  };

  validateCaptcha = () => {
    const isValid =
      this.state.userInput.trim().toLowerCase() ===
      this.state.captcha.toLowerCase();
    this.setState({ isCaptchaValid: isValid });

    // Notify parent
    if (this.props.captchaValid) {
      this.props.captchaValid(isValid);
    }

    // Optional: regenerate new CAPTCHA after success
    // if (isValid) {
    //   this.setState({
    //     captcha: this.generateCaptcha(),
    //     userInput: "",
    //     isCaptchaValid: null,
    //   });
    // }

    return isValid;
  };

  render() {
    const { t } = this.props;
    return (
      <div>
        <div>
          <label>
            Captcha: <strong>{this.state.captcha}</strong>
          </label>
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter CAPTCHA"
            value={this.state.userInput}
            onChange={this.handleInputChange}
          />
          <button onClick={this.validateCaptcha}>Validate</button>
        </div>
        {this.state.isCaptchaValid === false && (
          <div style={{ color: "red" }}>❌{t("Incorrect CAPTCHA")}</div>
        )}
        {this.state.isCaptchaValid === true && (
          <div style={{ color: "green" }}>
            ✅ {t("CAPTCHA validated successfully")}
          </div>
        )}
      </div>
    );
  }
}

export default withTranslation()(Captcha);
