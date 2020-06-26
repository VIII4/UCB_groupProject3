/*global google*/
import React, { Component } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  OverlayView,
} from "@react-google-maps/api";
import mapStyles from "../../utils/mapStyles";
import API from "../../utils/API";
import IssuesPanel from "../IssuePanel";

const API_KEY = `${process.env.REACT_APP_GOOGLE_KEY}`;

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: {
        lat: 37.804363,
        lng: -122.271111,
      },
      localIssues: [],
    };
  }

  loadIssueSequenceID; //TO DO: add clear interval method
  loadIssueIntervalTime = 10; //in Secs

  //#region Location Methods

  //Track Location
  getUpdatedLocation = () => {
    if (navigator.geolocation) {
      //Start Tracking Location and update state when changed
      navigator.geolocation.watchPosition(
        (position) => {
          this.setState((prevState) => ({
            currentLocation: {
              ...prevState.currentLatLng,
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          }));
        },
        (error) => console.log(error)
      );
      //Check for Local issues
      this.getLocalIssues(this.state.currentLocation);
      //start interval sequence to check for local issues
      this.loadIssueSequenceID = setInterval(() => {
        this.getLocalIssues(this.state.currentLocation);
      }, this.loadIssueIntervalTime * 1000);
    } else {
      //   (error) => console.log(error);
    }
  };

  checkNearLocation = (checkPoint, currentLocation, distanceKm = 8) => {
    var ky = 40000 / 360;
    var kx = Math.cos((Math.PI * currentLocation.lat) / 180.0) * ky;
    var dx = Math.abs(currentLocation.lng - checkPoint.lng) * kx;
    var dy = Math.abs(currentLocation.lat - checkPoint.lat) * ky;
    return Math.sqrt(dx * dx + dy * dy) <= distanceKm;
  };
  //#endregion

  //#region Map Options and Styling
  //Load any additional libraries
  libraries = [];

  //Map Container Size
  containerStyle = {
    width: "100vw",
    height: "105vh",
    zIndex: 1,

    // this is critical for full screen
    position: "absolute",
  };

  //Options
  options = {
    disableDefaultUI: true,
    styles: mapStyles.wy,
    zoomControl: true,
  };

  //

  //Icons **WILL ADD DIFF ICONS FOR ISSUES**
  icons = {
    marker: {
      url: "/images/marker.png",
      origin: { x: 0, y: 0 },
      anchor: { x: 30, y: 50 },
      scaledSize: { width: 75, height: 75 },
    },
  };
  //#endregion

  //Get Local Issues .... Get All Issues from API -> Check if issue location is within radius -> Add issue to local issues
  getLocalIssues = (currentLocation) => {
    API.getIssues()
      .then((res) => {
        /* Filter issues array and return array with issues within radius */
        let _localIssues = res.data.filter((issue) => {
          let issueLocation = { lat: issue.lat, lng: issue.lng };
          return this.checkNearLocation(
            issueLocation,
            this.state.currentLocation
          );
        });
        console.log(_localIssues);
        this.setState({ localIssues: _localIssues });
      })
      .catch((err) => console.log(err));
  };

  //Life Cycle Events
  componentDidMount = () => {
    this.getUpdatedLocation();
  };

  render() {
    return (
      <LoadScript googleMapsApiKey={API_KEY}>
        <GoogleMap
          google={this.props.google}
          mapContainerStyle={this.containerStyle}
          center={this.state.currentLocation}
          zoom={15}
          options={this.options}
        >
          {/* Map through local issues and create marker */}
          <OverlayView
            position={this.state.currentLocation}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <IssuesPanel></IssuesPanel>
          </OverlayView>
          <Marker
            position={this.state.currentLocation}
            icon={this.icons.marker}
          ></Marker>
        </GoogleMap>
      </LoadScript>
    );
  }
}

export default Map;
