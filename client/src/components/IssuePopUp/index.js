import React from "react";
import "./style.css";
import IssueImageGallery from "../IssueImageGallery";

export default function IssuesPopUp({
  selectedIssue,
  onVoteClick,
  onResolveClick,
}) {
  return (
    <>
      <div>
        <h3>{selectedIssue.category}</h3>
        <p>{selectedIssue.descr}</p>
        {/* TESTING Display images if there are any */}
        {selectedIssue.images.length > 0 && (
          <IssueImageGallery
            images={selectedIssue.images}
            issueDesc={selectedIssue.descr}
          />
        )}

        <button type="button" onClick={onVoteClick}>
          A
        </button>
        <button type="button" onClick={onResolveClick}>
          B
        </button>
      </div>
    </>
  );
}
