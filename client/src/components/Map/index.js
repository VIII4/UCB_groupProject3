import React, { Component } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  OverlayView,
  InfoWindow,
} from "@react-google-maps/api";
import mapStyles from "../../utils/mapStyles";
import API from "../../utils/API";
import IssuesPanel from "../IssuePanel";
import IssuesPopUp from "../IssuePopUp";

const API_KEY = `${process.env.REACT_APP_GOOGLE_KEY}`;

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //Receive userdata info from props and store to state

      //Location Info
      currentLocation: {
        lat: 37.804363,
        lng: -122.271111,
      },
      //Local Issue to render to map
      localIssues: [],
      selectedIssue: null,

      showingReportPanel: false,
      reportingType: "",
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
      // TO DO: EXTRACT so we can clear interval before starting new one, specifically for manual refresh
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
    // this will either be "visible" or "hidden"
    visibility: "visible",

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

  //Marker Icons
  icons = {
    marker: {
      url: `${process.env.PUBLIC_URL}/assets/images/markerA.png`,
      origin: { x: 0, y: 0 },
      anchor: { x: 30, y: 50 },
      scaledSize: { width: 75, height: 75 },
    },
    markerA: {
      url: `${process.env.PUBLIC_URL}/assets/images/markerB.png`,
      origin: { x: 0, y: 0 },
      anchor: { x: 16, y: -1 },
      scaledSize: { width: 35, height: 35 },
    },
    markerB: {
      url: `${process.env.PUBLIC_URL}/assets/images/markerC.png`,
      origin: { x: 0, y: 0 },
      anchor: { x: 30, y: 50 },
      scaledSize: { width: 45, height: 45 },
    },
  };
  //#endregion

  //#region Handler Methods

  onIssueMarkerClick = (issue) => {
    this.setState({ selectedIssue: issue });
    this.setState({ showingReportPanel: false });
  };

  closeInfoWindow = () => {
    this.setState({ selectedIssue: null });
  };

  closePanelWindow = () => {
    this.setState({ showingReportPanel: false });
  };

  onUserMarkerClick = (event) => {
    let toogle = !this.state.showingReportPanel;
    this.setState({ showingReportPanel: toogle });
    this.setState({ selectedIssue: null });
  };

  onVoteClick = () => {
    //TO DO: Check user vote count first

    API.getSingleIssue(this.state.selectedIssue._id).then((res) => {
      //TO DO: Check if user id exist in table
      let newVoteCount = res.data.voteCount + 1;

      API.updateIssue(res.data._id, { voteCount: newVoteCount })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    });
  };

  onReportIssueClick = (type) => {
    //TO DO: Open Confirm Panel with input, image upload,

    let data = {
      category: type,
      descr: "New issue added",
      voteCount: 1,
      zipcode: 99999,
      status: "Voting",
    };

    API.createIssue(data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  onManualRefreshClick = () => {
    this.getLocalIssues();
  };

  onResolveClick = () => {
    /* 
      To DO: Resolve Issue button logic
      when resolve clicked: 
          -> check if status is pending resolve? ! -> update status to pending resolve
          -> increment resolve counter (NEED TO ADD TO SCHEMA)
          -> check if resolve count meets resolved criteria? 
              -> update status to closed    
    */
    API.getSingleIssue(this.state.selectedIssue._id).then((res) => {
      let issue = res.data;
      let data = {
        resolvecount: issue.resolvecount ? issue.resolvecount + 1 : 1,
        //increment resolve counter
        status: issue.status,
      };
      if (
        issue.status === "Pending" &&
        data.resolvecount >= 5 /* TO DO: define what the max count should be */
      )
        data.status = "Closed";
      else data.status = "Pending";

      API.updateIssue(issue._id, data)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    });
  };

  //#endregion

  //#region Helper Methods

  //Get all Issues then filter local issues to state
  getLocalIssues = () => {
    API.getIssues()
      .then((res) => {
        /* Filter issues array and return array with issues within radius */
        let _localIssues = res.data.filter((issue) => {
          let issueLocation = {
            lat: issue.latlng.lat,
            lng: issue.latlng.lng,
          };
          return this.checkNearLocation(
            issueLocation,
            this.state.currentLocation
          );
        });
        //console.log(_localIssues);
        this.setState({ localIssues: _localIssues });
      })
      .catch((err) => console.log(err));
  };

  //#endregion

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
          onClick={this.closeInfoWindow}
        >
          {/* Set Home Marker for User Location */}
          <Marker
            position={this.state.currentLocation}
            icon={this.icons.markerB}
            onClick={this.onUserMarkerClick}
          ></Marker>
          {/* Map through local issues and create marker for each*/}
          {this.state.localIssues.map((issue, index) => {
            if (issue.status !== "Closed") {
              return (
                <Marker
                  key={index}
                  position={{
                    lat: issue.latlng.lat,
                    lng: issue.latlng.lng,
                  }}
                  icon={this.icons.markerA}
                  clickable={true}
                  onClick={() => {
                    this.onIssueMarkerClick(issue);
                  }}
                />
              );
            }
          })}
          {/* Enable Info pop up for issue marker */}
          {this.state.selectedIssue && (
            <InfoWindow
              onCloseClick={this.closeInfoWindow}
              position={{
                lat: this.state.selectedIssue.latlng.lat,
                lng: this.state.selectedIssue.latlng.lng,
              }}
            >
              <IssuesPopUp
                selectedIssue={this.state.selectedIssue}
                onVoteClick={this.onVoteClick}
                onResolveClick={this.onResolveClick}
              />
            </InfoWindow>
          )}
          {/* Enable Report Issue pop up panel */}
          {this.state.showingReportPanel && (
            <OverlayView
              position={this.state.currentLocation}
              mapPaneName={OverlayView.FLOAT_PANE}
            >
              <IssuesPanel
                onReportIssueClick={this.onReportIssueClick}
              ></IssuesPanel>
            </OverlayView>
          )}
        </GoogleMap>
      </LoadScript>
    );
  }
}

export default Map;
