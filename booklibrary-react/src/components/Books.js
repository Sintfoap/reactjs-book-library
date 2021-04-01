import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import ReactModal from 'react-modal';
import { Button } from "reactstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'

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
    // console.log("Clicked delete")
    // console.log(row)
    this.setState({ viewing_book: row, showDeleteModal: true})
  }

  handleOpenModal (row) {
    // console.log(row)
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
      { dataField: 'title', text: 'Title', filter: textFilter({delay: 0}) },
      { dataField: 'notes', text: 'Notes', style: { width: 250 }, filter: textFilter({delay: 0}) },
      { dataField: 'author_name', text: 'Author', filter: textFilter({delay: 0})},
      { dataField: 'genre_name', text: 'Genre', filter: textFilter({delay: 0}) },
      { dataField: 'series_name', text: 'Series', filter: textFilter({delay: 0}) },
      { dataField: 'edit', resizable: false, text: 'Edit', style: { width: 55 }, formatter: EditorFormatter},
      { dataField: 'delete', resizable: false, text: 'Delete', style: { width: 60 }, formatter: DeleteFormatter }
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
        <BootstrapTable
        keyField={"wut"}
        filter={ filterFactory() }
          columns={columns}
          data={this.props.books}
        />
      </div>
      );
  }
}

export default Books;