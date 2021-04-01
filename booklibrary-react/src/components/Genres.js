import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import ReactModal from 'react-modal';
import { Button } from "reactstrap";
import {
  Link
} from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'

import GenreDetail from "./GenreDetail"
import axios from "axios";
import GenreModal from "./genre_modal";
import DeleteModal from "./Delete_modal";
import EditorFormatter from "./Edit_formatter.js"
import DeleteFormatter from "./Delete_formater.js"

import { API_URL } from "../constants";

ReactModal.setAppElement('#root')

function DetailFormatter(value, row) {
  return <Button onClick={() => row.get.on_click(row) }  color="light">{String(value)}</Button>
}

class Genres extends React.Component {
  constructor () {
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

  handleDeleteModal (row) {
    // console.log("Clicked delete")
    // console.log(row)
    this.setState({ viewing_genre: row, showDeleteModal: true})
  }


  handleOpenModal (row) {
    // console.log(row)
    this.setState({ viewing_genre: row, showModal: true, creating_new_genre: false });
  }

  handleCloseModal () {
    this.setState({ showModal: false, showDeleteModal: false });
  }

  on_genre_change () {
    this.handleCloseModal()
    this.props.on_change();
  }
  
  on_delete_genre_change() {
    axios.delete(API_URL + 'genres/' + this.state.viewing_genre.id).then(() => {
      this.handleCloseModal()
      this.props.on_change()
    });
  }

  derive_book_titles = (genre) =>{
    const book_titles = genre.books.map(book => book.title)
    return book_titles.join(", ")
  }
  
  genre_details = (row) =>{
    this.call_genre_details(row)
  }
  call_genre_details = (row) =>{
    <Link to="/genres/detail"/>
    return <GenreDetail
    genre={row}
    />
  }

  render() {
    const columns = [
      // { key: 'id', name: 'ID' },
      { dataField: 'category', text: 'Genre ',filter: textFilter({delay: 0}), formatter: DetailFormatter },
      // { dataField: 'book_title', text: 'Book ',filter: textFilter({delay: 0})},
      { dataField: 'edit', text: 'Edit', style: { width: 55 }, formatter: EditorFormatter },
      { dataField: 'delete', text : 'Delete', style: { width: 60 }, formatter: DeleteFormatter },

    ]
    let displayed_genres = this.props.genres.slice()
    displayed_genres.forEach((item) =>{
      item.catagory = {id: item.id, on_click: this.genre_details}
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
        <DeleteModal
          isOpen={this.state.showDeleteModal}
          contentLabel="Delete Genre"
          viewing_genre={this.state.viewing_genre}
          close_modal={this.handleCloseModal}
          item_type={"Genre"}
          item_desc={this.state.viewing_genre.catagory}
          on_change={this.on_delete_genre_change}
        />
        <Button outline color="success" className="Add_button" onClick={() => {
          this.setState({
            showModal:  true,
            creating_new_genre: true
          })}}><FontAwesomeIcon icon={ faPlusSquare }/> New Genre </Button>
        <BootstrapTable
          keyField={"wut"}
          filter={ filterFactory() }
          columns={columns}
          data={this.props.genres}
        />
      </div>
      );
  }
}

export default Genres;