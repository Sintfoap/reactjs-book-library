import React, { Component } from "react";
import { Container } from "reactstrap";
import Books from "./Books"
import Authors from "./Authors"
import Genres from "./Genres"
import Series from "./Series"
import Loading_animation from '../constants/images/Loading_animation.gif';

import axios from "axios";

import { API_URL } from "../constants";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      current_page: this.props.current_page,
      books: [],
      authors: [],
      genres: [],
      series: [],
      book_confirmation: undefined,
      author_confirmation: undefined,
      genre_confirmation: undefined,
      series_confirmation: undefined
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
    axios.get(API_URL + 'books').then(res => this.setState({ books: res.data, book_confirmation: true }));
  };

  getAuthors = () => {
    axios.get(API_URL + 'authors').then(res => this.setState({ authors: res.data, author_confirmation: true }));
  }

  getGenre = () => {
    axios.get(API_URL + 'genres').then(res => this.setState({ genres: res.data, genre_confirmation: true }));
  }

  getSeries = () => {
    axios.get(API_URL + 'series').then(res => this.setState({ series: res.data, series_confirmation: true }));
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

  loading_screen(){
    return <div className="text-center row">
    <img
      src={ Loading_animation }
      alt="Loading_animation"
    />
  </div>
  }

  getpage = () => {
    // console.log(this)
    if((this.state.book_confirmation === undefined) || (this.state.author_confirmation === undefined) ||  (this.state.genre_confirmation === undefined) || (this.state.series_confirmation === undefined)){
      return this.loading_screen()
    } else {
      switch (this.state.current_page) {        
        default: case "books":
          return (
            <Books 
            books={this.state.books}
            authors={this.state.authors}
            genres={this.state.genres}
            series={this.state.series}
            on_change={this.resetBooks}
            />
          )
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

      }
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