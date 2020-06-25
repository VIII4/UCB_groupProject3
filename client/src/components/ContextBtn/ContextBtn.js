import React from "react";
import './ContextBtn.css';

// NOTE
// events are (jquery?) usually a seperate js file that is called by 
// html which listens to actions on the client side and reacts...
// I like this method better...

class ContextBtn extends React.Component {
    openContacts = () => {
        document.getElementById("cardContainer").style.visibility = "visible";
    }

    //                     //
    // program entry point //
    //                     //
    render() {
        return (
            // main sidebar div container
            <div id="contextBtnContainer">
                {/* sidebar open button */}
                <button className="contextBtn" onClick={this.openContacts}>...</button>
            </div>
        )
    }
}

export default ContextBtn;