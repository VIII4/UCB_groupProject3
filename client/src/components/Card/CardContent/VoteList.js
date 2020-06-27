import React from "react";
import '../Card.css';

class VoteList extends React.Component {

    // https://stackoverflow.com/questions/41667346/react-create-nested-components-with-loops
    // renderSquare(i) {
    //     return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
    // }

    DoSomething = () => {
        console.log("Event Triggered");
    }

    render() {
        // <h4> should be in main card not innards
        return (
            // this.props is coming from App.js --> Main.js --> Card.js
            <div id="voteCardContent" className="textBlock cardInnards">
                <h4>{this.props.header}</h4>
                <hr></hr>
                <div className="voteRowCardInnard">
                    <a>Issue A</a>
                    <button onClick={this.DoSomething}>Vote</button>
                </div>
                <div className="voteRowCardInnard">
                    <a>Issue A</a>
                    <button onClick={this.DoSomething}>Vote</button>
                </div>
                <div className="voteRowCardInnard">
                    <a>Issue A</a>
                    <button onClick={this.DoSomething}>Vote</button>
                </div>
            </div >
        )
    }
}

export default VoteList;


