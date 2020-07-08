import React, {useContext} from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../../context"
import Axios from "axios";

class SignUpCard extends React.Component {
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
        if (type == "logIn") {
            document.getElementById("logInCardContent").style.display = "block";
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
        
        event.preventDefault();
        alert('A name was submitted: ' + this.state.value);
        const newUser = this.state.value
        const registerRes = await Axios.post(
            "/users/add" , 
            newUser
        )
        const loginRes = await Axios.post(

            "/users/login",
            email,
            password,
        )
        setUserData({
            token: loginRes.data.token , 
            user: loginRes.data.user
        })
        localStorage.setItem("auth-token" , loginRes.data.token) ;
        history.pushState("/")
    
    }


    
        
    render() {
        return (
            <div id="signUpCardContent" className="cardInnards">

                <div className="headerContainer">
                    <h3 className="bold">{this.props.header}</h3>
                </div>

                <div>
                    <form onSubmit={this.handleSubmit}>
                        <div id="logInFieldsContainer">
                            <label>First Name:
                            <input type="text" value={this.state.value} onChange={this.handleChange} />
                            </label>
                        </div>

                        <div id="logInFieldsContainer">
                            <label>Last Name:
                            <input type="text" value={this.state.value} onChange={this.handleChange} />
                            </label>
                        </div>
                        <div id="logInFieldsContainer">
                            <label htmlFor="register-email">Email/Username:
                            <input type="email" value={this.state.value} onChange={this.handleChange} />
                            </label>
                        </div>

                        <div id="logInFieldsContainer">
                            <label htmlFor="register-password">Password:
                            <input type="password" value={this.state.value} onChange={this.handleChange} />
                            </label>
                        </div>

                        <div id="logInFieldsContainer">
                            <input type="submit" value="Submit" />
                        </div>

                        <div id="logInFieldsContainer">
                            <p>Already a member?<br></br><a onClick={(event) => { this.OpenCard(event, "logIn") }}>Log In</a></p>
                        </div>

                    </form>
                </div>
            </div >
        );
    }
}

export default SignUpCard;