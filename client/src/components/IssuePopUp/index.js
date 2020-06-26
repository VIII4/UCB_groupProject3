import React, { Component } from "react";
import "./style.css";

export default function IssuesPopUp({ selectedIssue }) {
  return (
    <>
      <div>
        <h3>{selectedIssue.category}</h3>
        <p>{selectedIssue.descr}</p>
        <button type="button">A</button>
        <button type="button">B</button>
      </div>
    </>
  );
}
