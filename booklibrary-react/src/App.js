import React, { Component, Fragment } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/home"

class App extends Component {
  render() {
    return (
      <Fragment>
        <Router>
          <Header />
          <Switch>
            <Route path="/genres/detail">
            </Route>
            <Route path="/books">
              <Home current_page="books"/>
            </Route>
            <Route path="/authors">
              <Home current_page="authors"/>
            </Route>
            <Route path="/genres">
              <Home current_page="genres"/>
            </Route>
            <Route path="/series">
              <Home current_page="series"/>
            </Route>
            <Route path="/">
              <Home current_page="books"/>
            </Route>
          </Switch>
        </Router>
      </Fragment>
    );
  }
}

export default App;
