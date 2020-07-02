import React from "react";
import "../Card.css";

class VoteList extends React.Component {
  render() {
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
