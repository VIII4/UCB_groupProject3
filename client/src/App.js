import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./pages/Main";
import './App.css';
import Sidebar from "./components/Sidebar";
import RefreshBtn from "./components/RefreshBtn"
import ContextBtn from "./components/ContextBtn"

// if data coming from db use state because this information will have to change

class App extends React.Component {

  render() {
    return (
      <Router>
        <div>
          <Sidebar />

          <Switch>
            <Route exact path="/" component={Main} />
          </Switch>

          <RefreshBtn />
          <ContextBtn />
        </div>
      </Router >
    );
  }
}



export default App;
