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
import ConfirmPanel from "../ConfirmPanel";
import IssuesPopUp from "../IssuePopUp";

const API_KEY = `${process.env.REACT_APP_GOOGLE_KEY}`;

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,

      showingReportPanel: false,
      showingConfirmPanel: true,
      reportingType: "",
    };
  }

  //#region Map Options and Styling
  //Load any additional libraries
  libraries = [];

  //Map Container Size
  containerStyle = {
    // this will either be "visible" or "hidden"
    visibility: "visible",

    width: "100vw",
    height: "100vh",
    maxWidth: "100%",
    zIndex: 1,

    // this is critical for full screen
    position: "absolute",
  };

  //Options
  options = {
    disableDefaultUI: true,
    styles: mapStyles.mostlyGrayScale,
    clickableIcons: false,
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
    this.props.setSelectedIssue(issue);
    this.setState({ showingReportPanel: false });
  };

  closeInfoWindow = () => {
    this.props.setSelectedIssue(null);
  };

  closePanelWindow = () => {
    this.setState({ showingReportPanel: false });
  };

  onUserMarkerClick = (event) => {
    let toogle = !this.state.showingReportPanel;
    this.setState({ showingReportPanel: toogle });
    this.props.setSelectedIssue(null);
  };

  //#endregion

  render() {
    const {
      currentLocation,
      localIssues,
      selectedIssue,
      setSelectedIssue,
      onVoteClick,
      onReportIssueClick,
      onResolveClick,
      submitIssueReport,
    } = this.props;

    return (
      <LoadScript googleMapsApiKey={API_KEY}>
        <GoogleMap
          google={this.props.google}
          mapContainerStyle={this.containerStyle}
          center={currentLocation}
          zoom={15}
          options={this.options}
          onClick={this.closeInfoWindow}
        >
          {/* Set Home Marker for User Location */}
          <Marker
            position={currentLocation}
            icon={this.icons.markerB}
            onClick={this.onUserMarkerClick}
          ></Marker>
          {/* Map through local issues and create marker for each*/}
          {localIssues.map((issue, index) => {
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
          {selectedIssue && (
            <InfoWindow
              onCloseClick={this.closeInfoWindow}
              position={{
                lat: selectedIssue.latlng.lat,
                lng: selectedIssue.latlng.lng,
              }}
            >
              <IssuesPopUp
                selectedIssue={selectedIssue}
                onVoteClick={onVoteClick}
                onResolveClick={onResolveClick}
              />
            </InfoWindow>
          )}
          {/* Enable report issue pop up panel */}
          {this.state.showingReportPanel && (
            <OverlayView
              position={currentLocation}
              mapPaneName={OverlayView.FLOAT_PANE}
            >
              {/* Use a function to return element from switch */}
              <IssuesPanel
                onReportIssueClick={onReportIssueClick}
                // Testing
                submitIssueReport={submitIssueReport}
              />
            </OverlayView>
          )}
          {/* Enable reporting additional details/confirm panel, need to add type as prop*/}
          {this.state.showingReportPanel && this.state.showingConfirmPanel && (
            <OverlayView
              position={currentLocation}
              mapPaneName={OverlayView.FLOAT_PANE}
            >
              <ConfirmPanel submitIssueReport={submitIssueReport} />
            </OverlayView>
          )}
        </GoogleMap>
      </LoadScript>
    );
  }
}

export default Map;
