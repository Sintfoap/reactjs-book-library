
import React from "react";
import { Link } from "react-router-dom";

function BuildDetailFormatter(prefix, id_attribute="id") {
    return (value, row) => {
        if(row[id_attribute]){
            return <Link style={{color: 'black'}} to={prefix + row[id_attribute].toString()}>{value}</Link>
        }
        return null
    }
}

export default BuildDetailFormatter