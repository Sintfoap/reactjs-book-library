import React from "react";

import axios from "axios";

import { API_URL } from "../constants";

class BooksList extends React.Component {
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
    axios.delete(API_URL + 'books/edit/' + id).then(res => this.setState({ books: res.data}));
  };

  createBook = () => {
  }

  render() {
    
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
          {books_list}
        </ul>
      </div>
      );
  }
}

export default BooksList;