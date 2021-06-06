import React from "react";
import { NavLink } from "react-router-dom";

class Menu extends React.Component {
    render(){
        return(
            <div className="row">
                <NavLink className="card btn btn-outline-secondary active" style={{ width:220, height:180, marginLeft: "25%", marginTop: "15%", justifyContent: "center" }} to="/booklibrary/books">Book Library</NavLink>
                <NavLink className="card btn btn-outline-info active" style={{ width:220, height:180, marginLeft: "25%", marginTop: "15%", justifyContent: "center"}} to="/musiclibrary/music">Music Library</NavLink>
            </div>
        );
    }
}
export default Menu