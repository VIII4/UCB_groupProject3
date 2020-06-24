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

  //Get Current Location
  showCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState((prevState) => ({
          currentLocation: {
            ...prevState.currentLatLng,
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        }));
      });
    } else {
      //   (error) => console.log(error);
    }
  };

  //Track Location
  getUpdatedLocation = () => {
    if (navigator.geolocation) {
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
    } else {
      //   (error) => console.log(error);
    }
  };

  checkNearLocation = (checkPoint, distanceKm = 0.75) => {
    var ky = 40000 / 360;
    var kx = Math.cos((Math.PI * this.state.currentLocation.lat) / 180.0) * ky;
    var dx = Math.abs(this.state.currentLocation.lng - checkPoint.lng) * kx;
    var dy = Math.abs(this.state.currentLocation.lat - checkPoint.lat) * ky;
    return Math.sqrt(dx * dx + dy * dy) <= distanceKm;
  };

  //Get Local Issues .... Get All Issues from API -> Check if issue location is within radius -> Add issue to local issues
  getLocalIssues = () => {
    //TEST REMOVE
    let _localIssues = API.getIssues().filter((loc) =>
      this.checkNearLocation(loc, 5)
    );
    this.setState({ localIssues: _localIssues });
    // API.getIssues()
    //   .then((res) => {
    //     /* Filter array and return location if within radius */
    //     let _localIssues = res.filter((loc) => this.checkNearLocation(loc));
    //     this.setState({ localIssues: _localIssues });
    //   })
    //   .catch((err) => console.log(err));
  };

  //Life Cycle Events

  componentDidMount = () => {
    this.getUpdatedLocation();
  };

  //Load any additional libraries
  libraries = [];

  //Map Container Size
  containerStyle = {
    width: "100vw",
    height: "100vh",
  };

  //Starting Position ** WILL CHANGE TO STATE TO BE UPDATED REALTIME BY GEOLOCATION **
  center = {
    lat: 37.804363,
    lng: -122.271111,
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

  render() {
    return (
      <LoadScript googleMapsApiKey={API_KEY}>
        <GoogleMap
          google={this.props.google}
          mapContainerStyle={this.containerStyle}
          center={this.state.currentLocation}
          zoom={15}
          options={this.options}
          onClick={this.getLocalIssues}
        >
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
          {/* Child components, such as markers, info windows, etc. */}
        </GoogleMap>
      </LoadScript>
    );
  }
}

export default Map;
