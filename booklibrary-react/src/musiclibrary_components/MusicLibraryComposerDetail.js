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
import MusicLibraryComposerModal from "./MusicLibraryComposerModal";

 class MusicLibraryComposerDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      composer: undefined,
      composer_confirmation: false
    };
    this.check_if_ready_to_render = this.check_if_ready_to_render.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.on_composer_change = this.on_composer_change.bind(this);
  }

  handleOpenModal(row) {
    // console.log(row)
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  on_composer_change() {
    this.handleCloseModal();
    MusicLibraryDatabase.resetState(this.check_if_ready_to_render);
  }

  check_if_ready_to_render() {
    if (MusicLibraryDatabase.everything_loaded()) {
      this.getComposer();
    }
  }

  componentDidMount() {
    if (!MusicLibraryDatabase.everything_loaded()) {
        MusicLibraryDatabase.resetState(this.check_if_ready_to_render);
    } else {
      this.getComposer();
    }
  }

  getComposer = () => {
    axios.get(MUSIC_API_URL + 'composers/' + this.props.match.params.id).then(res => this.setState({ composer: res.data, composer_confirmation: true })).catch((thrown) => {
      console.log(thrown);
      toast.error(JSON.stringify(find_error_message_in_response(thrown.response)));
    });
  };

  render() {
    if (this.state.composer_confirmation) {
      return (<div className="container">
        <div className="row" style={{ marginTop: 60, marginLeft: 0 }}><h1>{this.state.composer.last_name + ', ' + this.state.composer.first_name}</h1><Button href="#" outline color="primary" className="btn-sm edit-delete-button" onClick={() => this.handleOpenModal(this.state.author)} style={{ marginLeft: 13, marginTop: 13 }}><FontAwesomeIcon icon={faEdit} /></Button>
        </div>
        <MusicLibraryComposerModal
          isOpen={this.state.showModal}
          contentLabel="Composer Modal"
          viewing_composer={this.state.composer}
          new={false}
          close_modal={this.handleCloseModal}
          on_change={this.on_composer_change} />
      </div>);
    } else {
      return loading_screen();
    }

  }
}
export default withRouter(MusicLibraryComposerDetail)