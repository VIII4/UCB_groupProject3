import React from "react";
import '../Card.css';

class AboutCard extends React.Component {

    render() {
        return (

            // LEARN TO USE STATE!!!

            // // this.props is coming from App.js --> Main.js --> Card.js
            // <div id="aboutCardContent" style={{ display: this.state.display }} className="textBlock cardInnards">
            //     <h4>{this.props.header}</h4>
            //     <hr></hr>
            //     <a id="aTag" href="#">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur vitae, asperiores inventore officia eius voluptates in veritatis facilis nulla dolorem aspernatur commodi est sunt velit laudantium debitis autem harum cum?

            //     Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus debitis consequuntur, officiis illo at qui repudiandae laudantium autem asperiores ex quaerat accusamus eum maiores magnam fugiat. Velit voluptas quas porro!</a>
            // </div >


            // this.props is coming from App.js --> Main.js --> Card.js
            <div id="aboutCardContent" className="textBlock cardInnards">

                <div className="headerContainer">
                    <h4>{this.props.header}</h4>
                </div>

                <div>
                    <br></br>
                    <p>Care'n is a location based kickstarter for change. It allows residents to submit complaints to the city by placing a pin of the issue on a map. Each resident must include a photo and description of the issue in order for it to be accepted into the app’s database.</p>
                    <br></br>
                    <p>Once it is accepted (an automated process), users of the app have the ability to vote on the issue. To submit a vote, they must physically go to the location of the complaint, at which point the app would recognize their location and allow them to cast a vote. At the end of the month, the city or local government is obligated to address the top voted issue that month.</p>
                    <br></br>
                    <p>By forcing the voter to physically go to the location of the issue, it validates the problem because a resident has taken the time out of their schedule to participate in the act of voting. Moreover, it encourages residents to walk through their neighborhood and engage in a civic dialogue with their neighbors.</p>
                    <br></br>
                    <p>Our app is provided to cities for a fee and it affords them a more direct, technology-based conduit to their constituents. We can further augment the cost and maintenance of the app by allowing local businesses to advertise on the platform and offer discounts to residents who submit complaints around their business.</p>
                </div>
            </div >
        )
    }
}

export default AboutCard;


