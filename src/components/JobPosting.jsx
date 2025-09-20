import React, { Component } from "react";
import "/src/css/JobPosting.css";
import { BASEURL, callApi } from "./Api";
import Select from "react-select";
import Flag from "react-world-flags";

const countryCodes = [
  { label: "United States (+1)", value: "+1", countryCode: "US" },
  { label: "India (+91)", value: "+91", countryCode: "IN" },
  { label: "United Kingdom (+44)", value: "+44", countryCode: "GB" },
  { label: "Australia (+61)", value: "+61", countryCode: "AU" },
  { label: "Canada (+1)", value: "+1", countryCode: "CA" },
  { label: "Germany (+49)", value: "+49", countryCode: "DE" },
  { label: "France (+33)", value: "+33", countryCode: "FR" },
  { label: "Brazil (+55)", value: "+55", countryCode: "BR" },
  { label: "China (+86)", value: "+86", countryCode: "CN" },
  { label: "Japan (+81)", value: "+81", countryCode: "JP" },
  { label: "Mexico (+52)", value: "+52", countryCode: "MX" },
  { label: "South Africa (+27)", value: "+27", countryCode: "ZA" },
  { label: "Russia (+7)", value: "+7", countryCode: "RU" },
  { label: "Italy (+39)", value: "+39", countryCode: "IT" },
  { label: "Spain (+34)", value: "+34", countryCode: "ES" },
  { label: "Netherlands (+31)", value: "+31", countryCode: "NL" },
  { label: "Sweden (+46)", value: "+46", countryCode: "SE" },
  { label: "Norway (+47)", value: "+47", countryCode: "NO" },
  { label: "New Zealand (+64)", value: "+64", countryCode: "NZ" },
  { label: "Singapore (+65)", value: "+65", countryCode: "SG" },
];

