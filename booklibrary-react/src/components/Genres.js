import React from "react";
import DataGrid from 'react-data-grid';
import ReactModal from 'react-modal';
import { Button } from "reactstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faPlusSquare } from '@fortawesome/free-solid-svg-icons'

import axios from "axios";
import GenreModal from "./genre_modal";

import { API_URL } from "../constants";

ReactModal.setAppElement('#root')

const EditorFormatter = ({ value, row }) => {
  return <Button href="#" outline color="primary" className="btn-sm" onClick={() => row.edit.on_click(row)}><FontAwesomeIcon icon={faEdit}/></Button>
  }
const DeleteFormatter = ({ value, row }) => {
  return <Button href="#" outline color="danger" className="btn-sm" onClick={() => row.delete.on_click(row)}><FontAwesomeIcon icon={faTrash}/></Button>
  }

class Genres extends React.Component {
  constructor () {
    super();
    this.state = {
      showModal: false,
      creating_new_genre: false,
      viewing_genre: {}
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
    this.setState({ viewing_genre: row, showModal: true, creating_new_genre: false });
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

  derive_book_titles = (genre) =>{
    const book_titles = genre.books.map(book => book.title)
    return book_titles.join(", ")
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
      item.book_title = this.derive_book_titles(item)
      item.edit = {id: item.id, on_click: this.handleOpenModal}
      item.delete = {id: item.id, on_click: this.handleDeleteModal}
    })
    return (
      <div>
        <GenreModal 
          isOpen={this.state.showModal}
          contentLabel="Genre Modal"
          viewing_genre={this.state.viewing_genre}
          new={this.state.creating_new_genre}
          close_modal={this.handleCloseModal}
          on_change={this.on_genre_change}
        />
        <Button outline color="success" className="Add_button" onClick={() => {
          this.setState({
            showModal:  true,
            creating_new_genre: true
          })}}><FontAwesomeIcon icon={ faPlusSquare }/> New Genre </Button>
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