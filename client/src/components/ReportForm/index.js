import React, { Component } from "react";
import "./style.css";
import { set } from "mongoose";

export default class ReportForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issueType: props.issueType,
      descValue: "",
      imageA: null,
      imageB: null,
      imageC: null,
    };
  }

  handleInputChange = (event) => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    let name = event.target.name;

    // Updating the input's state
    this.setState({ [name]: value });
  };

  handleImageValue = (event) => {
    let value = event.target.value;
    this.setState({ imageA: value });
  };
  render() {
    return (
      <div>
        <form className="form">
          <input
            value={this.state.descValue}
            name="description"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Description"
          />
          <input
            type="file"
            id="myfile"
            name="imageA"
            onChange={this.handleInputChange}
          ></input>
          <input type="file" id="myfile" name="imageB"></input>
          <input type="file" id="myfile" name="imageC"></input>
          {/* TO DO: Submit button logic to be passed from main */}
          <button>Submit</button>
        </form>
      </div>
    );
  }
}
