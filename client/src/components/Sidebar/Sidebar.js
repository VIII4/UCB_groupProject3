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

    render() {
        return (
            <div>
                <div id="carenSidebar" className="sidebar">
                    <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>x</a>
                    <a id="aTag" href="#">About</a>
                    <a id="aTag" href="#">Services</a>
                    <a id="aTag" href="#">Clients</a>
                    <a id="aTag" ßhref="#">Contact</a>
                </div>

                <div id="main">
                    <button className="openbtn" onClick={this.openNav}>☰</button>

                    {/* logo */}
                    <a className="logo" href="#">Care'n</a>
                </div>
            </div>
        )
    }
}

export default Sidebar;