import React from "react";
import ReactModal from 'react-modal';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import { MUSIC_API_URL } from "../constants";
import { toast } from "react-toastify";
import { find_error_message_in_response } from "../constants/utils";

export default class MusicLibraryPersonModal extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props)
    let my_state = this.build_state();
    this.state = my_state;
  }

  build_state() {
    if (!this.props.new) {
      return {
        id: this.props.viewing_person.id,
        first_name: this.props.viewing_person.first_name,
        last_name: this.props.viewing_person.last_name
      };
    } else {
      return {
        id: -1,
        first_name: "",
        last_name: ""
      };
    }
  }
  componentDidUpdate(prevProps) {
    // comparison to avoid infinite loop
    if (this.props !== prevProps) {
      this.setState(this.build_state());
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createPerson = e => {
    e.preventDefault();
    axios.post(MUSIC_API_URL + 'people', this.state).then((response) => {
      toast.success("Successfully created: " + this.state.last_name + ", " + this.state.first_name);
      this.props.on_change(response.data);
    }).catch((thrown) => {
      console.log(thrown);
      toast.error(JSON.stringify(find_error_message_in_response(thrown.response)));
    });
  };

  editPerson = e => {
    e.preventDefault();
    axios.put(MUSIC_API_URL + 'people/' + this.state.id, this.state).then(() => {
      toast.success("Successfully edited: " + this.state.last_name + ", " + this.state.last_name);
      this.props.on_change();
    }).catch((thrown) => {
      console.log(thrown);
      toast.error(JSON.stringify(find_error_message_in_response(thrown.response)));
    });
  };
  render() {
    const customStyles = {
      content: {
        "max-height": "80%",
        height: "fit-content",
        margin: "auto",
        width: "50%"
      }
    };
    // console.log(this.props)
    return (
      <div>
        <ReactModal
          isOpen={this.props.isOpen}
          style={customStyles}
        >
          <Form onSubmit={this.props.new ? this.createPerson : this.editPerson}>
            <FormGroup>
              <Label for="first_name">First Name:</Label>
              <Input
                type="text"
                name="first_name"
                onChange={this.onChange}
                value={this.state.first_name || ""} />
            </FormGroup>
            <FormGroup>
              <Label for="last_name">Last Name:</Label>
              <Input
                type="text"
                name="last_name"
                onChange={this.onChange}
                value={this.state.last_name || ""} />
            </FormGroup>
            <Button>Submit</Button>
            <Button onClick={this.props.close_modal} className={"close_modal_button"}>Cancel</Button>
          </Form>
        </ReactModal>
      </div>
    );
  }
}