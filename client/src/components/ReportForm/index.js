import React, { Component } from "react";
import "./style.css";
import { set } from "mongoose";
import { FaImages } from "react-icons/fa";

export default class ReportForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // issueType: props.issueType,
      issueType: "Structural",
      descValue: "",
      imageFiles: null,
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
    // Validate files are images...
    if (event.target.files.length > 3 || event.target.files.length <= 0) {
      alert("Please submit max of 3 images");
      return;
    }
    const files = Array.from(event.target.files);
    this.setState({ imageFiles: files });
  };

  handleSubmitClick = (event) => {
    event.preventDefault();
    const { issueType, descValue, imageFiles } = this.state;

    // Need a Validation for
    // Validate all files submitted
    if (!issueType || !descValue || !imageFiles) {
      alert("1-3 images and Description is Required");
      return;
    }

    //add all items to data object
    const formData = new FormData();
    formData.append("category", issueType);
    formData.append("descr", descValue);
    imageFiles.forEach((file, index) => {
      formData.append(`file[${index}]`, file);
    });

    //execute submitIssue from props, then set state to null
    this.props.submitIssueReport(formData);
    this.setState({
      issueType: "Structural",
      descValue: "",
      imageFiles: null,
    });
  };
  render() {
    return (
      <div>
        <form className="form">
          <input
            value={this.state.descValue}
            name="descValue"
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

          {/* TO DO: Submit button logic to be passed from main */}
          <button onClick={this.handleSubmitClick}> Submit</button>
        </form>
      </div>
    );
  }
}
