import React from "react";
import { NavLink } from "react-router-dom";
import logo from '../constants/images/Booklibrary_logo.png';
class Menu extends React.Component {
    render(){
        return(
            <div style={{textAlign:"center", marginTop:"2%"}}>
                <img
                src={logo}
                alt="Logo" />
                <div className="row" style={{justifyContent:"center", marginTop:"10%", textAlign:"center"}}>
                    <NavLink className="card btn active btn-outline-maroon" style={{ width:220, height:180, marginRight: "15%", justifyContent:'center'}} to="/booklibrary/books">Book Library</NavLink>
                    <NavLink className="card btn btn-outline-info active" style={{ width:220, height:180, justifyContent:'center'}} to="/musiclibrary/music">Music Library</NavLink>
                </div>
            </div>
        );
    }
}
export default Menu