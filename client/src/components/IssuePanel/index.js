import React from "react";
import ReportIssueButton from "../ReportIssueButton";
import ReportForm from "../ReportForm";
import "./style.css";

export default function IssuesPanel({ onReportIssueClick }) {
  return (
    <div className="overViewPanel">
      <div className="buttonPanel">
        <ReportForm /> {/* Will Need to send prop for reported type */}
        <ReportIssueButton
          issueType="Wildlife"
          onReportIssueClick={onReportIssueClick}
        />
        <ReportIssueButton
          issueType="Structural"
          onReportIssueClick={onReportIssueClick}
        />
        <ReportIssueButton
          issueType="Utility"
          onReportIssueClick={onReportIssueClick}
        />
        <ReportIssueButton
          issueType="Roads"
          onReportIssueClick={onReportIssueClick}
        />
      </div>
      <div className="buttonPanel center">
        <ReportIssueButton
          issueType="Vandalism"
          onReportIssueClick={onReportIssueClick}
        />
        <ReportIssueButton
          issueType="Trash"
          onReportIssueClick={onReportIssueClick}
        />
        <ReportIssueButton
          issueType="Other"
          onReportIssueClick={onReportIssueClick}
        />
      </div>
    </div>
  );
}
