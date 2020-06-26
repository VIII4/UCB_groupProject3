import React, { Component } from "react";
import "./style.css";

export default function IssuesPanel(props) {
  return (
    <>
      <div className="buttonPanel hide">
        <button type="button">A</button>
        <button type="button">B</button>
        <button type="button">C</button>
        <button type="button">D</button>
        <button type="button">E</button>
        <button type="button">F</button>
      </div>
      <div className="confirmPanel hide">
        <button type="button">X</button>
        <button type="button">+</button>
      </div>
    </>
  );
}
