import React from "react";
import ReactModal from 'react-modal';
import { Button } from "reactstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import MusicLibraryDatabase from "./MusicLibraryDatabase";
import MusicLibrarySongModal from "./MusicLibrarySongModal"
import MusicLibrarySongDataGrid from  "./MusicLibrarySongDataGrid"
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
    // const columns = [
    //   {dataField: 'name', text: 'Name '},
    //   {dataField: 'notes', text: 'Notes '}
    // ]
    return (
      <div>
        <MusicLibrarySongModal
          isOpen={this.state.showModal}
          contentLabel="Song Modal"
          new={true}
          close_modal={this.handleCloseModal}
          on_change={this.on_song_change}
          composers={MusicLibraryDatabase.composers}
          publishers={MusicLibraryDatabase.publishers}
          // series={MusicLibraryDatabase.series}
          showCreateButtons={true} />
        <div>
          <Button style={{ float: "right" }} outline color="success" className="Add_button" onClick={() => {
            this.setState({
              showModal: true,
              creating_new_song: true
            });
          }}><FontAwesomeIcon icon={faPlusSquare} /> New Book </Button>
          <MusicLibrarySongDataGrid
            songs={MusicLibraryDatabase.songs}
            on_change={this.props.on_change}
            composers={MusicLibraryDatabase.composers}
            publishers={MusicLibraryDatabase.publishers}
            // series={MusicLibraryDatabase.series}
            />
        </div>
      </div>
    );
  }
}
// filter_unowned={true} 