import React from "react";
import './Loginform.css';



class Loginform extends React.Component {


    render() {
        return (
            <form>
                <label>
                    User:
                    <input type="text" name="user" />
                </label>
                <label>
                    Password:
                    <input type="text" name="password" />
                </label>
            </form>
        )
    }
}

export default Loginform;