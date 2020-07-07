import React from "react";
import axios from "axios";
import "../Card.css";
import API from "../../../utils/API";

class ContactsCard extends React.Component {
  state = {
    govList: [],
    newGovObj: [],
  };

  constructor(props) {
    super(props);
  }

  GetGovData = (zipCode = 10029) => {
    // set api url
    const govUrl = `https://www.googleapis.com/civicinfo/v2/representatives?includeOffices=true&levels=locality&key=AIzaSyAjJP4OylQOMoWdiaIOZoTkfm_WwLeeR7g&address=${zipCode}`;

    var tags = [];

    // get data from selected  api
    axios
      .get(govUrl)
      .then((res) => {
        this.setState({ govList: res.data });

        // array of objects will be set to state
        var arrayList = [];
        for (var i = 0; i < 4; i++) {
          // create an empty object and populate with data
          var newGovObj = {};
          newGovObj.office = res.data.offices[i].name
            ? res.data.offices[i].name
            : "Info not available";
          newGovObj.name = res.data.officials[i].name
            ? res.data.officials[i].name
            : "Info not available";
          newGovObj.phones = res.data.officials[i].phones
            ? res.data.officials[i].phones
            : "Info not available";
          newGovObj.twitter = res.data.officials[i].channels
            ? res.data.officials[i].channels[0].id
            : "Info not available";
          newGovObj.urls = res.data.officials[i].urls
            ? res.data.officials[i].urls
            : "Info not available";

          // append newGovObj to arrayList
          arrayList.push(newGovObj);
        }
        // set current state
        this.setState({ newGovObj: arrayList });
      })
      .catch((err) => console.log(err));
  };

  // componentDidMount() instantiates GetGovData on load
  componentDidMount() {
    this.GetGovData();
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.zipCode !== prevProps.zipCode) {
      console.log(
        "prev props =" +
          prevProps.zipCode +
          ", New Props =" +
          this.props.zipCode
      );
      this.GetGovData(this.props.zipCode);
    }
  }

  render() {
    return (
      // this.props is coming from App.js --> Main.js --> Card.js
      <div id="contactsCardContent" className="textBlock cardInnards">
        <div className="headerContainer">
          <h4>{this.props.header}</h4>
        </div>

        <div>
          {/* use map to loop through each entry | {obj} data */}
          {this.state.newGovObj.map((element) => {
            return (
              <ul className="labelContainer">
                <li>{element.name}</li>
                <li>{element.office}</li>
                <li>
                  <a href={"tel:" + element.phones}>{element.phones}</a>
                </li>
                <li>
                  <a href={"https://twitter.com/" + element.twitter}>
                    @{element.twitter}
                  </a>
                </li>
                <li>
                  <a href={element.urls}>website</a>
                </li>
              </ul>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ContactsCard;
