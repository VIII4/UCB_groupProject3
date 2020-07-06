import React, { useState, Component } from "react";
import { OverlayView } from "@react-google-maps/api";
import IssuesPanel from "../IssuePanel";
import ConfirmPanel from "../ConfirmPanel";
import "./style.css";

export default class ReportPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeSelected: null,
      showingConfirmPanel: false,
    };
  }

  onReportTypeClick = (type) => {
    //TO DO: Open Confirm Panel with input, image upload,
    this.setState({ typeSelected: type, showingConfirmPanel: true });
  };

  render() {
    const { currentLocation, submitIssueReport } = this.props;
    return (
      <OverlayView
        position={currentLocation}
        mapPaneName={OverlayView.FLOAT_PANE}
      >
        <>
          {!this.state.showingConfirmPanel && (
            <IssuesPanel
              onReportIssueClick={this.onReportTypeClick}
              submitIssueReport={submitIssueReport}
            />
          )}

          {this.state.showingConfirmPanel && (
            <ConfirmPanel
              submitIssueReport={submitIssueReport}
              typeSelected={this.state.typeSelected}
            />
          )}
        </>
      </OverlayView>
    );
  }
}

// {this.state.showingReportPanel && (
//             <OverlayView
//               position={currentLocation}
//               mapPaneName={OverlayView.FLOAT_PANE}
//             >
//               {/* Use a function to return element from switch */}
//               <IssuesPanel
//                 onReportIssueClick={onReportIssueClick}
//                 // Testing
//                 submitIssueReport={submitIssueReport}
//               />
//             </OverlayView>
//           )}
//           {/* Enable reporting additional details/confirm panel, need to add type as prop*/}
//           {this.state.showingReportPanel && this.state.showingConfirmPanel && (
//             <OverlayView
//               position={currentLocation}
//               mapPaneName={OverlayView.FLOAT_PANE}
//             >
//               <ConfirmPanel submitIssueReport={submitIssueReport} />
//             </OverlayView>
//           )}
