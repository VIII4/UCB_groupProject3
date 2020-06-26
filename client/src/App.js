import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./pages/Main";
import './App.css';
import Sidebar from "./components/Sidebar";
import ContextBtn from "./components/ContextBtn"


class App extends React.Component {

  // state controls the appearance of components on screen
  // rather than a new html being rendered every time...
  constructor() {
    // these contain common properties that can apply to 
    // several components???
    this.state = {
      visible: true,
      ghosted: false
    }
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

            {/* Main is a prop being passed... */}
            <Route exact path="/" component={Main} />
            {/* <Route exact path="/" component={??} /> */}
          </Switch>

          <ContextBtn />
        </div>
      </Router >
    );
  }
}



export default App;
