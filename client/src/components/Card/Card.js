import React from "react";
import ContactsCard from "./CardContent/ContactsCard";
import AboutCard from "./CardContent/AboutCard";
import VoteList from "./CardContent/VoteList";
import LogInCard from "./CardContent/LogInCard";
import SignUpCard from "./CardContent/SignUpCard";
import './Card.css';

// visibility:"hidden" hides element but still in DOM
// display:"none" removes element from DOM

class Card extends React.Component {
    //                     //
    // program entry point //
    //                     //
    render() {
        return (
            // this.props is coming from App.js --> Main.js --> Card.js
            <div className="cardContainer" id="cardContainer" style={{ visibility: this.props.visibility }}>
                <div id="cardInnards" className="textBlock">
                    <ContactsCard header="Local Government Contacts" display="none" />
                    <AboutCard header="About" display="none" />
                    <VoteList header="Issues In Your Area" display="none" />
                    <LogInCard header="Log In" display="none" />
                    <SignUpCard header="Sign Up" display="none" />
                </div>

                {/* add buttons and stuff here */}
            </div>
        )
    }
}

export default Card;