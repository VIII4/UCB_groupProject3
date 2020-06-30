import React from "react";
import './Sidebar.css';

// NOTE
// events are (jquery?) usually a seperate js file that is called by 
// html which listens to actions on the client side and reacts...
// I like this method better...

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { bool: false };
    }

    // sidebar methods
    OpenSidebar = () => {
        document.getElementById("carenSidebar").style.width = "30vw";
        document.getElementById("carenSidebar").style.borderRight = "border-right: 5px solid #000"
        document.getElementById("main").style.marginLeft = "30vw";
    };
    CloseSidebar = () => {
        document.getElementById("carenSidebar").style.width = "0px";
        document.getElementById("carenSidebar").style.borderRight = "border-right: 5px solid #000"
        document.getElementById("main").style.marginLeft = "0px";
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
        switch (type) {
            // set to visible by id since they are unique
            case "about":
                document.getElementById("aboutCardContent").style.display = "block";
                break;
            case "contacts":
                document.getElementById("contactsCardContent").style.display = "block";
                break;
            case "login":
                document.getElementById("loginCardContent").style.display = "block";
                break;
            case "register":
                document.getElementById("registerCardContent").style.display = "block";
                break;
        }

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

    //                     //
    // program entry point //
    //                     //
    render() {
        return (
            <div>

                {/* top row with open button and logo */}
                <div id="main">
                    {/* sidebar open button */}
                    <button className="openbtn" onClick={this.OpenSidebarToggle}>☰</button>

                    {/* app logo */}
                    <a className="logo" onClick={this.CloseCard}>Care'n</a>
                </div>

                {/* sidebar contents */}
                <div id="carenSidebar" className="sidebar">
                    <a id="aTag" onClick={(event) => { this.OpenCard(event, "about") }}>About</a>
                    <a id="aTag" onClick={(event) => { this.OpenCard(event, "contacts") }}>Contact</a>
                    <a id="aTag" onClick={(event) => { this.OpenCard(event, "login") }}>Log In</a>
                    <a id="aTag" onClick={(event) => { this.OpenCard(event, "register") }}>Register</a>
                </div>

            </div>
        )
    }
}

export default Sidebar;