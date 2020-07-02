import React from "react";
import '../Card.css';

class SignUpCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <div id="signUpCardContent" className="cardInnards">
                <h4>{this.props.header}</h4>
                <hr></hr>
                <form onSubmit={this.handleSubmit}>
                    <label>First Name:
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <label>Last Name:
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <label>Email/Username:
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <label>Password:
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                    {/* already a member */}
                </form>
            </div>
        );
    }
}

export default SignUpCard;