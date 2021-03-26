import "./App.css";
import React from "react";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import Map from "./Components/Map/Map";
import Registration from "./Components/Registration/Registration";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      /*<div>
      <Login />
      <Registration />
    </div>*/
      <Router>
        <div>
          {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/map">
              <Map />
            </Route>
            <Route path="/registration">
              <Registration />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
