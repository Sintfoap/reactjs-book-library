import React, { Component } from "react";
import ReactModal from 'react-modal';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL } from "../constants";

class EditBookModal extends React.Component  {
    constructor (props) {
        super(props);
        console.log(props)
        let my_state = this.build_state()
        this.state = my_state
    }

    build_state() {
        if (!this.props.new){
            return {
                id: this.props.viewing_book.id,
                title: this.props.viewing_book.title,
                notes: this.props.viewing_book.notes,
                author: this.props.viewing_book.author,
                genre: this.props.viewing_book.genre,
                series: this.props.viewing_book.series
            }
        }else {
            return {
                id: -1,
                title: "",
                notes: "",
                author: "",
                genre: "",
                series: ""
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

    createBook = e => {
      e.preventDefault();
      let book_obj = this.state
      book_obj.genre = parseInt(book_obj.genre)
      book_obj.author = parseInt(book_obj.author)
      axios.post(API_URL + 'books', this.state).then(() => {
        this.props.on_change()
      });
    };
  
    editBook = e => {
      e.preventDefault();
      axios.put(API_URL + 'books/' + this.state.id, this.state).then(() => {
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
                    <Form onSubmit={this.props.new ? this.createBook : this.editBook}>
                        <FormGroup>
                        <Label for="title">Title:</Label>
                        <Input
                            type="text"
                            name="title"
                            onChange={this.onChange}
                            value={this.state.title || ""}
                        />
                        </FormGroup>
                        <FormGroup>
                        <Label for="notes">Notes:</Label>
                        <Input
                            type="text"
                            name="notes"
                            onChange={this.onChange}
                            value={this.state.notes || ""}
                        />
                        </FormGroup>
                        <FormGroup>
                        <Label for="author">Author:</Label>
                        <Input
                            type="text"
                            name="author"
                            onChange={this.onChange}
                            value={this.state.author || ""}
                        />
                        </FormGroup>
                        <FormGroup>
                        <Label for="genre">Genre:</Label>
                        <Input
                            type="text"
                            name="genre"
                            onChange={this.onChange}
                            value={this.state.genre || ""}
                        />
                        </FormGroup>
                        <FormGroup>
                        <Label for="series">Series:</Label>
                        <Input
                            type="text"
                            name="series"
                            onChange={this.onChange}
                            value={this.state.series || ""}
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
export default EditBookModal