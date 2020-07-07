import React from "react";
import IssueIcon from "../IssueIcon";
import "./ReportIssueButton.css";

export default function ReportIssueButton({ issueType, onReportIssueClick }) {
  return (
    <button className="reportBtn"
      name={issueType}
      type="button"
      onClick={() => {
        onReportIssueClick(issueType);
      }}
    >
      <IssueIcon className="reportBtn" issueType={issueType} />
    </button>
  );
}
