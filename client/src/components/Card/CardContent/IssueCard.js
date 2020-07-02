import React from "react";
import '../Card.css';

class IssueCard extends React.Component {
    DoSomething = (event, id = 0) => {
        console.log("Event Triggered");
    }

    GetDBIssues = () => {
        // get database response
        var tagList = [];

        // loop through response
        for (var i = 0; i < 5; i++) {
            tagList.push(
                <a onClick={(event) => { this.DoSomething(event, 1) }}> Issue A</a >,
                <button onClick={this.DoSomething}>Vote</button>,
                <br></br>);
        }
        return tagList;
    }

    render() {
        // <h4> should be in main card not innards
        return (
            // this.props is coming from App.js --> Main.js --> Card.js
            <div id="voteCardContent" className="textBlock cardInnards">

                <div className="headerContainer">
                    <h4>{this.props.header}</h4>
                </div>

                {this.GetDBIssues()}

            </div>
        )
    };
};

export default IssueCard;


