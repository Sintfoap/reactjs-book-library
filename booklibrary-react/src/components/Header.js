import React, { Component } from "react";
import {
  Navbar,
  NavLink,
  NavbarBrand
} from 'reactstrap';
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
        <Navbar bg="light" expand="lg">
          <NavbarBrand href="#home">BOOK LIBRARY</NavbarBrand>
          <NavLink href="#books">Books</NavLink>
          <NavLink href="#authors">Authors</NavLink>
          <NavLink href="#genres">Genres</NavLink>
          <NavLink href="#series">Series</NavLink>
        </Navbar>
      </div>
    );
  }
}

export default Header;