import React, { Component } from "react";
import ReactModal from 'react-modal';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL } from "../constants";

class DeleteModal extends React.Component  {
    constructor (props) {
        super(props);
        console.log(props)
        let my_state = this.build_state()
        this.state = my_state
    }

    build_state() {
        return {
            text: "",
            error: false
        }
    }
    componentDidUpdate(prevProps) {
      // comparison to avoid infinite loop
      if (this.props !== prevProps) {
        this.setState(this.build_state())
      }
    }

    confirm = e => {
        e.preventDefault();
        if(this.state.text.toLowerCase() == "delete"){
            console.log("TADA YOU SAID DELETE")
            this.props.on_change()
        }else{
            console.log("Did not type delete")
            this.setState({error: true})
        }
    }

    onChange = e => {
        console.log(e)
        this.setState({ [e.target.name]: e.target.value });
    };

    render(){
        const customStyles = {
          content: {
            "maxHeight": "80%",
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
                    <Form onSubmit={this.confirm}>
                        <FormGroup>
                        <Label for="text">Please type "<i>Delete</i>" to confirm you would like to delete {this.props.item_type} <b>{this.props.item_desc}</b>:</Label>
                        <Input
                            type="text"
                            name="text"
                            onChange={this.onChange}
                            value={this.state.text}
                            required={true}
                            placeholder="Delete"
                            className={this.state.error ? 'delete-modal-error' : ''}
                        />
                        </FormGroup>
                        <Button className={"submit_modal_button"}>Submit</Button>
                    </Form>
                    <Button onClick={this.props.close_modal}>Cancel</Button>
                </ReactModal>
            </div>
        )
    }
}
export default DeleteModal