import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Test from "./pages/Test";
import './App.css';
import Sidebar from "./components/Sidebar";


class App extends React.Component {

  // state controls the appearance of components on screen
  // rather than a new html being rendered every time...
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
          <Sidebar />

          <Switch>

            {/* these routes will specify which components are returned
             <Sidebar /> being outside of <Switch> ensures it will
             always be visible regardless of the route rendered */}

            <Route exact path="/" component={Test} />
            {/* <Route exact path="/" component={??} />
            <Route exact path="/" component={??} />
            <Route exact path="/" component={??} />
            <Route component={NoMatch} /> */}
          </Switch>
        </div>
      </Router >
    );
  }
}



export default App;
