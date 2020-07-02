import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./pages/Main";
import './App.css';
import Sidebar from "./components/Sidebar";
import ContextBtn from "./components/ContextBtn"


class App extends React.Component {

  render() {
    return (
      <Router>
        <div>
          <Sidebar />

          <Switch>
            <Route exact path="/" component={Main} />
          </Switch>

          <ContextBtn />
        </div>
      </Router >
    );
  }
}



export default App;
