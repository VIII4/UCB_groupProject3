import React from "react";
import ContactsCard from "./CardContent/ContactsCard";
import AboutCard from "./CardContent/AboutCard";
import VoteList from "./CardContent/VoteList";
import LogInCard from "./CardContent/LogInCard";
import SignUpCard from "./CardContent/SignUpCard";
import './Card.css';

// visibility:"hidden" hides element but still in DOM
// display:"none" removes element from DOM

export default function Card({
  localIssues,
  selectedIssue,
  setSelectedIssue,
  onVoteClick,
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
        <ContactsCard header="Local Government Contacts" display="none" />
        <VoteList
    
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
