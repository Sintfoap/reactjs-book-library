import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL } from "../constants";

class BooksList extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    this.resetState();
  }

  resetState = () => {
    this.getBooks();
  };

  getBooks = () => {
    axios.get(API_URL + 'books').then(res => this.setState({ books: res.data }));
  };

  render() {

    const books_list = this.state.books.map((book) => {
      return (
        <li>
          {book.title}
        </li>
      );
    });

    return (
      <ul>
        {books_list}
      </ul>
    );
  }
}

export default BooksList;