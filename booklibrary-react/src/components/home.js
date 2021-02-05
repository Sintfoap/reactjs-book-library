import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import BookList from "./book_list";
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
    series: []
  };

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

  resetState = () => {
    this.getBooks();
    this.getAuthors();
    this.getGenre();
    this.getSeries();
  };

  render() {
    return (
      <Container style={{ marginTop: "20px" }}>
        <Row>
          <Col>
            <BookList
              books={this.state.books}
              resetState={this.resetState}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <BookList
              authors={this.state.authors}
              resetState={this.resetState}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <BookList
              genres={this.state.genres}
              resetState={this.resetState}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <BookList
              series={this.state.series}
              resetState={this.resetState}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <NewBookModal create={true} resetState={this.resetState} />
          </Col>
        </Row>
        {/* <Row>
          <Col>
            <NewAuthorModal create={true} resetState={this.resetState} />
          </Col>
        </Row>
        <Row>
          <Col>
           <NewGenreModal create={true} resetState={this.resetState} />
          </Col>
        </Row>
        <Row>
          <Col>
            <NewSeriesModal create={true} resetState={this.resetState} />
          </Col>
        </Row> */}
      </Container>
    );
  }
}

export default Home;