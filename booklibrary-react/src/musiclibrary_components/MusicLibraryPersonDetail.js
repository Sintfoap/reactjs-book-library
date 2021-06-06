import React from "react";
import axios from "axios";
import { MUSIC_API_URL } from "../constants";
import MusicLibraryDatabase from "./MusicLibraryDatabase";
import loading_screen from '../components/Loading_screen';
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { find_error_message_in_response } from "../constants/utils";
import { toast } from "react-toastify";
import { withRouter } from "react-router";
import MusicLibraryPersonModal from "./MusicLibraryPersonModal"

 class MusicLibraryPersonDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      person: undefined,
      person_confirmation: false
    };
    this.check_if_ready_to_render = this.check_if_ready_to_render.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.on_person_change = this.on_person_change.bind(this);
  }

  handleOpenModal(row) {
    // console.log(row)
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  on_person_change() {
    this.handleCloseModal();
    MusicLibraryDatabase.resetState(this.check_if_ready_to_render);
  }

  check_if_ready_to_render() {
    if (MusicLibraryDatabase.everything_loaded()) {
      this.getPerson();
    }
  }

  componentDidMount() {
    if (!MusicLibraryDatabase.everything_loaded()) {
        MusicLibraryDatabase.resetState(this.check_if_ready_to_render);
    } else {
      this.getPerson();
    }
  }

  getPerson = () => {
    axios.get(MUSIC_API_URL + 'people/' + this.props.match.params.id).then(res => this.setState({ person: res.data, person_confirmation: true })).catch((thrown) => {
      console.log(thrown);
      toast.error(JSON.stringify(find_error_message_in_response(thrown.response)));
    });
  };

  render() {
    if (this.state.person_confirmation) {
      return (<div className="container">
        <div className="row" style={{ marginTop: 60, marginLeft: 0 }}><h1>{this.state.person.last_name + ', ' + this.state.person.first_name}</h1><Button href="#" outline color="primary" className="btn-sm edit-delete-button" onClick={() => this.handleOpenModal(this.state.author)} style={{ marginLeft: 13, marginTop: 13 }}><FontAwesomeIcon icon={faEdit} /></Button>
        </div>
        <MusicLibraryPersonModal
          isOpen={this.state.showModal}
          contentLabel="People Modal"
          viewing_person={this.state.person}
          new={false}
          close_modal={this.handleCloseModal}
          on_change={this.on_person_change} />
      </div>);
    } else {
      return loading_screen();
    }

  }
}
export default withRouter(MusicLibraryPersonDetail)