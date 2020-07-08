import React from "react";
import Map from "../components/Map";
import Card from "../components/Card";
import RefreshBtn from "../components/RefreshBtn";
import API from "../utils/API";

class Main extends React.Component {
  //Local refresh interval method ref
  loadIssueSequenceID; //TO DO: add clear interval method
  // Interval Timer
  loadIssueIntervalTime = 25; //in secs
  loading = this.props.loading;
  constructor(props) {
    super(props);

    this.state = {
      //TO DO: Receive userdata info from props and store to state

      //Current Location
      zipCode: "",
      currentLocation: {
        lat: 37.804363,
        lng: -122.271111,
      },

      //Current User Logged in
      //

      //Local Govt Contacts Info
      localGovt: [],
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
          API.getZipcode(this.state.currentLocation)
            .then((res) => {
              let zipCode = res.data.results[0].address_components.find(
                (component) => {
                  if (component.types.includes("postal_code")) return component;
                }
              ).long_name;
              this.setState({ zipCode: zipCode });
            })
            .then(() => {
              this.getLocalGovt();
            });
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

  getLocalIssues = () => {
    this.loading(true);
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
        this.props.loading(false);
      })
      .catch((err) => console.log(err));
  };

  getLocalGovt = () => {
    API.getGovContacts(this.state.zipCode).then((res) => {
      let localGovt = [];
      for (var i = 0; i < res.data.officials.length; i++) {
        // create an empty object and populate with data
        let newGovObj = {};
        newGovObj.office = res.data.offices[i].name
          ? res.data.offices[i].name
          : "Info not available";
        newGovObj.name = res.data.officials[i].name
          ? res.data.officials[i].name
          : "Info not available";
        newGovObj.phones = res.data.officials[i].phones
          ? res.data.officials[i].phones
          : "Phone number not available";
        newGovObj.twitter = res.data.officials[i].channels
          ? res.data.officials[i].channels[0].id
          : "Twitter not available";
        newGovObj.urls = res.data.officials[i].urls
          ? res.data.officials[i].urls
          : "Info not available";

        // append newGovObj to arrayList
        localGovt.push(newGovObj);
      }
      // set current state
      this.setState({ localGovt: localGovt });
    });
  };
  //#endregion

  //#region Handler Methods
  onManualRefreshClick = () => {
    this.getLocalIssues();
    console.log("manual refresh");
  };

  setSelectedIssue = (issue) => {
    this.setState({ selectedIssue: issue });
  };

  onVoteClick = () => {
    // TESTING - with manual user id entrance, will need to get this from cookies or State
    let userId = "5f062cbf563f3d2d184330ab";
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

  submitIssueReport = (data, formdata) => {
    this.loading(true);
    // Upload images first, recieve urls then add to data base, need a loading screen
    API.uploadImages(formdata)
      .then((res) => {
        console.log(res);
        // Compile data with images then add to DB
        data.createdby = "testUser";
        data.votecount = 1;
        data.status = "Voting";
        data.zipcode = 94602;
        data.date = Date();
        data.votedby = ["testUserID"];
        data.latlng = this.state.currentLocation;
        data.images = res.data;

        //Send Api request to create issue in database
        API.createIssue(data)
          .then((res) => {
            console.log(res);
            this.loading(false);
          })
          .catch((err) => console.log(err));

        alert("Issue has been submitted");
      })
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

  // =================== //
  // PROGRAM ENTRY POINT //
  // =================== //
  render() {
    const {
      currentLocation,
      localIssues,
      selectedIssue,
      zipCode,
      localGovt,
    } = this.state;

    return (
      <div>
        {/* visibility can be set in css,but for 
            clarity it is done here instead */}
        <RefreshBtn onManualRefreshClick={this.onManualRefreshClick} />
        <Card
          zipCode={zipCode}
          localGovt={localGovt}
          localIssues={localIssues}
          selectedIssue={selectedIssue}
          setSelectedIssue={this.setSelectedIssue}
          onVoteClick={this.onVoteClick}
          visibility="hidden"
        />
        <Map
          localGovt={localGovt}
          currentLocation={currentLocation}
          localIssues={localIssues}
          selectedIssue={selectedIssue}
          setSelectedIssue={this.setSelectedIssue}
          onVoteClick={this.onVoteClick}
          onReportIssueClick={this.onReportIssueClick}
          onResolveClick={this.onReportIssueClick}
          submitIssueReport={this.submitIssueReport}
        />
      </div>
    );
  }
}

export default Main;