export default class PropertyPosting extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      nameOfOwner: "",
      contact: "",
      countryCode: "+1",
      state: "",
      location: "",
      propertyToBe: "",
      cost: "",
      description: "",
      showPopup: false,
      document: null, // Store the selected image here
    };
    this.state = { jobList: [] };
    this.readResponse = this.readResponse.bind(this);
    this.updateResponse = this.updateResponse.bind(this);
    this.saveResponse = this.saveResponse.bind(this);
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

  updateData(id) {
    callApi("GET", BASEURL + "jobs/getdata/" + id, "", this.updateResponse);
  }

  updateResponse(response) {
    if (response.includes("404::")) {
      alert(response.split("::")[1]);
      return;
    }
    let data = JSON.parse(response);
    this.setState({
      id: data.id,
      nameOfOwner: data.nameOfOwner,
      contact: data.contact,
      countryCode: data.contact.split(" ")[0], // Assuming space-separated (countryCode + phone)
      state: data.state,
      location: data.location,
      propertyToBe: data.propertyToBe,
      cost: data.cost,
      description: data.description,
    });
    this.showPopup();
  }

  deleteData(id) {
    let resp = confirm("Click OK to confirm the deletion");
    if (resp === false) return;

    callApi("DELETE", BASEURL + "jobs/delete/" + id, "", (response) => {
      this.saveResponse(response);
      callApi("GET", BASEURL + "jobs/read", "", this.readResponse); // <-- Refetch after delete
    });
  }

  loadInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  saveJob() {
    const {
      id,
      nameOfOwner,
      contact,
      countryCode,
      state,
      location,
      propertyToBe,
      cost,
      description,
      document,
    } = this.state;

    const formattedContact = `${countryCode} ${contact}`;

    if (!id) {
      // CREATE logic
      const formData = new FormData();
      formData.append("nameOfOwner", nameOfOwner);
      formData.append("contact", formattedContact);
      formData.append("state", state);
      formData.append("location", location);
      formData.append("propertyToBe", propertyToBe);
      formData.append("cost", cost);
      formData.append("description", description);

      // if (document) formData.append("image", document); // If needed

      fetch(BASEURL + "jobs/upload", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.text())
        .then((response) => {
          const data = response.split("::");
          alert(data[1]);
          this.setState({ id: "" });
          this.closepopup();
          callApi("GET", BASEURL + "jobs/read", "", this.readResponse);
        });
    } else {
      // UPDATE logic
      const propertyData = {
        id: id,
        nameOfOwner,
        contact: formattedContact,
        state,
        location,
        propertyToBe,
        cost,
        description,
      };

      fetch(BASEURL + "jobs/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(propertyData),
      })
        .then((res) => res.text())
        .then((response) => {
          const data = response.split("::");
          alert(data[1]);
          this.setState({ id: "" });
          this.closepopup();
          callApi("GET", BASEURL + "jobs/read", "", this.readResponse);
        });
    }
  }
  saveResponse(response) {
    let data = response.split("::");
    alert(data[1]);
  }

  showPopup() {
    document.getElementById("jppopup").style.display = "block";
  }

  closepopup() {
    document.getElementById("jppopup").style.display = "none";
  }
  render() {
    const {
      id,
      nameOfOwner,
      contact,
      countryCode,
      state,
      location,
      propertyToBe,
      cost,
      description,
    } = this.state;
    const { jobList } = this.state;

    return (
      <div className="jpcontainer">
        <div id="jppopup" className="popup">
          <div className="popupwindow">
            <div className="popupheader">
              <label>Add Property</label>
              <span onClick={() => this.closepopup()}>&times;</span>
            </div>
            <div className="popupcontent">
              <label>Name of the Owner</label>
              <input
                type="text"
                name="nameOfOwner"
                value={nameOfOwner}
                onChange={(event) => this.loadInputChange(event)}
              />
              <label>Contact </label>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Select
                  options={countryCodes}
                  value={countryCodes.find(
                    (item) => item.value === countryCode
                  )}
                  onChange={(selectedOption) =>
                    this.setState({ countryCode: selectedOption.value })
                  }
                  getOptionLabel={(e) => (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Flag
                        code={e.countryCode}
                        style={{
                          width: "10px",
                          height: "15px",
                          marginRight: "8px",
                        }}
                      />
                      {e.label}
                    </div>
                  )}
                />
                <input
                  type="text"
                  name="contact"
                  value={contact}
                  onChange={(event) => this.loadInputChange(event)}
                  placeholder="Enter Phone Number"
                />
              </div>
              <label>State</label>
              <input
                type="text"
                name="state"
                value={state}
                onChange={(event) => this.loadInputChange(event)}
              />
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={location}
                onChange={(event) => this.loadInputChange(event)}
              />
              <label>Property Type (Rent or Sell)</label>
              <select
                name="propertyToBe"
                value={propertyToBe}
                onChange={(event) => this.loadInputChange(event)}
              >
                <option value="0">Select Type</option>
                <option value="1">Sell</option>
                <option value="2">Rent</option>
              </select>
              <label>Cost</label>
              <input
                type="text"
                name="cost"
                value={cost}
                onChange={(event) => this.loadInputChange(event)}
              />
              <label>Description</label>
              <textarea
                name="description"
                value={description}
                onChange={(event) => this.loadInputChange(event)}
              />
              {/* <label>Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => this.setState({ document: e.target.files[0] })}
              /> */}
              <button onClick={() => this.saveJob()}>Save</button>
            </div>
          </div>
          <div className="popupfooter"></div>
        </div>

        {/* Header */}
        <div className="header">
          <label>All Properties</label>
        </div>

        {/* Job Listing */}
        <div className="content">
          {jobList.map((data) => (
            <div className="result" key={data.id}>
              <div className="card">
                {/* Image (ensure the backend provides the image URL correctly) */}
                {/* {data.imageUrl ? (
                  <img
                    src={data.imageUrl}
                    alt="Property"
                    className="property-image"
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div className="no-image">No Image Available</div>
                )} */}
                <div className="div1">
                  <label>{data.nameOfOwner}</label>
                  <span>{data.cost}</span>
                  <img
                    src="images/delete.png"
                    alt="delete"
                    onClick={() => this.deleteData(data.id)}
                    width={"30px"}
                  />
                  <img
                    src="images/pen.png"
                    alt="edit"
                    onClick={() => this.updateData(data.id)}
                    width={"30px"}
                  />
                </div>
                <div className="div2">
                  {data.state} | {data.location} |{" "}
                  {data.propertyToBe === "1" ? "Sell" : "Rent"}
                </div>
                <div className="div3">{data.description}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="footer">
          <button onClick={() => this.showPopup()}>Add New Property</button>
        </div>
      </div>
    );
  }
}
