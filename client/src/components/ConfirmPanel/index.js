import React, { useState } from "react";
import ReportForm from "../ReportForm";
import "./style.css";

export default function ConfirmPanel({ submitIssueReport, typeSelected }) {
  // Image upload, description and Confirm/Cancel Button
  return (
    <div className="confirmPanel">
      <ReportForm
        submitIssueReport={submitIssueReport}
        typeSelected={typeSelected}
      />
    </div>
  );
}
