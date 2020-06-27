import React from "react";
import ContactsCard from "./CardContent/ContactsCard";
import AboutCard from "./CardContent/AboutCard";
import './Card.css';

class Card extends React.Component {
    closeCard = () => {
        // hide card containter
        document.getElementById("cardContainer").style.visibility = "hidden";

        // collect html collection --> convert to array
        var cardInnardsList = Array.prototype.slice.call(document.getElementsByClassName("cardInnards"));

        // hide all card innards with common className
        cardInnardsList.forEach(element => {
            element.style.display = "none";
        });
    }

    render() {
        return (
            // this.props is coming from App.js --> Main.js --> Card.js
            <div className="cardContainer" id="cardContainer" style={{ visibility: this.props.visibility }}>

                <a id="closeBtn" href="#" className="closebtn" onClick={this.closeCard}>x</a>
                <br></br>

                <div id="cardInnards" className="textBlock">
                    <ContactsCard header="Local Government Contacts" display="none" />
                    <AboutCard header="About" display="none" />
                </div>

                {/* add buttons or stuff here */}
            </div>
        )
    }
}

export default Card;