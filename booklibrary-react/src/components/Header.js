import React from "react";
import {
  Container,
  Navbar
} from 'reactstrap';
import {
  Link, NavLink
} from "react-router-dom";
import logo from '../constants/images/logo_cropped.png';

class Header extends React.Component {
  constructor() {
    super();
    this.state={
      page: ""
    }
  }
  componentDidUpdate(prevProps) {
    // comparison to avoid infinite loop
    if (this.props.page !== prevProps.page) {
      this.setState({page: this.props.page})
      console.log(this.state.page)
    }
  }

  render() {
    return (
      <Container>
        <div className="text-center row">
            <div>
              <NavLink to="/">
                <img
                  src={ logo }
                  alt="Logo"
                />
              </NavLink>
              <i><h5><Link style={{ color: 'black' }} to="/books">- Library -</Link></h5></i>
          </div>
          <Navbar style={{ marginLeft: 10 }} className="row" bg="dark" variant="dark">
            <NavLink className="btn btn-outline-secondary Nav_button" to="/books">Books</NavLink>
            <NavLink className="btn btn-outline-secondary Nav_button" to="/authors">Authors</NavLink>
            <NavLink className="btn btn-outline-secondary Nav_button" to="/genres">Genres</NavLink>
            <NavLink className="btn btn-outline-secondary Nav_button" to="/series">Series</NavLink>
          </Navbar>
        </div>
      </Container>
    );
  }
}
export default Header