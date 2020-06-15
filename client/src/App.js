import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        {/* Put Nav Bar here Above Switch */}
        <Switch>
          {/* <Route exact path="/" component={??} />
          <Route exact path="/" component={??} />
          <Route exact path="/" component={??} />
          <Route component={NoMatch} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
