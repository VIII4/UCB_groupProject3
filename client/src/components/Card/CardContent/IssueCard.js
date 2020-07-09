import React from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import "./IssueCard.css";
import "../Card.css";

class IssueCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commentValue: "",
        }
    };

    handleInputChange = (event) => {
        // Getting the value and name of the input which triggered the change
        let value = event.target.value;
        let name = event.target.name;

        // Updating the input's state
        this.setState({ [name]: value });
    };

    handleSubmitClick = (event) => {
        alert("Hello");
        event.preventDefault();
        this.props.onCommentSubmission(
            this.props.selectedIssue,
            this.state.commentValue
        );
        this.setState({ commentValue: "" });
    };
    // card methods
    CloseCardInnards = () => {
        // collect html collection --> convert to array
        var cardInnardsList = Array.prototype.slice.call(document.getElementsByClassName("cardInnards"));

        // hide all card innards with common className
        cardInnardsList.forEach(element => {
            element.style.display = "none";
        });
    }

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

                            <li className="labelContainer">
                                <button id="floatLeft" onClick={this.OpenCard}>Back</button>
                                <button className="floatRight" onClick={this.props.onVoteClick}>Vote</button>
                            </li>

                            <br></br>
                            <br></br>

                            <li className="labelContainer bold">{selectedIssue.descr}</li>

                            <br></br>

                            <li className="labelContainer">
                                <textarea
                                    value={this.state.commentValue}
                                    className="textBox"
                                    rows="4"
                                    cols="50"
                                    name="commentValue"
                                    onChange={this.handleInputChange}
                                    type="text"
                                    form="usrform"
                                    placeholder="Add comments here"
                                ></textarea>

                                <button onClick={this.props.handleSubmitClick}>
                                    Add Comment
                                </button>
                            </li>

                            <br></br>
                            <br></br>

                            <li className="labelContainer">
                                {selectedIssue.addtlcomments.map((commentObj) => {
                                    return <p>{commentObj.comment}</p>;
                                })}
                            </li>

                        </ul>
                    </div>
                )}
            </div>
        );
    }
}


export default IssueCard;
