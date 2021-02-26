import React, { Component } from "react";
import {
  Navbar,
  NavLink,
  // NavbarBrand
} from 'reactstrap';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import logo from './logo.png';
console.log(logo);

export default function App() {
  return (
    // <Router>
      <div className="text-center">
        <img
          src={ logo }
          alt="Logo"
        />
        <Navbar bg="light" expand="lg">
          {/* <NavLink>
            <Link to="/books">Books</Link>
          </NavLink>
          <NavLink>
            <Link to="/authors">Authors</Link>
          </NavLink>
          <NavLink>
            <Link to="/genres">Genres</Link>
          </NavLink>
          <NavLink>
            <Link to="/series">Series</Link>
          </NavLink> */}
          <Link to="/books">Books
          </Link>
          <Link to="/authors">Authors
          </Link>
          <Link to="/genres">Genres
          </Link>
          <Link to="/series">Series
          </Link>
        </Navbar>
      </div>
    // </Router>
  );
}