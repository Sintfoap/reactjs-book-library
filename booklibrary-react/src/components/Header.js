import React, { Component } from "react";
import logo from './logo.png';

console.log(logo);

class Header extends Component {
  render() {
    return (
      <div className="text-center">
        <img
          src={logo} 
          alt="Logo"
        />
        <hr />
        <h1 className="Page_title"></h1>
      </div>
    );
  }
}

export default Header;