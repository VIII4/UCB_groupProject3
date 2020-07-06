import axios from "axios";
import React from 'react';

///import where zipCode' is coming from??????


export default class GovList extends React.Component {
  state = {
    govList: [],
    newGovObj: {}
  }

  // componentDidMount() is a req. method...allows state to register chanage
  componentDidMount() {
    // set api url
    const govUrl = 'https://www.googleapis.com/civicinfo/v2/representatives?includeOffices=true&levels=administrativeArea1&key=AIzaSyAjJP4OylQOMoWdiaIOZoTkfm_WwLeeR7g&address=94523';


    console.log("this is being hit");

    // get data from selected  api
    axios.get(govUrl)
      .then(res => {
        this.setState({ govList: res.data });
        var newGovObj = {};
        var i = 0;
        while (i < 2) {
          newGovObj.office = res.data.offices[i].name;
          newGovObj.name = res.data.officials[i].name;
          newGovObj.phones = res.data.officials[i].phones;
          newGovObj.urls = res.data.officials[i].urls;
          i++
        }
        console.log(newGovObj);
      })
  }
}









