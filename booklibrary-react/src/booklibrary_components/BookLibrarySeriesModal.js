import React from "react";
import ReactModal from 'react-modal';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import { BOOK_API_URL } from "../constants";
import { toast } from "react-toastify";
import { find_error_message_in_response } from "../constants/utils";

export default class BookLibrarySeriesModal extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props)
    let my_state = this.build_state();
    this.state = my_state;
  }

  build_state() {
    if (!this.props.new) {
      return {
        id: this.props.viewing_series.id,
        name: this.props.viewing_series.name
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

  createSeries = e => {
    e.preventDefault();
    axios.post(BOOK_API_URL + 'series', this.state).then(() => {
      toast.success("Successfully created Series: " + this.state.name);
      this.props.on_change();
    }).catch((thrown) => {
      console.log(thrown);
      toast.error(JSON.stringify(find_error_message_in_response(thrown.response)));
    });
  };

  editSeries = e => {
    e.preventDefault();
    axios.put(BOOK_API_URL + 'series/' + this.state.id, this.state).then(() => {
      toast.success("Successfully edited Series: " + this.state.name);
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
          <Form onSubmit={this.props.new ? this.createSeries : this.editSeries}>
            <FormGroup>
              <Label for="name">Name:</Label>
              <Input
                type="text"
                name="name"
                onChange={this.onChange}
                value={this.state.name || ""} />
            </FormGroup>
            <Button className="btn-outline-maroon">Submit</Button>
            <Button onClick={this.props.close_modal} className={"close_modal_button btn-outline-maroon"}>Cancel</Button>
          </Form>
        </ReactModal>
      </div>
    );
  }
}
