import React from "react";
import ReactModal from 'react-modal';
import { Button } from "reactstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'

import BookModal from "./book_modal";

import BookDataGrid from "./BookDataGrid";

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

  handleOpenModal (row) {
    this.setState({ showModal: true });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }

  on_book_change() {
    this.handleCloseModal()
    this.props.on_change();
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
          authors={this.props.authors}
          genres={this.props.genres}
          series={this.props.series}
        />
        <Button outline color="success" className="Add_button" onClick={() => {
          this.setState({
            showModal: true,
            creating_new_book: true
          })}}><FontAwesomeIcon icon={ faPlusSquare }/> New Book </Button>
        <BookDataGrid
          books={this.props.books}
          on_change={this.props.on_change}
          authors={this.props.authors}
          genres={this.props.genres}
          series={this.props.series}
        />
      </div>
      );
  }
}

export default Books;