import React from "react";
import './NavBar.css';

class LevelSideBar extends React.Component {
    openNav = () => {
        document.getElementById("carenSidebar").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
    }

    closeNav = () => {
        document.getElementById("carenSidebar").style.width = "0px";
        document.getElementById("main").style.marginLeft = "0px";
    }

    render() {
        return (
            <body>
                <div id="carenSidebar" className="sidebar">
                    <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>x</a>
                    <a href="#">About</a>
                    <a href="#">Services</a>
                    <a href="#">Clients</a>
                    <a href="#">Contact</a>
                </div>

                <div id="main">
                    <button className="openbtn" onClick={this.openNav}>☰</button>
                </div>
            </body>
        )
    }
}

export default LevelSideBar;