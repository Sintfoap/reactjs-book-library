import React from "react";
import { Link } from "react-router-dom";

class Menu extends React.Component {
    render(){
        return(
            <div className="row">
                <Link className="card btn btn-outline-secondary" style={{ width:220, height:180, marginLeft: "2%",marginTop: "15%", marginRight: "10%", justifyContent: "center" }} to="/books">Book Library</Link>
                <Link className="card btn btn-outline-secondary" style={{ width:220, height:180, marginLeft: "10%",marginTop: "15%", marginRight: "2%", justifyContent: "center" }} >Music Library</Link>
            </div>
        );
    }
}
export default Menu