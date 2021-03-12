import React, { Component } from "react";
import ReactModal from 'react-modal';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL } from "../constants";

class SeriesModal extends React.Component  {
    constructor (props) {
        super(props);
        console.log(props)
        let my_state = this.build_state()
        this.state = my_state
    }

    build_state() {
        if (!this.props.new){
            return {
                id: this.props.viewing_series.id,
                name: this.props.viewing_series.name
            }
        }else {
            return {
                id: -1,
                name: ""
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

    createSeries = e => {
      e.preventDefault();
      let series_obj = this.state
      axios.post(API_URL + 'series', this.state).then(() => {
        this.props.on_change()
      });
    };
  
    editSeries = e => {
      e.preventDefault();
      axios.put(API_URL + 'series/' + this.state.id, this.state).then(() => {
        this.props.on_change()
      });
    };
    render(){
      const customStyles = {
        content: {
          "max-height": "80%",
          height: "fit-content",
          margin: "auto",
          width: "50%"
        }
      };
        // console.log(this.props)
        return(
            <div>
                <ReactModal
                isOpen={this.props.isOpen}
                style={customStyles}
                >
                    <Form onSubmit={this.props.new ? this.createSeries : this.editSeries}>
                        <FormGroup>
                        <Label for="name">Name:</Label>
                        <Input
                            type="text"
                            name="name"
                            onChange={this.onChange}
                            value={this.state.name || ""}
                        />
                        </FormGroup>
                        <Button>Submit</Button>
                    </Form>
                    <Button onClick={this.props.close_modal}>Cancel</Button>
                </ReactModal>
            </div>
        )
    }
}
export default SeriesModal