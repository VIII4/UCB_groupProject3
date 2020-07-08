import React from "react";
import IssueIcon from "../IssueIcon";
import "./ReportIssueButton.css";

export default function ReportIssueButton({ issueType, onReportIssueClick }) {
  return (
    <div className="reportBtnInnerContainer">
      <button className="reportBtn"
        name={issueType}
        type="button"
        onClick={() => {
          onReportIssueClick(issueType);
        }}
      >
        {/* all IssueIcon components get the reportBtn class */}
        <IssueIcon className="reportBtn" issueType={issueType} />
      </button>
    </div>
  );
}
