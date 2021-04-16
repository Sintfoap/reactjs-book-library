import React from "react";
import {
  Container,
  Navbar
} from 'reactstrap';
import {
  Link
} from "react-router-dom";
import logo from '../constants/images/logo_cropped.png';

export default function App() {
  return (
    <Container>
      <div className="text-center row">
        <div>
          <img
            src={ logo }
            alt="Logo"
            
          />
          <i><h5><Link style={{ color: 'black' }} to="/books">- Library -</Link></h5></i>
        </div>
        <Navbar style={{ marginLeft: 10 }} className="row" bg="dark" variant="dark">
          <Link className="btn btn-outline-secondary Nav_button" to="/books">Books</Link>
          <Link className="btn btn-outline-secondary Nav_button" to="/authors">Authors</Link>
          <Link className="btn btn-outline-secondary Nav_button" to="/genres">Genres</Link>
          <Link className="btn btn-outline-secondary Nav_button" to="/series">Series</Link>
        </Navbar>
      </div>
    </Container>
  );
}