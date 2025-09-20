import React, { Component } from "react";
import "../css/Dashboard.css";
import { BASEURL, callApi, getSession, setSession } from "./Api";
import MenuBar from "./../components/MenuBar";
import JobPosting from "./JobPosting";
import JobSearch from "./JobSearch";
import Profile from "./Profile";
import { withTranslation } from "react-i18next"; // Import withTranslation HOC

export default class newdashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { fullname: "", activeComponent: "" };
    this.showFullname = this.showFullname.bind(this);
    this.loadComponent = this.loadComponent.bind(this);
  }
  componentDidMount() {
    let csr = getSession("csrid");
    if (csr === "") this.logout();
    let data = JSON.stringify({ csrid: csr });
    callApi("POST", BASEURL + "users/getfullname", data, this.showFullname);
  }
  showFullname(response) {
    this.setState({ fullname: response });
  }
  logout() {
    setSession("csrid", "", -1);
    window.location.replace("/");
  }
  loadComponent(mid) {
    let components = {
      1: <JobPosting />,
      2: <JobSearch />,
      3: <Profile />,
    };
    this.setState({ activeComponent: components[mid] });
  }
  render() {
    const { t } = this.props;
    const { fullname, activeComponent } = this.state;
    return (
      <div className="dashboard">
        <div className="headerr">
          {/* <img className='logo' src='./images/logo1.png' alt='no'/> */}
          <img
            className="logout"
            onClick={() => this.logout()}
            src="./images/logout.png"
            alt="no"
          />
          <label>{fullname}</label>
        </div>
        <div className="menu">
          <MenuBar onMenuClick={this.loadComponent} />
        </div>
        <div className="outlet">{activeComponent}</div>
      </div>
    );
  }
}
