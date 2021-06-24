import axios from "axios";
import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import ReactModal from 'react-modal';
import SelectSearch from "react-select-search";
import { toast } from "react-toastify";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import BuildDetailFormatter from "../components/Detail_formatter";
import { MUSIC_API_URL } from "../constants";
import { find_error_message_in_response } from "../constants/utils";
import MusicLibrarySongPeopleDataGrid from "./MusicLibrarySongPeopleDatagrid"

import MusicLibraryDatabase from "./MusicLibraryDatabase";
import loading_screen from "../components/Loading_screen";
import { withRouter } from "react-router-dom";
ReactModal.setAppElement('#root')

class MusicLibrarySongDetail extends React.Component {
    constructor(props) {
        super(props);
        // console.log(props)
        let my_state = {
            song: undefined,
            song_confermation: false,
            viewing_song: {}
        }
        this.state = my_state;
        this.check_if_ready_to_render = this.check_if_ready_to_render.bind(this);
        // this.add_composer = this.add_composer.bind(this);
        // this.remove_composer = this.remove_composer.bind(this);
        // this.add_arranger = this.add_arranger.bind(this);
        // this.remove_arranger = this.remove_arranger.bind(this);
        // this.add_lyricist = this.add_lyricist.bind(this);
        // this.remove_lyricist = this.remove_lyricist.bind(this);
    }

    componentDidMount() {
        this.getSong();
    }

    getSong = () => {
        axios.get(MUSIC_API_URL + 'songs/' + this.props.match.params.id).then(res => this.setState({ song: res.data, song_confermation: true })).catch((thrown) => {
            toast.error(JSON.stringify(find_error_message_in_response(thrown.response)))
        })
    }

    check_if_ready_to_render() {
        if (MusicLibraryDatabase.everything_loaded()) {
            this.getSong();
        }
    }
    add_composer(composer) {
        this.setState({ composers: this.state.composers.add(composer) })
    }
    remove_composer(composer) {
        this.setState({ composers: this.state.composers.delete(composer) })
    }

    add_arranger(arranger) {
        this.setState({ arrangers: this.state.arrangers.add(arranger) })
    }
    remove_arranger(arranger) {
        this.setState({ arrangers: this.state.arrangers.delete(arranger) })
    }

    add_lyricist(lyricist) {
        this.setState({ lyricists: this.state.lyricists.add(lyricist) })
    }
    remove_lyricist(lyricist) {
        this.setState({ lyricists: this.state.lyricists.delete(lyricist) })
    }

    onDropdownChange = (id, item) => {
        this.setState({ [item.type]: id });
    };

    onChange = e => {
        console.log('here')
        this.setState({ [e.target.name]: e.target.value })
    };

    publishers_dropdown_list() {
        let items = [];
        MusicLibraryDatabase.publishers.forEach(publisher => {
            items.push(
                {
                    value: publisher.id,
                    name: publisher.name,
                    type: 'publisher',

                });
        });
        return items;
    }



    editSong = e => {
        e.preventDefault();
        // console.log("here")
        let song_obj = this.state.song;
        song_obj.publisher = parseInt(song_obj.publisher);
        axios.put(MUSIC_API_URL + 'songs/' + this.state.song.id, song_obj).then((response) => {
            toast.success("Successfully edited Song: " + song_obj.title);
            this.props.on_change();
            this.setState({ saved: true })
        }).catch((thrown) => {
            toast.error(JSON.stringify(find_error_message_in_response(thrown.response)));
        });
    };

    render() {
        if (this.state.song_confermation) {
            return (
                <div className="container">
                    <Form onSubmit={this.editSong} className="row">
                        <FormGroup className="col-12">
                            <Label for="title">Title:</Label>
                            <Input
                                type="text"
                                name="title"
                                onChange={this.onChange}
                                value={this.state.song.title || ""}
                                required={true}
                            />
                        </FormGroup>
                        <FormGroup className="col-12">
                            <Label for="notes">Notes:</Label>
                            <Input
                                type="textarea"
                                name="notes"
                                onChange={this.onChange}
                                value={this.state.song.notes || ""}
                                required={true}
                            />
                        </FormGroup>
                        <FormGroup className="col-12">
                            <Label className="col-6" for="publisher">
                                <SelectSearch
                                    name="publisher"
                                    search
                                    placeholder="Select a Publisher"
                                    value={this.state.song.publisher || ""}
                                    options={this.publishers_dropdown_list()}
                                    onChange={this.onDropdownChange}
                                /></Label>
                        </FormGroup>

                        {this.state.saved == true &&
                            <FormGroup className="col-12">
                                <Label className="col-6">
                                    <MusicLibrarySongPeopleDataGrid
                                        song_id={this.state.id}
                                        relationship={"composers"}
                                        related_people={this.state.song.composers}
                                        add_relationship_function={this.add_composer}
                                        remove_relationship_function={this.remove_composer}
                                    />
                                </Label>
                                <Label className="col-6">
                                    <MusicLibrarySongPeopleDataGrid
                                        song_id={this.state.id}
                                        relationship={"arrangers"}
                                        related_people={this.state.song.arrangers}
                                        add_relationship_function={this.add_arranger}
                                        remove_relationship_function={this.remove_arranger}
                                    />
                                </Label>
                            </FormGroup>}
                        {this.state.saved == true &&
                            <FormGroup className="col-12">
                                <Label className="col-6" for="arrangers">
                                    <MusicLibrarySongPeopleDataGrid
                                        song_id={this.state.id}
                                        relationship={"lyricists"}
                                        related_people={this.state.song.lyricists}
                                        add_relationship_function={this.add_lyricist}
                                        remove_relationship_function={this.remove_lyricist}
                                    /></Label>
                            </FormGroup>}
                        <br></br>
                        <form onSubmit={e => { e.preventDefault(); }} className="col-12"><Button>Submit</Button>
                            <Button href="/musiclibrary/music" className={"close_modal_button"} style={{ float:'right'}}>Cancel</Button></form>
                    </Form>
                </div>
            );
        } else {
            return loading_screen
        }
    }
}
export default withRouter(MusicLibrarySongDetail)