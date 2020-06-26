import React from "react";
import './Sidebar.css';

// NOTE
// events are (jquery?) usually a seperate js file that is called by 
// html which listens to actions on the client side and reacts...
// I like this method better...

class Sidebar extends React.Component {
    openNav = () => {
        document.getElementById("carenSidebar").style.width = "30vw";
        document.getElementById("carenSidebar").style.borderRight = "border-right: 5px solid #000"
        document.getElementById("main").style.marginLeft = "30vw";
    }

    closeNav = () => {
        document.getElementById("carenSidebar").style.width = "0px";
        document.getElementById("carenSidebar").style.borderRight = "border-right: 5px solid #000"
        document.getElementById("main").style.marginLeft = "0px";
    }

    openCard = () => {
        document.getElementById("cardContainer").style.visibility = "visible";
        this.closeNav()
    }

    //                     //
    // program entry point //
    //                     //
    render() {
        return (
            // main sidebar div container
            <div>
                {/* top row with open button and logo */}
                <div id="main">

                    {/* sidebar open button */}
                    <button className="openbtn" onClick={this.openNav}>☰</button>

                    {/* app logo */}
                    <a className="logo" href="#">Care'n</a>
                </div>

                {/* sidebar contents */}
                <div id="carenSidebar" className="sidebar">
                    <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>x</a>
                    <a id="aTag" href="#" onClick={this.openCard}>About</a>
                    <a id="aTag" href="#" onClick={this.openCard}>Services</a>
                    <a id="aTag" href="#" onClick={this.openCard}>Clients</a>
                    <a id="aTag" href="#" onClick={this.openCard}>Contact</a>
                </div>
            </div>
        )
    }
}

export default Sidebar;