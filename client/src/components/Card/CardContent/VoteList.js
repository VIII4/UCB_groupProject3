import React from "react";
import "../Card.css";

class VoteList extends React.Component {
  DoSomething = () => {
    console.log("Event Triggered");
  };

  // GetDBIssues = () => {
  //     var tagList = [];
  //     for (var i = 0; i < 5; i++) {
  //         tagList.push(<a>Issue A</a>, <button onClick={this.DoSomething, <br></br>}>Vote</button>)
  //     }
  //     return tagList;
  // }

  render() {
    // <h4> should be in main card not innards
    return (
      // this.props is coming from App.js --> Main.js --> Card.js
      <div id="voteCardContent" className="textBlock cardInnards">
        <h4>{this.props.header}</h4>
        <hr></hr>
        {this.props.localIssues.map((issue) => {
          return (
            <li>
              <a>{issue.category}</a>
              <button onClick={this.props.onVoteClick}>Vote</button>
            </li>
          );
        })}
      </div>
    );
  }
}

export default VoteList;
