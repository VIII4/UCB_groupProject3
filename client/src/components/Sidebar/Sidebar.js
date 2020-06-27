import React from "react";
import './Sidebar.css';

// NOTE
// events are (jquery?) usually a seperate js file that is called by 
// html which listens to actions on the client side and reacts...
// I like this method better...

class Sidebar extends React.Component {
    OpenSidebar = () => {
        document.getElementById("carenSidebar").style.width = "30vw";
        document.getElementById("carenSidebar").style.borderRight = "border-right: 5px solid #000"
        document.getElementById("main").style.marginLeft = "30vw";
    }
    CloseSidebar = () => {
        document.getElementById("carenSidebar").style.width = "0px";
        document.getElementById("carenSidebar").style.borderRight = "border-right: 5px solid #000"
        document.getElementById("main").style.marginLeft = "0px";
    }

    CloseCardInnards = () => {
        // collect html collection --> convert to array
        var cardInnardsList = Array.prototype.slice.call(document.getElementsByClassName("cardInnards"));

        // hide all card innards with common className
        cardInnardsList.forEach(element => {
            element.style.display = "none";
        });
    }

    OpenCard = (event, type) => {
        // first close any open cards
        this.CloseCardInnards();

        document.getElementById("cardContainer").style.visibility = "visible";

        switch (type) {
            // set to visible by id since they are unique

            case "contacts":
                document.getElementById("contactsCardContent").style.display = "block";
                console.log("contacts");
                break;
            case "about":
                document.getElementById("aboutCardContent").style.display = "block";
                console.log("contacts");
                break;
        }
        this.CloseSidebar()
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
                    <button className="openbtn" onClick={this.OpenSidebar}>☰</button>

                    {/* app logo */}
                    <a className="logo" href="#">Care'n</a>
                </div>

                {/* sidebar contents */}
                <div id="carenSidebar" className="sidebar">
                    <a href="javascript:void(0)" className="closebtn" onClick={this.CloseSidebar}>x</a>
                    <a id="aTag" onClick={(event) => { this.OpenCard(event, "about") }}>About</a>
                    <a id="aTag" onClick={(event) => {
                        this.OpenCard(event, "contacts")
                    }}>Contact</a>
                </div>

            </div>
        )
    }
}

export default Sidebar;