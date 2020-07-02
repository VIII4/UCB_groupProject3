import React from "react";
import '../Card.css';

// messed this up
class VoteList extends React.Component {
    DoSomething = (event, id = 0) => {
        console.log("Event Triggered");
    }

    GetDBIssues = () => {
        // get database response
        var tagList = [];

        // loop through response
        for (var i = 0; i < 30; i++) {
            tagList.push(
                <div className="labelContainer">
                    <a onClick={(event) => { this.DoSomething(event, 1) }}>Issue A</a >
                    <button id="voteListBtn" onClick={this.DoSomething}>Vote</button>
                </div>
            );
        }
        return tagList;
    }

    render() {
        // <h4> should be in main card not innards
        return (
            // this.props is coming from App.js --> Main.js --> Card.js
            <div id="voteCardContent" className="textBlock cardInnards">

                <div className="headerContainer">
                    <h3>{this.props.header}</h3>
                </div>

                <div id="voteListFieldsContainer">
                    {this.GetDBIssues()}
                </div>
            </div>
        )
    };
};

export default VoteList;