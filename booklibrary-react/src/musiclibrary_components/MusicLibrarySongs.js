import React from "react";
import ReactModal from 'react-modal';
import { Button } from "reactstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import MusicLibraryDatabase from "./MusicLibraryDatabase";
import BootstrapTable from "react-bootstrap-table-next";

ReactModal.setAppElement('#root')

export default class MusicLibraryMusic extends React.Component {
  constructor () {
    super();
    this.state = {
      showModal: false
    };

    this.check_if_ready_to_render = this.check_if_ready_to_render.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.on_song_change = this.on_song_change.bind(this);
  }

  check_if_ready_to_render() {
    if(MusicLibraryDatabase.everything_loaded()) {
      this.setState();
    }
  }
  handleOpenModal () {
    MusicLibraryDatabase.resetState(this.check_if_ready_to_render)
    this.setState({ showModal: true });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }

  on_song_change() {
    this.handleCloseModal()
    this.props.on_change();
  }
  render() {
    const columns = [
      {dataField: 'name', text: 'Name '},
      {dataField: 'notes', text: 'Notes '}
    ]
    return (
      <div>
        <BootstrapTable
          keyField={"wut"}
          columns={columns}
          data={MusicLibraryDatabase.songs}
          />
      </div>
      );
  }
}