import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <Router>
      <div>
        <Sidebar />

        <Switch>
          {/* <Route exact path="/" component={??} />
          <Route exact path="/" component={??} />
          <Route exact path="/" component={??} />
          <Route component={NoMatch} /> */}
        </Switch>
      </div>
    </Router >
  );
}

export default App;
