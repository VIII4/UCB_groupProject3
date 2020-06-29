import React from "react";
import './ContextBtn.css';

// NOTE
// events are (jquery?) usually a seperate js file that is called by 
// html which listens to actions on the client side and reacts...
// I like this method better...

class ContextBtn extends React.Component {


    CloseSidebar = () => {
        document.getElementById("carenSidebar").style.width = "0px";
        document.getElementById("carenSidebar").style.borderRight = "border-right: 5px solid #000"
        document.getElementById("main").style.marginLeft = "0px";
    }

    CloseCardInnards = () => {
        // collect html collection --> convert to array
        var cardInnardsList = Array.prototype.slice.call(document.getElementsByClassName("cardInnards"));

        // hide all card innards with common className
        cardInnardsList.forEach(element => {
            element.style.display = "none";
        });
    }

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

    //                     //
    // program entry point //
    //                     //
    render() {
        return (
            // main sidebar div container
            <div id="contextBtnContainer">
                {/* sidebar open button */}
                <button className="contextBtn" onClick={this.OpenCard}>...</button>
            </div>
        )
    }
}

export default ContextBtn;