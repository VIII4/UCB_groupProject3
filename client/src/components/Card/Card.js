import React from "react";
import './Card.css';

class Card extends React.Component {

    // use super(props) to avoid an error
    constructor(props) {
        super(props);

        this.state = {
            cardType: "contacts"
        }
    }


    closeCard = () => {
        document.getElementById("cardContainer").style.visibility = "hidden";
    }

    render() {
        return (

            // this.props is coming from App.js --> Main.js --> Card.js
            <div id="cardContainer" className="cardContainer" style={{ visibility: this.props.visibility }}>

                <a id="closeBtn" href="#" className="closebtn" onClick={this.closeCard}>x</a>
                <hr></hr>

                <div className="textBlock">
                    <a id="aTag" href="#">Local services: 555 555 5555</a>
                    <br></br>
                    <a id="aTag" href="#">Local services: 555 555 5555</a>
                    <br></br>
                    <a id="aTag" href="#">Local services: 555 555 5555</a>
                    <br></br>
                    <a id="aTag" href="#">Local services: 555 555 5555</a>
                </div>

                {/* add buttons or stuff here */}
            </div>
        )
    }
}

export default Card;