import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import Books from "./components/Books";
import Home from "./components/home"

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Home />
      </Fragment>
    );
  }
}

export default App;
