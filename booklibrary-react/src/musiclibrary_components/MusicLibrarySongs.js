import React from "react";
import ReactModal from 'react-modal';
import { Button } from "reactstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import MusicLibraryDatabase from "./MusicLibraryDatabase";
import MusicLibrarySongDataGrid from "./MusicLibrarySongDataGrid"
import MusicLibrarySongPage from "./MusicLibrarySongPage";
ReactModal.setAppElement('#root')

export default class MusicLibrarySongs extends React.Component {
  constructor() {
    super();
    this.state = {
      showSongPage: false,
      hide_page: false
    };

    this.check_if_ready_to_render = this.check_if_ready_to_render.bind(this);
    this.handleOpenSongPage = this.handleOpenSongPage.bind(this);
    this.handleCloseSongPage = this.handleCloseSongPage.bind(this);
  }

  check_if_ready_to_render() {
    if (MusicLibraryDatabase.everything_loaded()) {
      this.setState();
    }
  }

  handleOpenSongPage() {
    MusicLibraryDatabase.resetState(this.check_if_ready_to_render)
    this.setState({ showSongPage: true });
  }

  handleCloseSongPage() {
    this.setState({ showSongPage: false });
  }

  render() {
    if (this.state.showSongPage) {
      return <div><MusicLibrarySongPage
        contentLabel="Song Modal"
        new={true}
        close_song_page={this.handleCloseSongPage}
        on_change={this.props.on_change}
        showCreateButtons={true} /></div>
    } else {
      return (
        <div>
          <div>
            <Button style={{ float: "right" }} outline color="info" className="Add_button"
              onClick={() => {
                this.setState({
                  showSongPage: true,
                  creating_new_song: true,
                });
              }}
            ><FontAwesomeIcon icon={faPlusSquare} /> New Song </Button>
            <MusicLibrarySongDataGrid
              songs={MusicLibraryDatabase.songs}
              on_change={this.props.on_change}
              people={MusicLibraryDatabase.people}
              publishers={MusicLibraryDatabase.publishers}
            />
          </div>
        </div>
      );
    }
  }
}