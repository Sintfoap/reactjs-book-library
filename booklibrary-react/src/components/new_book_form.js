import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL } from "../constants";

class NewBookForm extends React.Component {
  state = {
    id: 0,
    title: "",
    notes: "",
    author: "",
    genre: "",
    series: "",
    on_change: undefined
  };

  componentDidMount() {
    if (this.props.book) {
      const { id, title, notes, author, genre, series } = this.props.book;
      this.setState({ id, title, notes, author, genre, series });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createBook = e => {
    e.preventDefault();
    let book_obj = this.state
    book_obj.genre = parseInt(book_obj.genre)
    book_obj.author = parseInt(book_obj.author)
    axios.post(API_URL + 'books', this.state).then(() => {
      //this.props.resetState();
      this.props.toggle();
      this.props.on_change()
    });
  };

  editBook = e => {
    e.preventDefault();
    axios.put(API_URL + 'books/' + this.state.id, this.state).then(() => {
      //this.props.resetState();
      this.props.toggle();
      this.props.on_change()
    });
  };

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  render() {
    return (
      <Form onSubmit={this.props.book ? this.editBook : this.createBook}>
        <FormGroup>
          <Label for="title">Title:</Label>
          <Input
            type="text"
            name="title"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.title)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="notes">Notes:</Label>
          <Input
            type="text"
            name="notes"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.notes)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="author">Author:</Label>
          <Input
            type="text"
            name="author"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.author)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="genre">Genre:</Label>
          <Input
            type="text"
            name="genre"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.genre)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="series">Series:</Label>
          <Input
            type="text"
            name="series"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.series)}
          />
        </FormGroup>
        <Button>Send</Button>
      </Form>
    );
  }
}

export default NewBookForm;