import React, { Component } from "react";
import ReactModal from 'react-modal';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL } from "../constants";

class EditGenreModal extends React.Component  {
  constructor (props) {
    super(props);
    console.log(props)
    let my_state = this.build_state()
    this.state = my_state
  }

  build_state() {
      if (!this.props.new){
        return {
          id: this.props.Viewing_genre.id,
          title: this.props.Viewing_genre.category,
          // books: this.props.viewing_genre.books
        }
      }else {
        return {
          id: -1,
          category: "",
          // books: "",
        }
      }
  }
  componentDidUpdate(prevProps) {
    // comparison to avoid infinite loop
    if (this.props !== prevProps) {
      this.setState(this.build_state())
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createGenre = e => {
    e.preventDefault();
    axios.post(API_URL + 'genres', this.state).then(() => {
      this.props.on_change()
    });
  };

  editGenre = e => {
    e.preventDefault();
    axios.put(API_URL + 'genres/' + this.state.id, this.state).then(() => {
      this.props.on_change()
    });
  };
  render(){
    // console.log(this.props)
    return(
      <div>
        <ReactModal
          isOpen={this.props.isOpen}
        >
          <Form onSubmit={this.props.new ? this.createGenre : this.editGenre}>
            <FormGroup>
            <Label for="category">Category:</Label>
            <Input
              type="text"
              name="category"
              onChange={this.onChange}
              value={this.state.category || ""}
            />
            </FormGroup>
            <Button>Send</Button>
          </Form>
          <Button onClick={this.props.close_modal}>Cancel</Button>
        </ReactModal>
      </div>
    )
  }
}
export default EditGenreModal