import React, { Component } from "react";
import "/src/css/JobPosting.css";
import { BASEURL, callApi } from "./Api";
import PayApp from "./PayApp";
import { withTranslation } from "react-i18next";

class JobSearch extends Component {
  constructor() {
    super();
    this.state = {
      jobList: [],
    };
    this.readResponse = this.readResponse.bind(this);
  }

  componentDidMount() {
    callApi("GET", BASEURL + "jobs/read", "", this.readResponse);
  }

  readResponse(response) {
    if (response.includes("404::")) {
      alert(response.split("::")[1]);
      return;
    }
    let data = JSON.parse(response);
    this.setState({ jobList: data });
  }

  render() {
    const { t } = this.props;
    const { jobList } = this.state;

    return (
      <div className="jpcontainer">
        <div className="header">
          <label>{t("All Properties")}</label>
        </div>

        <div className="content">
          {jobList.map((data) => (
            <div className="result" key={data.id}>
              <div className="card">
                <div className="div1">
                  <label>{data.nameOfOwner}</label>
                  <span>₹{data.cost}</span>
                  {data.contact}
                </div>
                <div className="div2">
                  {data.state} | {data.location} |{" "}
                  {data.propertyToBe === "1" ? t("Sell") : t("Rent")}
                </div>
                <div className="div3">{data.description}</div>
                <PayApp price={parseInt(data.cost)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withTranslation()(JobSearch);
