import React from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import "./IssueCard.css";
import "../Card.css";

class IssueCard extends React.Component {
    // card methods
    CloseCardInnards = () => {
        // collect html collection --> convert to array
        var cardInnardsList = Array.prototype.slice.call(
            document.getElementsByClassName("cardInnards")
        );

        // hide all card innards with common class
        cardInnardsList.forEach((element) => {
            element.style.display = "none";
        });
    };
    CloseCard = () => {
        // hide card containter
        document.getElementById("cardContainer").style.visibility = "hidden";
        this.CloseCardInnards();
    };
    OpenCard = () => {
        // first close any open cards
        this.CloseCardInnards();

        // show card parent
        document.getElementById("cardContainer").style.visibility = "visible";

        if (document.getElementById("voteCardContent")) {
            // using type input render the appropriate card innards
            document.getElementById("voteCardContent").style.display = "block";
        }
    };

    render() {
        const { selectedIssue } = this.props;

        // <h4> should be in main card not innards
        return (
            <div id="issueCardContent" className="textBlock cardInnards">
                {selectedIssue && (
                    <div>
                        <div className="headerContainer">
                            <h3 className="bold">{selectedIssue.category}</h3>
                        </div>
                        <ul className="labelContainer">
                            <li>
                                <div className="heightRestriction">
                                    <Carousel>
                                        {selectedIssue.images.map((imageURL) => {
                                            return <img className="heightRestriction" src={imageURL} />;
                                        })}
                                    </Carousel>
                                </div>
                            </li>

                            <li className="labelContainer">
                                <a>Status: {selectedIssue.status}</a>
                                <a className="floatRight">Votes: {selectedIssue.voteCount}</a>
                            </li>

                            <li className="labelContainer">{selectedIssue.descr}</li>

                            <li>
                                <p>Comments go here</p>
                            </li>

                            <li>
                                <button onClick={this.props.onVoteClick}>Vote</button>
                            </li>

                            <li>
                                <button onClick={this.props.onVoteClick}>Vote</button>
                            </li>

                            <li className="labelContainer">
                                <textarea className="textBox" rows="4" cols="50" name="comment" form="usrform">
                                    Enter text here...</textarea>
                            </li>

                            <li>
                                <a onClick={this.OpenCard}>Back</a>
                            </li>

                        </ul>
                    </div>
                )}
            </div>
        );
    }
}

export default IssueCard;
