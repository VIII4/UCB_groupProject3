import React from "react";
import ContactsCard from "./CardContent/ContactsCard";
import AboutCard from "./CardContent/AboutCard";
import VoteList from "./CardContent/VoteList";
import LogInCard from "./CardContent/LogInCard";
import SignUpCard from "./CardContent/SignUpCard";
import "./Card.css";
import IssueCard from "./CardContent/IssueCard";

// visibility:"hidden" hides element but still in DOM
// display:"none" removes element from DOM

export default function Card({
  zipCode,
  localIssues,
  selectedIssue,
  setSelectedIssue,
  onVoteClick,
  onCommentSubmission,
  visibility,
}) {
  //                     //
  // program entry point //
  //                     //
  return (
    // this.props is coming from App.js --> Main.js --> Card.js
    <div
      className="cardContainer"
      id="cardContainer"
      style={{ visibility: visibility }}
    >
      <div id="cardInnards" className="textBlock">
        <AboutCard header="About" display="none" />
        <ContactsCard
          zipCode={zipCode}
          header="Local Government Contacts"
          display="none"
        />
        <IssueCard
          onVoteClick={onVoteClick}
          selectedIssue={selectedIssue}
          onCommentSubmission={onCommentSubmission}
        />
        <VoteList
          setSelectedIssue={setSelectedIssue}
          selectedIssue={selectedIssue}
          localIssues={localIssues}
          onVoteClick={onVoteClick}
          header="Issues In Your Area"
          display="none"
        />
        <LogInCard header="Log In" display="none" />
        <SignUpCard header="Sign Up" display="none" />
      </div>

      {/* add buttons and stuff here */}
    </div>
  );
}
