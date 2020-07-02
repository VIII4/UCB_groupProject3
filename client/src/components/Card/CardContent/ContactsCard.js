import React from "react";
import '../Card.css';

class ContactsCard extends React.Component {

    render() {
        return (
            // this.props is coming from App.js --> Main.js --> Card.js
            <div id="contactsCardContent" className="textBlock cardInnards">

                <div className="headerContainer">
                    <h4>{this.props.header}</h4>
                </div>

                <div>
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

            </div >
        )
    }
}

export default ContactsCard;




