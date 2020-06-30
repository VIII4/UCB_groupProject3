import React from "react";
import Map from "../components/Map";
import Card from "../components/Card";
import API from "../utils/API";

class Main extends React.Component {
  //Local refresh interval method ref
  loadIssueSequenceID; //TO DO: add clear interval method
  // Interval Timer
  loadIssueIntervalTime = 10; //in secs

  constructor(props) {
    super(props);

    this.state = {
      //TO DO: Receive userdata info from props and store to state

      //Current Location
      currentLocation: {
        lat: 37.804363,
        lng: -122.271111,
      },

      //Local Issue to render to map
      localIssues: [],
      // Current Issue Selected
      selectedIssue: null,
    };
  }

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

  getLocalIssues = () => {
    API.getIssues()
      .then((res) => {
        /* Filter issues array and return array with issues within radius */
        let _localIssues = res.data.filter((issue) => {
          if (issue.status !== "Closed") {
            let issueLocation = {
              lat: issue.latlng.lat,
              lng: issue.latlng.lng,
            };
            return this.checkNearLocation(
              issueLocation,
              this.state.currentLocation
            );
          }
        });
        //console.log(_localIssues);
        this.setState({ localIssues: _localIssues });
      })
      .catch((err) => console.log(err));
  };
  //#endregion

  //#region Handler Methods
  onManualRefreshClick = () => {
    this.getLocalIssues();
  };

  setSelectedIssue = (issue) => {
    this.setState({ selectedIssue: issue });
  };

  onVoteClick = () => {
    // TESTING - with manual user id entrance, will need to get this from cookies or State
    let userId = "5efa889fd5ac5361e0bbd371";
    API.getUser(userId).then((res) => {
      let userData = res.data;
      API.getSingleIssue(this.state.selectedIssue._id).then((res) => {
        let issueData = res.data;
        if (
          issueData.votedby.includes(userId) ||
          userData.remainingvotes <= 0
        ) {
          alert("Already voted or no vote balance");
          return;
        } else {
          let updateVotedBy = issueData.votedby;
          let newVoteCount = res.data.voteCount + 1;

          updateVotedBy.push(userId);

          API.updateIssue(res.data._id, {
            voteCount: newVoteCount,
            votedby: updateVotedBy,
          })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        }
      });
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
      latlng: {
        lat: this.state.currentLocation.lat,
        lng: this.state.currentLocation.lng,
      },
    };

    API.createIssue(data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  onResolveClick = () => {
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

  //Life Cycle Events
  componentDidMount = () => {
    this.getUpdatedLocation();
  };

  render() {
    const { currentLocation, localIssues, selectedIssue } = this.state;

    return (
      <div>
        {/* visibility can be set in css,but for 
            clarity it is done here instead */}
        <Card localIssues={localIssues} visibility="hidden" />
        <Map
          currentLocation={currentLocation}
          localIssues={localIssues}
          selectedIssue={selectedIssue}
          setSelectedIssue={this.setSelectedIssue}
          onVoteClick={this.onVoteClick}
          onReportIssueClick={this.onReportIssueClick}
          onResolveClick={this.onReportIssueClick}
        />
      </div>
    );
  }
}

export default Main;
