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
                            <h3 classButton="bold">{selectedIssue.category}</h3>
                        </div>
                        <ul className="labelContainer">
                            <li>
                                <div>
                                    {selectedIssue.images.map((imageURL) => {
                                        return (
                                            <div className="carasel">

                                            </div>
                                        );
                                    })}
                                </div>
                            </li>
                            <li className="labelContainer">
                                <a>Status: {selectedIssue.status}</a>
                                <a className="floatRight">Votes: {selectedIssue.voteCount}</a>
                            </li>

                            <li className="labelContainer">
                                {selectedIssue.descr}
                            </li>

                            {/* IYAN, THIS IS WHERE THE COMMENT SECTION SHOULD GO */}
                            <li className="labelContainer">
                            </li>



                        </ul>
                    </div>
                )}
            </div>
        );
    }
}

export default IssueCard;
