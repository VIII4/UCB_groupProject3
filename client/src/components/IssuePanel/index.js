import React from "react";
import ReportIssueButton from "../ReportIssueButton";
import ReportForm from "../ReportForm";
import "./style.css";

export default function IssuesPanel({ onReportIssueClick, submitIssueReport }) {
  return (
    <div className="overViewPanel">
      <div className="buttonPanel">
        {/* Will need to create hook with issue type state and to report form from button click */}
        <ReportForm submitIssueReport={submitIssueReport} />
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
