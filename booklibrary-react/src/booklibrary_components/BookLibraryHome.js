import React, { Component } from "react";
import { Container } from "reactstrap";
import BookLibraryBooks from "./BookLibraryBooks";
import BookLibraryAuthors from "./BookLibraryAuthors";
import BookLibraryGenres from "./BookLibraryGenres";
import BookLibrarySeries from "./BookLibrarySeries";
import loading_screen from '../components/Loading_screen';
import BookLibraryDatabase from './BookLibraryDatabase';

export default class BookLibraryHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_page: this.props.current_page,
      load_page: false
    };

    this.check_if_ready_to_render = this.check_if_ready_to_render.bind(this);
  }

  componentDidUpdate(prevProps) {
    // comparison to avoid infinite loop
    if (this.props.current_page !== prevProps.current_page) {
      this.setState({ current_page: this.props.current_page });
    }
  }

  check_if_ready_to_render() {
    if (BookLibraryDatabase.everything_loaded()) {
      this.setState({ load_page: true });
    }
  }

  componentDidMount() {
    if (!BookLibraryDatabase.everything_loaded()) {
      BookLibraryDatabase.resetState(this.check_if_ready_to_render);
    }
  }

  getpage = () => {
    // console.log(this)
    if (BookLibraryDatabase.everything_loaded()) {
      switch (this.state.current_page) {
        case "books":
          return (
            <BookLibraryBooks
              on_change={() => { }} //BookLibraryDatabase.resetBooks(this.check_if_ready_to_render); }}
               />
          );
        case "authors":
          return (
            <BookLibraryAuthors
              on_change={() => { BookLibraryDatabase.resetAuthors(this.check_if_ready_to_render); }} />
          );
        case "genres":
          return (
            <BookLibraryGenres
              on_change={() => { BookLibraryDatabase.resetGenres(this.check_if_ready_to_render); }} />
          );
        case "series":
          return (
            <BookLibrarySeries
              on_change={() => { BookLibraryDatabase.resetSeries(this.check_if_ready_to_render); }} />
          );
      }
    } else {
      return loading_screen();
    }
  };

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
