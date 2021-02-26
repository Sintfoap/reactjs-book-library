import React, { Component } from "react";
import { Container } from "reactstrap";
import Books from "./Books"
import Authors from "./Authors"
import Genres from "./Genres"
import Series from "./Series"
// import NewBookModal from "./new_book_modal";
// import NewAuthorModal from "./new_author_modal";
// import NewGenreModal from "./new_genre_modal";
// import NewSeriesModal from "./new_series_modal";


import axios from "axios";

import { API_URL } from "../constants";
import { setGlobalCssModule } from "reactstrap/es/utils";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      current_page: this.props.current_page,
      books: undefined,
      authors: undefined,
      genres: undefined,
      series: undefined
    };
  }

  componentDidUpdate(prevProps) {
    // comparison to avoid infinite loop
    if (this.props.current_page !== prevProps.current_page) {
      this.setState({current_page: this.props.current_page})
    }
  }

  componentDidMount() {
    this.resetState();
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

  resetBooks = () => {
    this.getBooks()
  }
  resetAuthors = () => {
    this.getAuthors()
  }
  resetGenres = () => {
    this.getGenre()
  }
  resetSeries = () => {
    this.getSeries()
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
          on_change={this.resetBooks}
          />
        )
        break;
      case "authors":
        return (
          <Authors 
          books={this.state.books}
          authors={this.state.authors}
          genres={this.state.genres}
          series={this.state.series}
          on_change={this.resetAuthors}
          />
        )
        break;
      case "genres":
        return (
          <Genres 
          books={this.state.books}
          authors={this.state.authors}
          genres={this.state.genres}
          series={this.state.series}
          on_change={this.resetGenres}
          />
        )
        break;
      case "series":
        return (
          <Series 
          books={this.state.books}
          authors={this.state.authors}
          genres={this.state.genres}
          series={this.state.series}
          on_change={this.resetSeries}
          />
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
      <div>
        <Container style={{ marginTop: "20px" }}>
          {this.getpage()}
        </Container>
      </div>
    );
  }
}
export default Home;