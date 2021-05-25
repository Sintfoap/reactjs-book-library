import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { Button } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import BookLibraryGenreModal from "./BookLibraryGenreModal";
import DeleteModal from "../components/Delete_modal";
import EditorFormatter from "../components/Edit_formatter.js";
import DeleteFormatter from "../components/Delete_formater.js";
import { BOOK_API_URL } from "../constants";
import { find_error_message_in_response } from "../constants/utils";
import BuildDetailFormatter from "../components/Detail_formatter";
import BookLibraryDatabase from "./BookLibraryDatabase";
import { toast } from "react-toastify";

export default class BookLibraryGenres extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      showDeleteModal: false,
      creating_new_genre: false,
      viewing_genre: {}
    };

    this.handleDeleteModal = this.handleDeleteModal.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.on_genre_change = this.on_genre_change.bind(this);
    this.on_delete_genre_change = this.on_delete_genre_change.bind(this);
  }

  handleDeleteModal(row) {
    // console.log("Clicked delete")
    // console.log(row)
    this.setState({ viewing_genre: row, showDeleteModal: true });
  }


  handleOpenModal(row) {
    // console.log(row)
    this.setState({ viewing_genre: row, showModal: true, creating_new_genre: false });
  }

  handleCloseModal() {
    this.setState({ showModal: false, showDeleteModal: false });
  }

  on_genre_change() {
    this.handleCloseModal();
    this.props.on_change();
  }

  on_delete_genre_change() {
    axios.delete(BOOK_API_URL + 'genres/' + this.state.viewing_genre.id).then(() => {
      this.handleCloseModal();
      this.props.on_change();
    }).catch((thrown) => {
      toast.error(JSON.stringify(find_error_message_in_response(thrown.response)));
    });
  }

  derive_book_titles = (genre) => {
    const book_titles = genre.books.map(book => book.title);
    return book_titles.join(", ");
  };

  render() {
    const columns = [
      // { key: 'id', name: 'ID' },
      { dataField: 'category', text: 'Genre ', filter: textFilter({ delay: 0 }), formatter: BuildDetailFormatter('/booklibrary/genres/') },
      // { dataField: 'book_title', text: 'Book ',filter: textFilter({delay: 0})},
      { dataField: 'edit', text: 'Edit', style: { width: 55 }, formatter: EditorFormatter },
      { dataField: 'delete', text: 'Delete', style: { width: 60 }, formatter: DeleteFormatter },
    ];
    let displayed_genres = BookLibraryDatabase.genres.slice();
    displayed_genres.forEach((item) => {
      item.edit = { id: item.id, on_click: this.handleOpenModal };
      item.delete = { id: item.id, on_click: this.handleDeleteModal };
    });
    function indication() {
      return "Table got nothing"
    }
    return (
      <div>
        <BookLibraryGenreModal
          isOpen={this.state.showModal}
          contentLabel="Genre Modal"
          viewing_genre={this.state.viewing_genre}
          new={this.state.creating_new_genre}
          close_modal={this.handleCloseModal}
          on_change={this.on_genre_change} />
        <DeleteModal
          isOpen={this.state.showDeleteModal}
          contentLabel="Delete Genre"
          viewing_genre={this.state.viewing_genre}
          close_modal={this.handleCloseModal}
          item_type={"Genre"}
          item_desc={this.state.viewing_genre.category}
          on_change={this.on_delete_genre_change} />
        <Button style={{ float: "right" }} outline color="success" className="Add_button" onClick={() => {
          this.setState({
            showModal: true,
            creating_new_genre: true
          });
        }}><FontAwesomeIcon icon={faPlusSquare} /> New Genre </Button>

        <BootstrapTable
          keyField={"wut"}
          filter={filterFactory()}
          columns={columns}
          data={BookLibraryDatabase.genres}
          noDataIndication={ indication } />
      </div>
    );
  }
}
