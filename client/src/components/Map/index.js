import React, { Component } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import mapStyles from "../../utils/mapStyles";
import API from "../../utils/API";

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
    height: "105vh",
    zIndex: 1,

    // this is critical for full screen
    position: "absolute"
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
  };

  //Icons **WILL ADD DIFF ICONS FOR ISSUES**
  icons = {};

  render() {
    return (
      <div className="mapUnderlay">
        <LoadScript googleMapsApiKey={API_KEY}>
          <GoogleMap
            mapContainerStyle={this.containerStyle}
            center={this.state.currentLocation}
            zoom={15}
            options={this.options}
            onClick={this.getLocalIssues}
          >
            <Marker position={this.state.currentLocation}></Marker>
            {/* Child components, such as markers, info windows, etc. */}
            <></>
          </GoogleMap>
        </LoadScript>
      </div>
    );
  }
}

export default Map;
