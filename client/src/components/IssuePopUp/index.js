import React from "react";
import "./style.css";
import IssueImageGallery from "../IssueImageGallery";

export default function IssuesPopUp({
  selectedIssue,
  onVoteClick,
  onResolveClick,
}) {
  const CloseCardInnards = () => {
    // collect html collection --> convert to array
    var cardInnardsList = Array.prototype.slice.call(
      document.getElementsByClassName("cardInnards")
    );

    // hide all card innards with common className
    cardInnardsList.forEach((element) => {
      element.style.display = "none";
    });
  };
  const OpenCard = (event, type) => {
    // first close any open cards
    CloseCardInnards();

    // show card parent
    document.getElementById("cardContainer").style.visibility = "visible";

    if (document.getElementById("issueCardContent")) {
      // using type input render the appropriate card innards
      document.getElementById("issueCardContent").style.display = "block";
    }

    // close sidebar after cards render
    //this.CloseSidebar();
  };

  return (
    <>
      <div>
        <h3>
          <strong>{selectedIssue.category}</strong>
        </h3>
        <hr className="lineColor"></hr>
        <p>{selectedIssue.descr}</p>
        {/* TESTING Display images if there are any */}
        {selectedIssue.images.length > 0 && (
          <IssueImageGallery
            images={selectedIssue.images}
            issueDesc={selectedIssue.descr}
          />
        )}
        <div className="buttonsDiv">
          <button className="voteButton" type="button" onClick={onVoteClick}>
            Vote
          </button>
          <button
            className="reportButton"
            type="button"
            onClick={onResolveClick}
          >
            Resolve
          </button>
        </div>
        <a
          onClick={(event) => {
            OpenCard(event);
          }}
        >
          Details
        </a>
      </div>
    </>
  );
}
