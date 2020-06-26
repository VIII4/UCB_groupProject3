import React from "react";
import ContactsCard from "./ContactsCard";
// import AboutCard from "./AboutCard";
import './Card.css';

class Card extends React.Component {
    state = {
        cardType: "contacts"
    }

    closeCard = () => {
        document.getElementById("cardContainer").style.visibility = "hidden";
    }

    render() {

        // check state

        return (

            // this.props is coming from App.js --> Main.js --> Card.js
            <div id="cardContainer" className="cardContainer" style={{ visibility: this.props.visibility }}>

                <a id="closeBtn" href="#" className="closebtn" onClick={this.closeCard}>x</a>
                <hr></hr>

                <div className="textBlock">
                    <ContactsCard visibility="hidden" />
                    {/* <AboutCard visibility="hidden" /> */}
                </div>

                {/* add buttons or stuff here */}
            </div>
        )
    }
}

export default Card;