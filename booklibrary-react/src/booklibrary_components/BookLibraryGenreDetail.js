import React from "react";
import loading_screen from '../components/Loading_screen';
import axios from "axios";
import { BOOK_API_URL } from "../constants";
import BookLibraryBookDataGrid from "./BookLibraryBookDataGrid";
import BookLibraryDatabase from "./BookLibraryDatabase";
import BookLibraryGenreModal from "./BookLibraryGenreModal";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { find_error_message_in_response } from "../constants/utils";
import { withRouter } from "react-router";

 class BookLibraryGenreDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      genre: undefined,
      genre_confirmation: false
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.on_genre_change = this.on_genre_change.bind(this);
    this.check_if_ready_to_render = this.check_if_ready_to_render.bind(this);
  }

  handleOpenModal(row) {
    // console.log(row)
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  on_genre_change() {
    this.handleCloseModal();
    BookLibraryDatabase.resetState(this.check_if_ready_to_render);
  }
  check_if_ready_to_render() {
    if (BookLibraryDatabase.everything_loaded()) {
      this.getGenre();
    }
  }

  componentDidMount() {
    if (!BookLibraryDatabase.everything_loaded()) {
      BookLibraryDatabase.resetState(this.check_if_ready_to_render);
    } else {
      this.getGenre();
    }
  }

  getGenre = () => {
    axios.get(BOOK_API_URL + 'genres/' + this.props.match.params.id).then(res => this.setState({ genre: res.data, genre_confirmation: true })).catch((thrown) => {
      console.log(thrown);
      toast.error(JSON.stringify(find_error_message_in_response(thrown.response)));
    });
  };

  render() {
    if (this.state.genre_confirmation) {
      return (<div className="container">
        <div className="row" style={{ marginTop: 60, marginLeft: 0 }}><h1>{this.state.genre.category}</h1><Button href="#" outline color="primary" className="btn-sm edit-delete-button" onClick={() => this.handleOpenModal(this.state.genre)} style={{ marginLeft: 13, marginTop: 13 }}><FontAwesomeIcon icon={faEdit} /></Button></div>
        <BookLibraryGenreModal
          isOpen={this.state.showModal}
          contentLabel="Genre Modal"
          viewing_genre={this.state.genre}
          new={this.state.creating_new_genre}
          close_modal={this.handleCloseModal}
          on_change={this.on_genre_change} />
        <BookLibraryBookDataGrid
          books={this.state.genre.books}
          on_change={() => { BookLibraryDatabase.resetBooks(this.check_if_ready_to_render); }}
          authors={BookLibraryDatabase.authors}
          genres={BookLibraryDatabase.genres}
          series={BookLibraryDatabase.series}
          filter_unowned={true} />
      </div>);
    } else {
      return loading_screen;
    }

  }
}
export default withRouter(BookLibraryGenreDetail)