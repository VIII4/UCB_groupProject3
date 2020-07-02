import React from "react";
import './RefreshBtn.css';

// NOTE
// events are (jquery?) usually a seperate js file that is called by 
// html which listens to actions on the client side and reacts...
// I like this method better...

class RefreshBtn extends React.Component {
    constructor(props) {
        super(props);
        this.state = { bool: false };
    }

    DoSomething = () => {
        console.log("Event Triggered");
    }

    //                     //
    // program entry point //
    //                     //
    render() {
        return (
            // main sidebar div container
            <div id="refreshBtnContainer">
                {/* sidebar open button */}
                <button className="refreshBtn" onClick={this.DoSomething}>
                    <i className="fa fa-refresh"></i>
                </button>
            </div>
        )
    }
}

export default RefreshBtn;