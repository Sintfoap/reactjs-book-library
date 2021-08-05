
import React from "react";
import { Link } from "react-router-dom";

function BuildDetailFormatter(prefix, id_attribute = "id") {
    return (value, row) => {
        if (row[id_attribute]) {
            if (id_attribute === 'id') {
                return <Link style={{ color: 'black' }} to={(prefix + row[id_attribute]).toString()}>{value}</Link>
            } else {
                return <Link style={{ color: 'black' }} to={(prefix + row[id_attribute].id).toString()}>{value}</Link>
            }
        }
        return null
    }
}

export default BuildDetailFormatter