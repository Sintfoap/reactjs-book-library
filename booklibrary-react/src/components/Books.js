import React from "react";
import DataGrid from 'react-data-grid';
import ReactModal from 'react-modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import axios from "axios";
import NewBookModal from "./new_book_modal";

import { API_URL } from "../constants";

ReactModal.setAppElement('#root')

const EditorFormatter = ({ value, row }) => {
  return <a href="#" onClick={() => row.edit.on_click(row)} ><FontAwesomeIcon icon={faTrash} /></a>
}
class Books extends React.Component {
  constructor () {
    super();
    this.state = {
      showModal: false,
      viewing_book: {}
    };
    
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal (row) {
    console.log(row)
    this.setState({ viewing_book: row, showModal: true });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }

  deleteBook = id => {
    axios.delete(API_URL + 'books/' + id).then(res => this.setState({ books: res.data}));
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
      { key: 'edit', name: 'Edit', formatter: EditorFormatter }
    ]
    let displayed_books = this.props.books.slice()
    displayed_books.forEach((item,index) => {
      item.author_name = this.find_author(item.author)
      item.genre_name = this.find_genre(item.genre)
      item.series_name = this.find_series(item.series)
      item.edit = {id: item.id, on_change: this.props.on_change, on_click: this.handleOpenModal}
    })
    return (
      <div>
        <NewBookModal 
          create={true}
          on_change={() => this.props.on_change()}
        />
        <ReactModal 
           isOpen={this.state.showModal}
           contentLabel="Minimal Modal Example"
        >
        <p>{this.state.viewing_book.id}</p>
          <p>{this.state.viewing_book.title}</p>
          <p>{this.state.viewing_book.notes}</p>
        </ReactModal>
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