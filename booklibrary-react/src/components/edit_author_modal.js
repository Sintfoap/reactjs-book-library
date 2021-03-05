import React, { Component } from "react";
import ReactModal from 'react-modal';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL } from "../constants";

class EditAuthorModal extends React.Component  {
    constructor (props) {
        super(props);
        console.log(props)
        let my_state = this.build_state()
        this.state = my_state
    }

    build_state() {
        if (!this.props.new){
            return {
                id: this.props.viewing_author.id,
                first_name: this.props.viewing_author.first_name,
                last_name: this.props.last_name
            }
        }else {
            return {
                id: -1,
                first_name: "",
                last_name: ""
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

    createAuthor = e => {
      e.preventDefault();
      let author_obj = this.state
      axios.post(API_URL + 'authors', this.state).then(() => {
        this.props.on_change()
      });
    };
  
    editAuthor = e => {
      e.preventDefault();
      axios.put(API_URL + 'authors/' + this.state.id, this.state).then(() => {
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
                    <Form onSubmit={this.props.new ? this.createAuthor : this.editAuthor}>
                        <FormGroup>
                        <Label for="first_name">First Name:</Label>
                        <Input
                            type="text"
                            name="first_name"
                            onChange={this.onChange}
                            value={this.state.first_name || ""}
                        />
                        </FormGroup>
                        <FormGroup>
                        <Label for="last_name">Last Name:</Label>
                        <Input
                            type="text"
                            name="last_name"
                            onChange={this.onChange}
                            value={this.state.last_name || ""}
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
export default EditAuthorModal