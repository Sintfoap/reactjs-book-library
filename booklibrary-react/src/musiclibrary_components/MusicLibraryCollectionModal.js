import React from "react";
import ReactModal from 'react-modal';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import { MUSIC_API_URL } from "../constants";
import { toast } from "react-toastify";
import { find_error_message_in_response } from "../constants/utils";

export default class MusicLibraryCollectionModal extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props)
    let my_state = this.build_state();
    this.state = my_state;
  }

  build_state() {
    if (!this.props.new) {
      return {
        id: this.props.viewing_collection.id,
        name: this.props.viewing_collection.name
      };
    } else {
      return {
        id: -1,
        name: ""
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

  createCollection = e => {
    e.preventDefault();
    axios.post(MUSIC_API_URL + 'collections', this.state).then((response) => {
      toast.success("Successfully created Collection: " + this.state.name);
      this.props.on_change(response.data);
    }).catch((thrown) => {
      console.log(thrown);
      toast.error(JSON.stringify(find_error_message_in_response(thrown.response)));
    });
  };

  editCollection = e => {
    e.preventDefault();
    axios.put(MUSIC_API_URL + 'collections/' + this.state.id, this.state).then(() => {
      toast.success("Successfully edited Collection: " + this.state.name);
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
          <Form onSubmit={this.props.new ? this.createCollection : this.editCollection}>
            <FormGroup>
              <Label for="name">Name:</Label>
              <Input
                type="text"
                name="name"
                onChange={this.onChange}
                value={this.state.name || ""} />
            </FormGroup>
            <Button>Submit</Button>
            <Button onClick={this.props.close_modal} className={"close_modal_button"}>Cancel</Button>
          </Form>
        </ReactModal>
      </div>
    );
  }
}