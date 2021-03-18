import React from "react";
import { Button } from "reactstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faPlusSquare, faTrash } from '@fortawesome/free-solid-svg-icons'

function EditorFormatter({ value, row }) {
    return <Button href="#" outline color="primary" className="btn-sm edit-delete-button" onClick={() => row.edit.on_click(row)}><FontAwesomeIcon icon={faEdit}/></Button>
    }

export default EditorFormatter