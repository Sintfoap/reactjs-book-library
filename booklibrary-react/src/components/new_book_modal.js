import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import NewBookForm from "./new_book_form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

class NewBookModal extends Component {
  constructor (props) {
    super(props);
    this.state = {
    modal: false,
    book: this.props.book

  };
  }
  

  toggle = () => {
    this.setState(previous => ({
      modal: !previous.modal
    }));
  };

  render() {
    const create = this.props.create;

    var title = "Editing Book";
    var button = <Button onClick={this.toggle}><FontAwesomeIcon icon={faTrash}/></Button>;
    if (create) {
      title = "Creating New Book";

      button = (
        <Button
          color="primary"
          className="float-right"
          onClick={this.toggle}
          style={{ minWidth: "200px" }}
        >
          Create New
        </Button>
      );
    }

    return (
      <Fragment>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{title}</ModalHeader>

          <ModalBody>
            <NewBookForm
              resetState={this.props.resetState}
              toggle={this.toggle}
              book={this.props.book}
              on_change={this.props.on_change}
            />
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

export default NewBookModal;