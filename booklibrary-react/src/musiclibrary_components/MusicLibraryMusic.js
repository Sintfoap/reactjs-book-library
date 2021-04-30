import React from "react";
import ReactModal from 'react-modal';
import { Button } from "reactstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import MusicLibraryDatabase from "./MusicLibraryDatabase";

ReactModal.setAppElement('#root')

export default class MusicLibraryMusic extends React.Component {
  constructor () {
    super();
    this.state = {
      showModal: false
    };

    this.check_if_ready_to_render = this.check_if_ready_to_render.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.on_book_change = this.on_book_change.bind(this);
  }

  check_if_ready_to_render() {
    if(MusicLibraryDatabase.everything_loaded()) {
      this.setState();
    }
  }
  handleOpenModal () {
    MusicLibraryDatabase.resetState(this.check_if_ready_to_render)
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
        {/* <BookModal
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
        <div>
          <Button style={{float: "right"}} outline color="success" className="Add_button" onClick={() => {
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
            filter_unowned={true}
          />
        </div> */}
        <h1>WE RENDERED A PAAAGE</h1>
      </div>
      );
  }
}