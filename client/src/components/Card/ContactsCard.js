import React from "react";
import './Card.css';

class ContactsCard extends React.Component {
    closeCard = () => {
        document.getElementById("cardContainer").style.visibility = "hidden";
        document.getElementById("contactsCardContent").style.visibility = "hidden";
    }

    render() {
        return (
            // this.props is coming from App.js --> Main.js --> Card.js
            <div id="contactsCardContent">
                <a id="aTag" href="#">Local services: 555 555 5555</a>
                <br></br>
                <a id="aTag" href="#">Local services: 555 555 5555</a>
                <br></br>
                <a id="aTag" href="#">Local services: 555 555 5555</a>
                <br></br>
                <a id="aTag" href="#">Local services: 555 555 5555</a>
                <br></br>
                <a id="aTag" href="#">Local services: 555 555 5555</a>
                <br></br>
                <a id="aTag" href="#">Local services: 555 555 5555</a>
                <br></br>
                <a id="aTag" href="#">Local services: 555 555 5555</a>
                <br></br>
                <a id="aTag" href="#">Local services: 555 555 5555</a>
            </div>
        )
    }
}

export default ContactsCard;




