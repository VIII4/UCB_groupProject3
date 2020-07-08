import React from "react";
import '../Card.css';

class AboutCard extends React.Component {

    render() {
        return (
            // this.props is coming from App.js --> Main.js --> Card.js
            <div id="aboutCardContent" className="textBlock cardInnards">

                <div className="headerContainer">
                    <h3 className="bold">{this.props.header}</h3>
                </div>

                <div>
                    <br></br>
                    <p><p className="bold">Report Issues</p>Care'n is a location based kickstarter for change. It allows residents to submit complaints to the city by physically going to the location of the issue and placing a pin on the dynamic map. Each submmision must include a photo and description of the issue in order for it to be accepted into the app’s database. Once accepted (an automated process), users have the ability to vote on the issue.</p>
                    <br></br>
                    <p><p className="bold">Engaged Voting</p>Care'n tracks users location realtime and presents local reported issues for the community to vote on. At the end of the month, the city or local government is obligated to address the top voted issue that month.</p>
                    <br></br>
                    <p><p className="bold">Community Prioritization</p>Care'n provides users with limited vote tokens thus creating a system where the issues that matter most to the community are magnified.</p>
                    <br></br>
                    <p><p className="bold">Civic Duty</p>Care'n is a direct, real-time conduit between city officials and their constituents. Each Issue can be tweeted to local officials social media platform, along with vote count, creating a level of awareness to be leveraged by the community.</p>
                </div>
            </div >
        )
    }
}

export default AboutCard;


