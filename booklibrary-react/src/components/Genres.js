import React from "react";
import DataGrid from 'react-data-grid';
import ReactModal from 'react-modal';
import { Button } from "reactstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

import axios from "axios";
import EditGenreModal from "./edit_genre_modal";

import { API_URL } from "../constants";

ReactModal.setAppElement('#root')

const EditorFormatter = ({ value, row }) => {
  return <a href="#" onClick={() => row.edit.on_click(row)}><FontAwesomeIcon icon={faEdit}/></a>
  }
const DeleteFormatter = ({ value, row }) => {
  return <a href="#" onClick={() => row.delete.on_click(row)}><FontAwesomeIcon icon={faTrash}/></a>
  }

class Genres extends React.Component {
  constructor () {
    super();
    this.state = {
      showModal: false,
      creating_new_genre: false,
      Viewing_genre: {}
    };

    this.handleDeleteModal = this.handleDeleteModal.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.on_genre_change = this.on_genre_change.bind(this);
  }

  handleDeleteModal (row) {
    // if(confirm("Do you want to delete genre " + String(row.id) + " " + row.category + "?")){
    this.deleteGenre(row.id)
  }


  handleOpenModal (row) {
    console.log(row)
    this.setState({ Viewing_genre: row, showModal: true, creating_new_genre: false });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }

  on_genre_change () {
    this.handleCloseModal()
    this.props.on_change();
  }
  
  deleteGenre = id => {
    axios.delete(API_URL + 'genres/' + id).then(res => { 
      this.setState({ genres: res.data})
      this.props.on_change()
    });
  };

  find_books = (id) =>{
    const book = this.props.books.find(book => book.id === id)
    if (book){
      return book.title
    }
  }

  render() {
    const columns = [
      { key: 'id', name: 'ID' },
      { key: 'category', name: 'Category' },
      { key: 'book_title', name: 'Book'},
      { key: 'edit', name: 'Edit', formatter: EditorFormatter },
      { key: 'delete', name: 'Delete', formatter: DeleteFormatter }
    ]
    let displayed_genres = this.props.genres.slice()
    displayed_genres.forEach((item) =>{
      item.book_title = this.find_books(item.book)
      item.edit = {id: item.id, on_click: this.handleOpenModal}
      item.delete = {id: item.id, on_click: this.handleDeleteModal}
    })
    return (
      <div>
        <EditGenreModal 
          isOpen={this.state.showModal}
          contentLabel="Genre Modal"
          Viewing_genre={this.state.Viewing_genre}
          new={this.state.creating_new_genre}
          close_modal={this.handleCloseModal}
          on_change={this.on_genre_change}
        />
        <Button onClick={() => {
          this.setState({
            showModal:  true,
            creating_new_genre: true
          })}}>MAKE ME A GENRE</Button>
        <DataGrid
          columns={columns}
          rows={this.props.genres}
          defaultColumnOptions={{
            sortable: true,
            resizable: true
          }}
        />
      </div>
      );
  }
}

export default Genres;