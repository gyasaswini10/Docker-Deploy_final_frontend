import React, { Component } from "react";
import "/src/css/MenuBar.css";
import { BASEURL, callApi, getSession } from "./Api";
import { withTranslation } from "react-i18next";

class MenuBar extends Component {
  constructor() {
    super();
    this.state = { menuItems: [] };
    this.loadMenus = this.loadMenus.bind(this);
  }

  componentDidMount() {
    let csr = getSession("csrid");
    let data = JSON.stringify({ csrid: csr });
    callApi("POST", BASEURL + "menus/getmenusbyrole", data, this.loadMenus);
  }

  loadMenus(response) {
    let data = JSON.parse(response);
    this.setState({ menuItems: data });
  }

  render() {
    const { t } = this.props;
    const { menuItems } = this.state;
    return (
      <div className="menubar">
        <div className="menuheader">
          {t("MENU")} <img src="/images/menu.png" alt="" />
        </div>
        <div className="menulist">
          <ul>
            {menuItems.map((row) => (
              <li key={row.mid} onClick={() => this.props.onMenuClick(row.mid)}>
                {t(row.menu)} <img src={row.icon} alt="" />
              </li>
            ))}
          </ul>
          {/* <a href="/JobPost">
            <img src="/images/deaf.jpg" alt="Deaf" style={{ height: "50px" }} />
          </a>
          <img src="/images/blind.jpg" alt="Blind" style={{ height: "50px" }} /> */}
        </div>
      </div>
    );
  }
}

export default withTranslation()(MenuBar);
