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
ReactModal.setAppElement('#root')

export default class MusicLibrarySongPage extends React.Component {
    constructor(props) {
        super(props);
        // console.log(props)
        let my_state = this.build_state();
        this.state = my_state;
        this.check_if_ready_to_render = this.check_if_ready_to_render.bind(this);
        // this.handleOpenPersonModal = this.handleOpenPersonModal.bind(this);
        // this.handleClosePersonModal = this.handleClosePersonModal.bind(this);
        // this.on_person_change = this.on_person_change.bind(this);
        // this.handleOpenPublisherModal = this.handleOpenPUblisherModal.bind(this);
        // this.handleClosePublisherModal = this.handleClosePublisherModal.bind(this);
        // this.on_publisher_change = this.on_publisher_change.bind(this);
        this.add_composer = this.add_composer.bind(this);
        this.remove_composer = this.remove_composer.bind(this);
        this.add_arranger = this.add_arranger.bind(this);
        this.remove_arranger = this.remove_arranger.bind(this);
        this.add_lyricist = this.add_lyricist.bind(this);
        this.remove_lyricist = this.remove_lyricist.bind(this);
    }

    build_state() {
        // if (!this.props.new) {
        //     return {
        //         id: this.props.viewing_song.id,
        //         title: this.props.viewing_song.title,
        //         notes: this.props.viewing_song.notes,
        //         author: this.props.viewing_song.author,
        //         genre: this.props.viewing_song.genre,
        //         series: this.props.viewing_song.series,
        //         number_in_series: this.props.viewing_song.number_in_series,
        //         showAuthorModal: false,
        //         showGenreModal: false,
        //         showSeriesModal: false,
        //         owned: this.props.viewing_song.owned,
        //         keep_creating: false
        //     };
        // } else {
        return {
            id: -1,
            title: "",
            notes: "",
            composers: new Set(),
            arrangers: new Set(),
            lyricists: new Set(),
            publisher: "",
            saved: false
            // owned: true,
        };
        // } 
    }

    add_composer(composer){
        this.setState({ composers: this.state.composers.add(composer)})
    }
    remove_composer(composer){
        this.setState({ composers: this.state.composers.delete(composer)})
    }

    add_arranger(arranger){
        this.setState({ arrangers: this.state.arrangers.add(arranger)})
    }
    remove_arranger(arranger){
        this.setState({ arrangers: this.state.arrangers.delete(arranger)})
    }

    add_lyricist(lyricist){
        this.setState({ lyricists: this.state.lyricists.add(lyricist)})
    }
    remove_lyricist(lyricist){
        this.setState({ lyricists: this.state.lyricists.delete(lyricist)})
    }

    onDropdownChange = (id, item) => {
        this.setState({ [item.type]: id });
    };

    onChange = e => {
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

    check_if_ready_to_render() {
        if (MusicLibraryDatabase.everything_loaded()) {
            this.setState();
        }
    }

    createSong = e => {
        e.preventDefault();
        console.log("here")
        let song_obj = this.state;
        song_obj.publisher = parseInt(song_obj.publisher);
        axios.post(MUSIC_API_URL + 'songs', this.state).then((response) => {
            toast.success("Successfully created Song: " + song_obj.title);
            this.props.on_change();
            this.setState({saved: true, id: response.data.id})
        }).catch((thrown) => {
            toast.error(JSON.stringify(find_error_message_in_response(thrown.response)));
        });
    };

    render() {
        return (
            <div className="container">
                <Form onSubmit={this.createSong} className="row">
                    <FormGroup className="col-12">
                        <Label for="title">Title:</Label>
                        <Input
                            type="text"
                            name="title"
                            onChange={this.onChange}
                            value={this.state.title || ""}
                            required={true}
                        />
                    </FormGroup>
                    <FormGroup className="col-12">
                        <Label for="notes">Notes:</Label>
                        <Input
                            type="textarea"
                            name="notes"
                            onChange={this.onChange}
                            value={this.state.notes || ""}
                            required={true}
                        />
                    </FormGroup>
                    <FormGroup className="col-12">
                        <Label className="col-6" for="publisher">
                            <SelectSearch
                                name="publisher"
                                search
                                placeholder="Select a Publisher"
                                value={this.state.publisher || ""}
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
                                related_people={this.state.composers}
                                add_relationship_function={this.add_composer}
                                remove_relationship_function={this.remove_composer}
                            />
                        </Label>
                        <Label className="col-6">
                            <MusicLibrarySongPeopleDataGrid
                                song_id={this.state.id}
                                relationship={"arrangers"}
                                related_people={this.state.arrangers}
                                add_relationship_function={this.add_arranger}
                                remove_relationship_function={this.remove_arranger}
                            />
                        </Label>
                    </FormGroup> }
                    {this.state.saved == true && 
                    <FormGroup className="col-12">
                        <Label className="col-6" for="arrangers">
                            <MusicLibrarySongPeopleDataGrid
                                song_id={this.state.id}
                                relationship={"lyricists"}
                                related_people={this.state.lyricists}
                                add_relationship_function={this.add_lyricist}
                                remove_relationship_function={this.remove_lyricist}
                            /></Label>
                    </FormGroup> }
                    <br></br>
                    <form onSubmit={e => { e.preventDefault(); }} className="col-12"><Button>Submit</Button>
                        <Button onClick={this.props.close_song_page} className={"close_modal_button"}>Cancel</Button></form>
                </Form>
            </div>
        );
    }
}