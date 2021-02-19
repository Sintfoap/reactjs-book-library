import React, { Component } from "react";
import {
  Navbar,
  NavLink,
  // NavbarBrand
} from 'reactstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import logo from './logo.png';
console.log(logo);

export default function App() {
  return (
    <Router>
      <div className="text-center">
        <img
          src={ logo }
          alt="Logo"
        />
        <Navbar bg="light" expand="lg">
          <NavLink>
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
          </NavLink>
        </Navbar>
        <Switch>
          <Route path="/books">
            <Book_header />
          </Route>
          <Route path="/authors">
            <Author_header />
          </Route>
          <Route path="/genres">
            <Genre_header />
          </Route>
          <Route path="/series">
            <Series_header />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Book_header() {
  return <h2>Books</h2>
}

function Author_header() {
  return <h2>Authors</h2>
}

function Genre_header() {
  return <h2>Genres</h2>
}

function Series_header() {
  return <h2>Series</h2>
}