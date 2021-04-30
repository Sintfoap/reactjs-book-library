import React from "react";
import ReactModal from 'react-modal';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL } from "../constants";
import { toast } from "react-toastify";
import { find_error_message_in_response } from "../constants/utils";

class GenreModal extends React.Component  {
  constructor (props) {
    super(props);
    let my_state = this.build_state()
    this.state = my_state
  }

  build_state() {
      if (!this.props.new){
        return {
          id: this.props.viewing_genre.id,
          category: this.props.viewing_genre.category
        }
      }else {
        return {
          id: -1,
          category: ""
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
      toast.success("Successfully created Genre: " + this.state.category)
      this.props.on_change()
    }).catch((thrown) => {
      console.log(thrown)
      toast.error(JSON.stringify(find_error_message_in_response(thrown.response)))
    });
  };

  editGenre = e => {
    e.preventDefault();
    axios.put(API_URL + 'genres/' + this.state.id, this.state).then(() => {
      toast.success("Successfully edited Genre: " + this.state.category)
      this.props.on_change()
    }).catch((thrown) => {
      console.log(thrown)
      toast.error(JSON.stringify(find_error_message_in_response(thrown.response)))
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
            <Button>Submit</Button>
            <Button onClick={this.props.close_modal} className={"close_modal_button"}>Cancel</Button>
          </Form>
        </ReactModal>
      </div>
    )
  }
}
export default GenreModal