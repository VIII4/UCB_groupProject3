import React, { Component } from "react";
import "./style.css";
import { set } from "mongoose";
import { FaImages } from "react-icons/fa";

export default class ReportForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issueType: props.issueType,
      descValue: "",
      imageFiles: [],
    };
  }

  handleInputChange = (event) => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    let name = event.target.name;

    // Updating the input's state
    this.setState({ [name]: value });
  };

  handleImageLoad = (event) => {
    const files = Array.from(event.target.files);
    // console.log(files);

    this.setState({ imageFiles: files });
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
          <div className="upload-button">
            <label htmlFor="multi">
              <FaImages className="upload-icon" />
            </label>
            <input
              className="image-input"
              type="file"
              id="multi"
              onChange={this.handleImageLoad}
              multiple
            />
          </div>
          {/* <input type="file" id="myfile" name="imageB"></input>
          <input type="file" id="myfile" name="imageC"></input> */}
          {/* TO DO: Submit button logic to be passed from main */}
          <button>Submit</button>
        </form>
      </div>
    );
  }
}
