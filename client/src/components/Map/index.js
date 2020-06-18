import React, { Component } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import mapStyles from "../../utils/mapStyles";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: {
        lat: 37.804363,
        lng: -122.271111,
      },
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
  };

  //Icons **WILL ADD DUF ICONS FOR ISSUES**
  icons = {};

  render() {
    return (
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_KEY}>
        <GoogleMap
          mapContainerStyle={this.containerStyle}
          center={this.state.currentLocation}
          zoom={15}
          options={this.options}
        >
          <Marker position={this.state.currentLocation}></Marker>
          {/* Child components, such as markers, info windows, etc. */}
          <></>
        </GoogleMap>
      </LoadScript>
    );
  }
}

export default Map;
