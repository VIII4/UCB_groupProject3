import React from "react";
import axios from "axios";
import '../Card.css';
import API from "../../../utils/API";

class ContactsCard extends React.Component {
    state = {
        govList: [],
        newGovObj: [],
        offices: [],
        officialNames: [],
        channels: [],
        phones: [],
        urls: []
    }

    GetGovData = (zipCode = 94523) => {
        // set api url
        const govUrl = `https://www.googleapis.com/civicinfo/v2/representatives?includeOffices=true&levels=administrativeArea1&key=AIzaSyAjJP4OylQOMoWdiaIOZoTkfm_WwLeeR7g&address=${zipCode}`;

        var tags = []

        // get data from selected  api
        axios.get(govUrl)
            .then(res => {
                this.setState({ govList: res.data });

                var arrayList = []
                for (var i = 0; i < 2; i++) {
                    var newGovObj = {};

                    newGovObj.office = res.data.offices[i].name;
                    newGovObj.name = res.data.officials[i].name;
                    newGovObj.phones = res.data.officials[i].phones;
                    newGovObj.urls = res.data.officials[i].urls;

                    arrayList.push(newGovObj)
                }
                this.setState({ newGovObj: arrayList });

            }).catch((err) => console.log(err));
    }

    // this will run on component/load first time...only first
    componentDidMount() {
        this.GetGovData();
    }

    render() {
        return (
            // this.props is coming from App.js --> Main.js --> Card.js
            <div id="contactsCardContent" className="textBlock cardInnards">

                <div className="headerContainer">
                    <h4>{this.props.header}</h4>
                </div>

                <ul>
                    {this.state.newGovObj.map((element) => {
                        return (
                            <li>
                                {element.office}
                            </li>
                        )
                    })}
                </ul>

            </div >
        )
    }
}


export default ContactsCard;




