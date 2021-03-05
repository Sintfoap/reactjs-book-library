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
        console.log(e)
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

    authors_dropdown_list() {
        let items = [];
        this.props.authors.forEach(author => {
            items.push(<option key={author.first_name + " " + author.last_name} value={author.id}>{author.first_name + " " + author.last_name}</option>);
        });
        return items;
    }

    genres_dropdown_list() {
        let items = [];
        this.props.genres.forEach(genre => {
            items.push(<option key={genre.category} value={genre.id}>{genre.category}</option>);
        });
        return items;
    }

    series_dropdown_list() {
        let items = [];
        this.props.series.forEach(series => {
            items.push(<option key={series.name} value={series.id}>{series.name}</option>);
        });
        return items;
    }

    render(){
        const customStyles = {
          content: {
            "max-height": "80%",
            height: "fit-content",
            margin: "auto",
            width: "50%"
          }
        };
        return(
            <div>
                <ReactModal
                isOpen={this.props.isOpen}
                style={customStyles}
                >
                    <Form onSubmit={this.props.new ? this.createBook : this.editBook}>
                        <FormGroup>
                        <Label for="title">Title:</Label>
                        <Input
                            type="text"
                            name="title"
                            onChange={this.onChange}
                            value={this.state.title || ""}
                            required={true}
                        />
                        </FormGroup>
                        <FormGroup>
                        <Label for="notes">Notes:</Label>
                        <Input
                            type="textarea"
                            name="notes"
                            onChange={this.onChange}
                            value={this.state.notes || ""}
                        />
                        </FormGroup>
                        <FormGroup>
                        <Label for="author">Author:</Label>
                        <select name="author" value={this.state.author || ""} onChange={this.onChange} class="form-control"  data-live-search="true" required>
                            {this.authors_dropdown_list()}
                        </select>
                        </FormGroup>
                        <FormGroup>
                        <Label for="genre">Genre:</Label>
                        <select name="genre" value={this.state.genre || ""} onChange={this.onChange} class="form-control"  data-live-search="true" required>
                            {this.genres_dropdown_list()}
                        </select>
                        </FormGroup>
                        <FormGroup>
                        <Label for="series">Series:</Label>
                        <select name="series" value={this.state.series || ""} onChange={this.onChange} class="form-control">
                            <option value=''></option>
                            {this.series_dropdown_list()}
                        </select>
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