import React from "react";
import './Card.css';

class Card extends React.Component {
    method0 = () => {
        // do stuff
    }

    closeCard = () => {
        document.getElementById("cardContainer").style.visibility = "hidden";
    }

    render() {
        return (
            <div id="cardContainer" className="cardContainer">
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