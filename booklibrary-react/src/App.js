import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import RENAME from "./components/RENAME";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <RENAME />
      </Fragment>
    );
  }
}

export default App;
