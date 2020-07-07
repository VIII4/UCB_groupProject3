import React, { Component } from "react";
import "./style.css";
import { set } from "mongoose";
import { FaImages } from "react-icons/fa";

export default class ReportForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // issueType: props.issueType,
      issueType: this.props.typeSelected,
      descValue: "",
      imageFiles: null,
      imagePreviewLinks: [],
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
    let _imagePreviewLinks = [];
    files.forEach((file) =>
      _imagePreviewLinks.push(window.URL.createObjectURL(file))
    );
    this.setState({ imagePreviewLinks: _imagePreviewLinks });
  };

  handleSubmitClick = (event) => {
    event.preventDefault();
    const { issueType, descValue, imageFiles } = this.state;
    const types = ["image/png", "image/jpeg", "image/gif"];
    let error = false;
    const errorMsg = [];

    // Need a Validation for
    // Validate all files submitted
    if (!issueType || !descValue || !imageFiles) {
      alert("1-3 images and Description is Required");
      return;
    }

    //add all database items to data object, then image files to form data
    //when passed above main will add more info to data and send two seperate request
    let data = {
      category: issueType,
      descr: descValue,
    };
    const formData = new FormData();
    imageFiles.forEach((file, index) => {
      if (types.every((type) => file.type !== type)) {
        errorMsg.push(`'${file.type}' is not a supported format`);
        error = true;
        return;
      }

      // #3 Catching files that are too large on the client
      if (file.size > 150000) {
        errorMsg.push(
          `'${file.name}' is too large, please pick a smaller file`
        );
        error = true;
        return;
      }

      formData.append(index, file);
    });

    //if no errors execute submitIssue from props, then set state to null
    if (!error) this.props.submitIssueReport(data, formData);
    else {
      errorMsg.map((msg) => alert(msg));
    }
    // reset state
    this.setState({
      issueType: "Structural",
      descValue: "",
      imageFiles: null,
      imagePreviewLinks: [],
    });
  };
  render() {
    const { imagePreviewLinks } = this.state;
    return (
      <div>
        <form className="form">
          {imagePreviewLinks && (
            <>
              {imagePreviewLinks.map((imgSrc) => (
                <img className="img-thumb" src={imgSrc} alt="Test"></img>
              ))}
            </>
          )}
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
          <button onClick={this.handleSubmitClick}> Submit</button>
        </form>
      </div>
    );
  }
}
