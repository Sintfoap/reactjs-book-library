import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import Books from "./Books"
import Authors from "./Authors"
import Genres from "./Genres"
import Series from "./Series"
import NewBookModal from "./new_book_modal";
// import NewAuthorModal from "./new_author_modal";
// import NewGenreModal from "./new_genre_modal";
// import NewSeriesModal from "./new_series_modal";


import axios from "axios";

import { API_URL } from "../constants";

class Home extends Component {
  state = {
    books: [],
    authors: [],
    genres: [],
    series: [],
    current_page: ""
  };

  componentDidMount() {
    this.resetState();
    this.setState({current_page: window.location.pathname.slice(1)})
  }

  getBooks = () => {
    axios.get(API_URL + 'books').then(res => this.setState({ books: res.data }));
  };
  getAuthors = () => {
    axios.get(API_URL + 'authors').then(res => this.setState({ authors: res.data }));
  }

  getGenre = () => {
    axios.get(API_URL + 'genres').then(res => this.setState({ genres: res.data }));
  }

  getSeries = () => {
    axios.get(API_URL + 'series').then(res => this.setState({ series: res.data }));
  }

  resetState = () => {
    this.getBooks();
    this.getAuthors();
    this.getGenre();
    this.getSeries();
  };

  getpage = () => {

    switch (this.state.current_page) {
      case "books":
        return (
          <Books 
          books={this.state.books}
          authors={this.state.authors}
          genres={this.state.genres}
          series={this.state.series}
          />
        )
        break;
      case "authors":
        return (
          <Authors />
        )
        break;
      case "genres":
        return (
          <Genres />
        )
        break;
      case "series":
        return (
          <Series />
        )
        break;
    
      // default:
      //   return (
      //     <Books />
      //   )
    }
  }

  render() {

    return (
      <Container style={{ marginTop: "20px" }}>
        {this.getpage()}       
      </Container>
    );
  }
}

export default Home;