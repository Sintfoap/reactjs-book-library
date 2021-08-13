import React from "react";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import BookLibraryBookModal from "./BookLibraryBookModal";
import BookLibraryBookDataGrid from "./BookLibraryBookDataGrid";
import BookLibraryDatabase from "./BookLibraryDatabase";

export default class BookLibraryBooks extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
    };

    this.check_if_ready_to_render = this.check_if_ready_to_render.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.on_book_change = this.on_book_change.bind(this);
  }

  check_if_ready_to_render() {
    if (BookLibraryDatabase.everything_loaded()) {
      this.setState();
    }
  }

  handleOpenModal() {
    BookLibraryDatabase.resetState(this.check_if_ready_to_render);
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  on_book_change() {
    this.props.on_change();
  }

  render() {
    return (
      <div>
        <BookLibraryBookModal
          isOpen={this.state.showModal}
          contentLabel="Book Modal"
          new={true}
          close_modal={this.handleCloseModal}
          on_change={this.on_book_change}
          showCreateButtons={true}
          re_open={this.re_open} />
        <div>
          <Button style={{ float: "right" }} outline className="Add_button btn-outline-maroon" onClick={() => {
            this.setState({
              showModal: true,
              creating_new_book: true
            });
          }}><FontAwesomeIcon icon={faPlusSquare} /> New Book </Button>
          <BookLibraryBookDataGrid
            books={BookLibraryDatabase.books}
            on_change={this.props.on_change}
            authors={BookLibraryDatabase.authors}
            genres={BookLibraryDatabase.genres}
            series={BookLibraryDatabase.series}
            sort_field={"title"}
            filter_unowned={true} />
        </div>
      </div>
    );
  }
}
