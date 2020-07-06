import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./pages/Main";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Loader from "./components/Loader";
import ContextBtn from "./components/ContextBtn";

// if data coming from db use state because this information will have to change

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  loading = (toggle) => {
    this.setState({ isLoading: toggle });
  };

  render() {
    return (
      <Router>
        <div>
          {this.state.isLoading && <Loader />}
          <Sidebar />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => <Main {...props} loading={this.loading} />}
            />
          </Switch>

          <ContextBtn />
        </div>
      </Router>
    );
  }
}

export default App;
