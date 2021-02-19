import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL } from "../constants";

class NewGenreForm extends React.Component {
  state = {
    pk: 0,
    catagory: "",
    on_change: undefined
  };

  componentDidMount() {
    if (this.props.genre) {
      const { pk, catagory} = this.props.genre;
      this.setState({ pk, catagory});
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createGenre = e => {
    e.preventDefault();
    axios.post(API_URL + 'genres', this.state).then(() => {
      this.props.toggle();
      this.props.onChange();
    });
  };

  editGenre = e => {
    e.preventDefault();
    axios.put(API_URL + 'genres/' + this.state.pk, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  render() {
    return (
      <Form onSubmit={this.props.genre ? this.editGenre : this.createGenre}>
        <FormGroup>
          <Label for="catagory">Catagory:</Label>
          <Input
            type="text"
            name="catagory"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.title)}
          />
        </FormGroup>
        <Button>Send</Button>
      </Form>
    );
  }
}

export default NewGenreForm;