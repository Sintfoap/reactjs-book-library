import React from "react";
import DataGrid from 'react-data-grid';

import axios from "axios";

import { API_URL } from "../constants";

class Authors extends React.Component {
  state = {
    books: [],
    authors: [],
    genres: [],
    series:[],
  };

  componentDidMount() {
    this.resetState();
  }

  resetState = () => {
    this.getBooks();
    // this.getAuthors();
    // this.getGenres();
    // this.getSeries();
  };

  getBooks = () => {
    axios.get(API_URL + 'books').then(res => this.setState({ books: res.data }));
  };

  deleteBook = id => {
    axios.delete(API_URL + 'books/' + id).then(res => this.setState({ books: res.data}));
  };

  createBook = () => {
  }

  render() {
    const columns = [
      { key: 'id', name: 'ID' },
      { key: 'title', name: 'Title' },
      { key: 'notes', name: 'Notes' },
      { key: 'author_id', name: 'Author' },
      { key: 'genre_id', name: 'Genre' },
      { key: 'series_id', name: 'Series' }
    ]
    
    const books_list = this.state.books.map((book) => {
      return (
        <li> 
          <button class="btn button-secondary">
            {book.title}
          </button>
          <button onClick={() => this.deleteBook(book.id)}>
              Delete Book
          </button>
          <button onClick={() => this.createBook()}>
              Create Book
          </button>
        </li>
      );
    });

    return (
      <div>
        <ul>
        <DataGrid
          columns={columns}
          rows={this.state.books}
          defaultColumnOptions={{
            sortable: true,
            resizable: true
          }}
        />
        </ul>
      </div>
      );
  }
}

export default Authors;