import React from "react";
import './ContactsSidebar.css';

// NOTE
// events are (jquery?) usually a seperate js file that is called by 
// html which listens to actions on the client side and reacts...
// I like this method better...

class ContactsSidebar extends React.Component {
    openNav = () => {
        document.getElementById("contactsSidebar").style.width = "30vw";
        document.getElementById("contactsSidebar").style.borderRight = "border-right: 5px solid #000"
        document.getElementById("main2").style.marginLeft = "30vw";
    }

    closeNav = () => {
        document.getElementById("contactsSidebar").style.width = "0px";
        document.getElementById("contactsSidebar").style.borderRight = "border-right: 5px solid #000"
        document.getElementById("main2").style.marginLeft = "0px";
    }

    render() {
        return (
            <div>
                <div id="contactsSidebar" className="sidebar2">
                    <a href="javascript:void(0)" className="closebtn2" onClick={this.closeNav}>x</a>
                    <a href="#">Police</a>
                    <a href="#">Fire</a>
                    <a href="#">Hospital</a>
                    <a href="#">Alderman's Office</a>
                </div>

                <div id="main2">
                    <button className="openbtn2" onClick={this.openNav}>☰</button>
                </div>
            </div>
        )
    }
}

export default ContactsSidebar;