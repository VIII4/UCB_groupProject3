import React from "react";
import '../Card.css';

class LoginCard extends React.Component {
    SubmitForm = () => {
        document.getElementById("loginForm").submit();
    }
    ResetForm = () => {
        document.getElementById("loginForm").reset();
    }

    render() {
        return (
            // this.props is coming from App.js --> Main.js --> Card.js
            <div id="loginCardContent" className="textBlock cardInnards">
                <h4>{this.props.header}</h4>
                <hr></hr>
                <p>Enter names in the fields, then click "Submit" to submit the form:</p>

                {/* <form id="loginForm" action="/action_page.php">
                    First name: <input type="text" name="fname"></input><br>
                        Last name: <input type="text" name="lname"><br><br>
                            <input type="button" onclick={this.SubmitForm} value="Submit"></input>
                </form> */}

            </div >
        )
    }
}

export default LoginCard;