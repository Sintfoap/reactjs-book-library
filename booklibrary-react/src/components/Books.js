import React from "react";
import ReactModal from 'react-modal';
import { Button } from "reactstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'

import BookModal from "./book_modal";

import BookDataGrid from "./BookDataGrid";
import Database from "./Database";

ReactModal.setAppElement('#root')

class Books extends React.Component {
  constructor () {
    super();
    this.state = {
      showModal: false
    };
    
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.on_book_change = this.on_book_change.bind(this);
  }

  handleOpenModal () {
    Database.resetState(this.check)
    this.setState({ showModal: true });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }

  on_book_change() {
    this.handleCloseModal()
    Database.on_change();
  }

  render() {
    return (
      <div>
        <BookModal
          isOpen={this.state.showModal}
          contentLabel="Book Modal"
          new={true}
          close_modal={this.handleCloseModal}
          on_change={this.on_book_change}
          authors={Database.authors}
          genres={Database.genres}
          series={Database.series}
          showCreateButtons={true}
        />
        <Button outline color="success" className="Add_button" onClick={() => {
          this.setState({
            showModal: true,
            creating_new_book: true
          })}}><FontAwesomeIcon icon={ faPlusSquare }/> New Book </Button>
        <BookDataGrid
          books={Database.books}
          on_change={this.props.on_change}
          authors={Database.authors}
          genres={Database.genres}
          series={Database.series}
        />
      </div>
      );
  }
}

export default Books;