import React from "react";
import { Button } from "reactstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

function DeleteFormatter(value, row) {
  return <Button href="#" outline color="danger" className="btn-sm edit-delete-button" onClick={() => row.delete.on_click(row)}><FontAwesomeIcon icon={faTrash}/></Button>
  }

export default DeleteFormatter