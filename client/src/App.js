import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Test from "./pages/Test";
import './App.css';
import Sidebar from "./components/Sidebar";
import ContactsSidebar from "./components/ContactsSidebar";

class App extends Component {

  // state controls the appearance of components on screen
  // rather than a new html being rendered
  state = {
    visible: true,
    ghosted: false
  }

  // events handled within class
  HideElements = event => {

  }

  render() {
    return (
      <Router>
        <div>
          {/* Put Nav Bar here Above Switch */}
          <Sidebar />

          <Switch>
            <Route exact path="/" component={Test} />
            {/* <Route exact path="/" component={??} />
            <Route exact path="/" component={??} />
            <Route exact path="/" component={??} />
            <Route component={NoMatch} /> */}
          </Switch>
          <ContactsSidebar />
        </div>
      </Router >
    );
  }
}



export default App;
