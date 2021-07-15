import React from "react";
import {
  Container,
  Navbar
} from 'reactstrap';
import { Link, NavLink } from "react-router-dom";
import logo from '../constants/images/Booklibrary_logo.png';

export default class BookLibraryHeader extends React.Component {
  constructor() {
    super();
    this.state = {
      page: ""
    };
  }
  componentDidUpdate(prevProps) {
    // comparison to avoid infinite loop
    if (this.props.page !== prevProps.page) {
      this.setState({ page: this.props.page });
      console.log(this.state.page);
    }
  }

  render() {
    return (
      <Container>
        <div className="text-center row">
          <div>
            <NavLink to="/">
              <img
                src={logo}
                alt="Logo" />
            </NavLink>
            <div>
              <i><h5 style={{ display: 'inline' }}><Link style={{ color: '#671210' }} to="/booklibrary/books">Library</Link></h5></i>
              <h5 style={{ display: 'inline' }}> | </h5>
              <i><h5 style={{ display: 'inline' }}><Link style={{ color: '#17a2b8' }} to="/musiclibrary/music">Music</Link></h5></i>
            </div>
          </div>
          <Navbar style={{ marginLeft: 10 }} className="row" bg="dark" variant="dark">
            <NavLink className="btn btn-outline-maroon Nav_button" to="/booklibrary/books">Books</NavLink>
            <NavLink className="btn btn-outline-maroon Nav_button" to="/booklibrary/authors">Authors</NavLink>
            <NavLink className="btn btn-outline-maroon Nav_button" to="/booklibrary/genres">Genres</NavLink>
            <NavLink className="btn btn-outline-maroon Nav_button" to="/booklibrary/series">Series</NavLink>
          </Navbar>
        </div>
      </Container>
    );
  }
}
