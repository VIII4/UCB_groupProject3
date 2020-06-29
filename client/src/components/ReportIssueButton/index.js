import React from "react";
import IssueIcon from "../IssueIcon";
import "./style.css";

export default function ReportIssueButton({ issueType, onReportIssueClick }) {
  return (
    <button
      name={issueType}
      type="button"
      onClick={() => {
        onReportIssueClick(issueType);
      }}
    >
      <IssueIcon issueType={issueType} />
    </button>
  );
}
