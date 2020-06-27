import React from "react";
import ContactsCard from "./CardContent/ContactsCard";
import AboutCard from "./CardContent/AboutCard";
import VoteList from "./CardContent/VoteList";
import './Card.css';

// DIFFERENCE BTWN DISPLAY AND VISIBILITY - visibility still in doc; affecs div; display not
// CHOOSING ID VS CLASS - single element? - id; affect multiple? - use className

class Card extends React.Component {
    // card closing methods
    closeCardInnards = () => {
        // collect html collection --> convert to array
        var cardInnardsList = Array.prototype.slice.call(document.getElementsByClassName("cardInnards"));

        // hide all card innards with common className
        cardInnardsList.forEach(element => {
            element.style.display = "none";
        });
    }
    closeCard = () => {
        // hide card containter
        document.getElementById("cardContainer").style.visibility = "hidden";
        this.closeCardInnards();
    };

    //                     //
    // program entry point //
    //                     //
    render() {
        return (
            // this.props is coming from App.js --> Main.js --> Card.js
            <div className="cardContainer" id="cardContainer" style={{ visibility: this.props.visibility }}>

                <a id="closeBtn" className="closebtn" onClick={this.closeCard}>x</a>
                <br></br>

                <div id="cardInnards" className="textBlock">
                    <ContactsCard header="Local Government Contacts" display="none" />
                    <AboutCard header="About" display="none" />
                    <VoteList header="Issues In Your Area" display="none" />
                </div>

                {/* add buttons and stuff here */}
            </div>
        )
    }
}

export default Card;