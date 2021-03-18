import React from "react";
import DataGrid from 'react-data-grid';
import ReactModal from 'react-modal';
import { Button } from "reactstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faPlusSquare, faTrash } from '@fortawesome/free-solid-svg-icons'

import axios from "axios";
import BookModal from "./book_modal";
import DeleteModal from "./Delete_modal";
import EditorFormatter from "./Edit_formatter.js"
import DeleteFormatter from "./Delete_formater.js"

import { API_URL } from "../constants";

ReactModal.setAppElement('#root')

class Books extends React.Component {
  constructor () {
    super();
    this.state = {
      showModal: false,
      showDeleteModal: false,
      creating_new_book: false,
      viewing_book: {}
    };
    
    this.handleDeleteModal = this.handleDeleteModal.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.on_book_change = this.on_book_change.bind(this);
    this.on_delete_book_change = this.on_delete_book_change.bind(this);
  }

  handleDeleteModal (row) {
    console.log("Clicked delete")
    console.log(row)
    this.setState({ viewing_book: row, showDeleteModal: true})
  }

  handleOpenModal (row) {
    console.log(row)
    this.setState({ viewing_book: row, showModal: true, creating_new_book: false });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false, showDeleteModal: false });
  }

  on_book_change() {
    this.handleCloseModal()
    this.props.on_change();
  }

  on_delete_book_change() {
    axios.delete(API_URL + 'books/' + this.state.viewing_book.id).then(() => {
      this.handleCloseModal()
      this.props.on_change()
    });
  }

  find_author = (id) => {
    const author = this.props.authors.find(author => author.id === id)
    if(author){
      return author.last_name + ", " + author.first_name
    }
  }

  find_genre = (id) => {
    const genre = this.props.genres.find(genre => genre.id === id)
    if(genre){
      return genre.category
    }
  }

  find_series = (id) => {
    const series = this.props.series.find(series => series.id === id)
    if(series){
      return series.name
    }
  }

  render() {
    const columns = [
      // { key: 'id', name: 'ID' },
      { key: 'title', name: 'Title' },
      { key: 'notes', name: 'Notes' },
      { key: 'author_name', name: 'Author' },
      { key: 'genre_name', name: 'Genre' },
      { key: 'series_name', name: 'Series' },
      { key: 'edit', resizable: false, name: 'Edit', width: 55, formatter: EditorFormatter},
      { key: 'delete', resizable: false, name: 'Delete', width: 60, formatter: DeleteFormatter }
    ]
    let displayed_books = this.props.books.slice()
    displayed_books.forEach((item) => {
      item.author_name = this.find_author(item.author)
      item.genre_name = this.find_genre(item.genre)
      item.series_name = this.find_series(item.series)
      item.edit = {id: item.id, on_click: this.handleOpenModal}
      item.delete = {id: item.id, on_click: this.handleDeleteModal}
    })
    return (
      <div>
        <BookModal
          isOpen={this.state.showModal}
          contentLabel="Book Modal"
          viewing_book={this.state.viewing_book}
          new={this.state.creating_new_book}
          close_modal={this.handleCloseModal}
          on_change={this.on_book_change}
          authors={this.props.authors}
          genres={this.props.genres}
          series={this.props.series}
        />
        <DeleteModal
          isOpen={this.state.showDeleteModal}
          contentLabel="Delete Book"
          viewing_book={this.state.viewing_book}
          close_modal={this.handleCloseModal}
          item_type={"Book"}
          item_desc={this.state.viewing_book.title}
          on_change={this.on_delete_book_change}
        />
        <Button outline color="success" className="Add_button" onClick={() => {
          this.setState({
            showModal: true,
            creating_new_book: true
          })}}><FontAwesomeIcon icon={ faPlusSquare }/> New Book </Button>
        <DataGrid
          columns={columns}
          rows={this.props.books}
          enableFilterRow= {true}
          // rowGetter={i => this.props.books[i]}
          // rowsCount={this.props.books.length}
          defaultColumnOptions={{
            sortable: true,
            // resizable: true,
            minWidth: 55
          }}
        />
      </div>
      );
  }
}

export default Books;