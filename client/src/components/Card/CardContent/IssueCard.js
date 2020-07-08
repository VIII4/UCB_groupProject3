import React from "react";
import "./IssueCard.css";
import "../Card.css";

class IssueCard extends React.Component {
  // card methods
  CloseCardInnards = () => {
    // collect html collection --> convert to array
    var cardInnardsList = Array.prototype.slice.call(
      document.getElementsByClassName("cardInnards")
    );

    // hide all card innards with common className
    cardInnardsList.forEach((element) => {
      element.style.display = "none";
    });
  };
  CloseCard = () => {
    // hide card containter
    document.getElementById("cardContainer").style.visibility = "hidden";
    this.CloseCardInnards();
  };
  OpenCard = (event, type) => {
    // first close any open cards
    this.CloseCardInnards();

    // show card parent
    document.getElementById("cardContainer").style.visibility = "visible";

    // using type input render the appropriate card innards
    switch (type) {
      // set to visible by id since they are unique
      case "about":
        document.getElementById("aboutCardContent").style.display = "block";
        break;
      case "contacts":
        document.getElementById("contactsCardContent").style.display = "block";
        break;
      case "logIn":
        document.getElementById("logInCardContent").style.display = "block";
        break;
      case "signUp":
        document.getElementById("signUpCardContent").style.display = "block";
        break;
    }

<<<<<<< HEAD
    render() {
        // <h4> should be in main card not innards
        return (
            // this.props is coming from App.js --> Main.js --> Card.js
            <div id="issueCardContent" className="textBlock cardInnards">
=======
    // close sidebar after cards render
    this.CloseSidebar();
  };
>>>>>>> f6a2beebcf3a54bd9a75db3104d365b5a4a15064

  GetDBIssues = () => {
    console.log("event triggered!");
  };

  render() {
    const { selectedIssue } = this.props;

    // <h4> should be in main card not innards
    return (
      <div id="issueCardContent" className="textBlock cardInnards">
        {selectedIssue && (
          <div>
            <div className="headerContainer">
              <h3 classButton="bold">{selectedIssue.category}</h3>
            </div>
            <ul>
              <li>{selectedIssue.descr}</li>
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default IssueCard;
