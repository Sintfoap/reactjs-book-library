import React from "react";
import { NavLink } from "react-router-dom";

class Menu extends React.Component {
    render(){
        return(
            <div className="row">
                <NavLink className="card btn btn-outline-secondary" style={{ width:220, height:180, marginLeft: "2%",marginTop: "15%", marginRight: "10%", justifyContent: "center" }} to="/booklibrary/books">Book Library</NavLink>
                <NavLink className="card btn btn-outline-secondary" style={{ width:220, height:180, marginLeft: "10%",marginTop: "15%", marginRight: "2%", justifyContent: "center" }} to="/musiclibrary/music">Music Library</NavLink>
            </div>
        );
    }
}
export default Menu