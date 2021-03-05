import React from "react";
import DataGrid from 'react-data-grid';
import ReactModal from 'react-modal';
import { Button } from "reactstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

import axios from "axios";
import EditBookModal from "./edit_book_modal";

import { API_URL } from "../constants";

ReactModal.setAppElement('#root')

const EditorFormatter = ({ value, row }) => {
  return <a href="#" onClick={() => row.edit.on_click(row)}><FontAwesomeIcon icon={faEdit}/></a>
  }
const DeleteFormatter = ({ value, row }) => {
  return <a href="#" onClick={() => row.delete.on_click(row)}><FontAwesomeIcon icon={faTrash}/></a>
  }

class Books extends React.Component {
  constructor () {
    super();
    this.state = {
      showModal: false,
      creating_new_book: false,
      viewing_book: {}
    };
    
    this.handleDeleteModal = this.handleDeleteModal.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.on_book_change = this.on_book_change.bind(this);
  }

  handleDeleteModal (row) {
    // if(confirm("Do you want to delete book " + String(row.id) + " " + row.title + "?")){
      this.deleteBook(row.id)
    //}
  }

  handleOpenModal (row) {
    console.log(row)
    this.setState({ viewing_book: row, showModal: true, creating_new_book: false });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }

  on_book_change() {
    this.handleCloseModal()
    this.props.on_change();
  }

  deleteBook = id => {
    axios.delete(API_URL + 'books/' + id).then(res => {
      this.setState({ books: res.data})
      this.props.on_change()
    });
  };

  find_author = (id) => {
    const author = this.props.authors.find(author => author.id === id)
    if(author){
      return author.first_name + " " + author.last_name
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
      { key: 'id', name: 'ID' },
      { key: 'title', name: 'Title' },
      { key: 'notes', name: 'Notes' },
      { key: 'author_name', name: 'Author' },
      { key: 'genre_name', name: 'Genre' },
      { key: 'series_name', name: 'Series' },
      { key: 'edit', name: 'Edit', formatter: EditorFormatter },
      { key: 'delete', name: 'Delete', formatter: DeleteFormatter }
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
         <EditBookModal
           isOpen={this.state.showModal}
           contentLabel="Book Modal"
           viewing_book={this.state.viewing_book}
           new={this.state.creating_new_book}
           close_modal={this.handleCloseModal}
           on_change={this.on_book_change}
          />
        <Button onClick={() => {
          this.setState({
            showModal: true,
            creating_new_book: true
          })}}>MAKE ME A BOOK</Button>
        <DataGrid
          columns={columns}
          rows={this.props.books}
          // rowGetter={i => this.props.books[i]}
          // rowsCount={this.props.books.length}
          defaultColumnOptions={{
            sortable: true,
            resizable: true
          }}
        />
      </div>
      );
  }
}

export default Books;