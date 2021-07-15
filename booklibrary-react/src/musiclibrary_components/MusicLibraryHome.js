import React, { Component } from "react";
import { Container } from "reactstrap";
import MusicLibrarySongs from "./MusicLibrarySongs";
import loading_screen from '../components/Loading_screen';
import MusicLibraryDatabase from './MusicLibraryDatabase';
import MusicLibraryPublishers from "./MusicLibraryPublishers";
import MusicLibraryPeople from "./MusicLibraryPeople";
import MusicLibraryCollections from "./MusicLibraryCollections";

export default class MusicLibraryHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_page: this.props.current_page,
      load_page: false
    };

    this.check_if_ready_to_render = this.check_if_ready_to_render.bind(this);
  }

  componentDidUpdate(prevProps) {
    // comparison to avoid infinite loop
    if (this.props.current_page !== prevProps.current_page) {
      this.setState({ current_page: this.props.current_page })
    }
  }

  check_if_ready_to_render() {
    if (MusicLibraryDatabase.everything_loaded()) {
      this.setState({ load_page: true })
    }
  }

  componentDidMount() {
    if (!MusicLibraryDatabase.everything_loaded()) {
      MusicLibraryDatabase.resetState(this.check_if_ready_to_render);
    }
  }

  getpage = () => {
    if (MusicLibraryDatabase.everything_loaded()) {
      switch (this.state.current_page) {
        case "songs":
          return (
            <MusicLibrarySongs
              on_change={() => { MusicLibraryDatabase.resetSongs(this.check_if_ready_to_render) }}
            />
          )
        case "people":
          return (
            <MusicLibraryPeople
              on_change={() => { MusicLibraryDatabase.resetPeople(this.check_if_ready_to_render) }}
            />
          )
        case "collections":
          return (
            <MusicLibraryCollections
              on_change={() => { MusicLibraryDatabase.resetColletions(this.check_if_ready_to_render) }}
            />
          )
        case "publishers":
          return (
            <MusicLibraryPublishers
              on_change={() => { MusicLibraryDatabase.resetPublishers(this.check_if_ready_to_render) }}
            />
          )
      }
    } else {
      return loading_screen()
    }
  }

  render() {

    return (
      <div>
        <Container style={{ marginTop: "20px" }}>
          {this.getpage()}
        </Container>
      </div>
    );
  }
}