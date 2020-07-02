import React from "react";
import "../Card.css";
import "./LogInCard.css";

class LogInCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // sidebar methods
    OpenSidebar = () => {
        document.getElementById("carenSidebar").style.width = "30vw";
        document.getElementById("carenSidebar").style.borderRight = "border-right: 5px solid #000"
        document.getElementById("openBtnLogoContainer").style.marginLeft = "30vw";
    };
    CloseSidebar = () => {
        document.getElementById("carenSidebar").style.width = "0px";
        document.getElementById("carenSidebar").style.borderRight = "border-right: 5px solid #000"
        document.getElementById("openBtnLogoContainer").style.marginLeft = "0px";
    };

    // card methods
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

        // show card parent
        document.getElementById("cardContainer").style.visibility = "visible";

        // using type input render the appropriate card innards
        if (type == "signUp") {
            document.getElementById("signUpCardContent").style.display = "block";
        };

        // close sidebar after cards render
        this.CloseSidebar()
    };

    // toggle sidebar methods
    OpenSidebarToggle = () => {
        // toggle boolean value to either close or open card
        this.state.bool = !this.state.bool

        if (this.state.bool) {
            this.OpenSidebar();
        }
        else {
            this.CloseSidebar();
        }
    }

    // form event handlers
    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }


    render() {
        return (
            // this.props is coming from App.js --> Main.js --> Card.js
            <div id="logInCardContent" className="textBlock cardInnards">

                <div className="headerContainer">
                    <h4>{this.props.header}</h4>
                </div>

                <div id="logInFieldsContainer">
                    <div className="labelContainer">
                        <label>Email/Username:
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                        </label>
                    </div>
                    <div className="labelContainer">
                        <label>Password:
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                        </label>
                    </div>
                </div>

                <div id="switchToSignUp">
                    <p>Not a member?<br></br><a onClick={(event) => { this.OpenCard(event, "signUp") }}>Sign Up</a> for Care'n!</p>
                </div>

            </div >
        )
    }
}

export default LogInCard;