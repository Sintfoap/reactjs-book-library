import React from "react";
import {
  // Card,
  Container,
  Navbar
  // NavLink,
  // NavbarBrand
} from 'reactstrap';
import {
  Link
} from "react-router-dom";
import logo from '../constants/images/logo.png';

export default function App() {
  return (
    // <Router>
    <Container>
      <div className="text-center row">
        <img
          src={ logo }
          alt="Logo"
        />
        <Navbar className="row" bg="dark" variant="dark">
          <Link className="btn btn-outline-secondary Nav_button" to="/books">Books</Link>
          <Link className="btn btn-outline-secondary Nav_button" to="/authors">Authors</Link>
          <Link className="btn btn-outline-secondary Nav_button" to="/genres">Genres</Link>
          <Link className="btn btn-outline-secondary Nav_button" to="/series">Series</Link>
        </Navbar>
      </div>
    </Container>
    // </Router>
  );
}