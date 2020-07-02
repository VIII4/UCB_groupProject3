import React from "react";
import './ContextBtn.css';

// NOTE
// events are (jquery?) usually a seperate js file that is called by 
// html which listens to actions on the client side and reacts...
// I like this method better...

class ContextBtn extends React.Component {
    constructor(props) {
        super(props);
        this.state = { bool: false };
    }

    // card closing methods
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

    OpenCard = (event, type) => {
        // first close any open cards
        this.CloseCardInnards();

        // open card container
        document.getElementById("cardContainer").style.visibility = "visible";

        // insert voting card innards
        document.getElementById("voteCardContent").style.display = "block";
        console.log("contacts");

        // this.CloseSidebar();
    }

    OpenToggle = () => {
        // toggle boolean value to either close or open card
        this.state.bool = !this.state.bool

        if (this.state.bool) {
            this.OpenCard();
        }
        else {
            this.CloseCard();
        }
    }

    //                     //
    // program entry point //
    //                     //
    render() {
        return (
            // main sidebar div container
            <div id="contextBtnContainer">
                {/* sidebar open button */}
                <button className="contextBtn" onClick={this.OpenToggle}>...</button>
            </div>
        )
    }
}

export default ContextBtn;