import React from "react";
import '../Card.css';

class AboutCard extends React.Component {

    render() {
        return (
            // this.props is coming from App.js --> Main.js --> Card.js
            <div id="aboutCardContent" className="textBlock cardInnards">
                <h4>{this.props.header}</h4>
                <hr></hr>
                <a id="aTag" href="#">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur vitae, asperiores inventore officia eius voluptates in veritatis facilis nulla dolorem aspernatur commodi est sunt velit laudantium debitis autem harum cum?

                Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus debitis consequuntur, officiis illo at qui repudiandae laudantium autem asperiores ex quaerat accusamus eum maiores magnam fugiat. Velit voluptas quas porro!</a>
            </div >
        )
    }
}

export default AboutCard;


