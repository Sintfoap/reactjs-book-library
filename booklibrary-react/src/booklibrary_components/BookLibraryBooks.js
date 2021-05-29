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
      keep_creating: false
    };

    this.check_if_ready_to_render = this.check_if_ready_to_render.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.on_book_change = this.on_book_change.bind(this);
    this.re_open = this.re_open.bind(this);
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

  re_open() {
    this.handleOpenModal();
    this.setState({keep_creating:true})
  }

  handleCloseModal() {
    this.setState({ showModal: false, keep_creating: false });
  }

  on_book_change() {
    this.handleCloseModal();
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
          authors={BookLibraryDatabase.authors}
          genres={BookLibraryDatabase.genres}
          series={BookLibraryDatabase.series}
          showCreateButtons={true}
          re_open={this.re_open}
          keep_creating={this.state.keep_creating} />
        <div>
          <Button style={{ float: "right" }} outline color="success" className="Add_button" onClick={() => {
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
            filter_unowned={true} />
        </div>
      </div>
    );
  }
}
