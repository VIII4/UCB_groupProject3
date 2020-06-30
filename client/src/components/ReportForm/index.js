import React, { Component } from "react";
import "./style.css";
import { set } from "mongoose";

export default class ReportForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descValue: "",
      imageA: null,
      imageB: null,
      imageC: null
    };
  }

  handleInputChange = (event) => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;

    // Updating the input's state
    this.setState({ descValue: value });
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
          <input type="file" id="myfile" name="myfile"></input>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}
