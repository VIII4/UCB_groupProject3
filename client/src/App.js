import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./pages/Main";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Loader from "./components/Loader";
import ContextBtn from "./components/ContextBtn";

// if data coming from db use state because this information will have to change

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Sidebar />
          {/* <Loader /> */}
          <Switch>
            <Route exact path="/" component={Main} />
          </Switch>

          <ContextBtn />
        </div>
      </Router>
    );
  }
}

export default App;
