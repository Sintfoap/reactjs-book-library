import React from "react";
import {
  Container,
  Navbar
} from 'reactstrap';
import {
  Link, NavLink
} from "react-router-dom";
import logo from '../constants/images/Musiclibrary_logo.png';

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
              <div>
                <i><h5 style={{ display: 'inline' }}><Link style={{ color:"#17a2b8" }} to="/booklibrary/books">Library</Link></h5></i>
                <h5 style={{ display: 'inline', color:"#17a2b8" }}> | </h5>
                <i><h5 style={{ display: 'inline' }}><Link style={{ color:"#17a2b8" }} to="/musiclibrary/music">Music</Link></h5></i>
              </div>
          </div>
          <Navbar style={{ marginLeft: 10 }} className="row" bg="dark" variant="dark">
            <NavLink className="btn btn-outline-info Nav_button" to="/musiclibrary/music">Music</NavLink>
            <NavLink className="btn btn-outline-info Nav_button" to="/musiclibrary/composers">Composers</NavLink>
            <NavLink className="btn btn-outline-info Nav_button" to="/musiclibrary/publishers">Publishers</NavLink>
            <NavLink className="btn btn-outline-info Nav_button" to="/musiclibrary/arrangers">Arrangers</NavLink>
            <NavLink className="btn btn-outline-info Nav_button" to="/musiclibrary/lyracists">Lyracists</NavLink>
          </Navbar>
        </div>
      </Container>
    );
  }
}
export default Header