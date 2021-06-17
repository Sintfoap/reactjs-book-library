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
            composers: undefined,
            arrangers: undefined,
            lyricists: undefined,
            publisher: "",
            showPersonModal: false,
            showPublisherModal: false,
            // owned: true,
            // keep_creating: false
        };
        // } 
    }

    onDropdownChange = (id, item) => {
        this.setState({ [item.type]: id });
    };

    onComposerDropdownChange = (id, item) => {
        this.setState({ composers: id });
    };

    onArrangerDropdownChange = (id, item) => {
        this.setState({ arrangers: id });
    };

    onLyricistDropdownChange = (id, item) => {
        this.setState({ lyricists: id });
    };

    onChange = e => {
        // console.log(e)
        // if (e.target.name === "owned") {
        // this.setState({ [e.target.name]: e.target.checked });
        // } else if (e.target.name === "keep_creating") {
        // this.setState({ [e.target.name]: e.target.checked })
        // } else {
        this.setState({ [e.target.name]: e.target.value })
        // }
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

    people_dropdown_list() {
        let items = [];
        MusicLibraryDatabase.people.forEach(person => {
            items.push(
                {
                    value: person.id,
                    name: person.last_name + ", " + person.first_name,
                    type: 'person',

                });
        });
        return items;
    }

    check_if_ready_to_render() {
        if (MusicLibraryDatabase.everything_loaded()) {
            this.setState();
        }
    }
    on_checkbox_select() {
    }

    checkboxFormatter() {
        return <div>
            <input type="checkbox" onClick={this.on_checkbox_select} />
            <span> Owned</span>
        </div>
    }

    createSong = e => {
        e.preventDefault();
        console.log("here")
        let song_obj = this.state;
        song_obj.composers = parseInt(song_obj.composers);
        song_obj.arrangers = parseInt(song_obj.arrangers);
        song_obj.lyricists = parseInt(song_obj.lyricists);
        song_obj.publisher = parseInt(song_obj.publisher);
        axios.post(MUSIC_API_URL + 'songs', this.state).then(() => {
            toast.success("Successfully created Song: " + song_obj.title);
            this.props.on_change();
            // if (this.state.keep_creating) {
            // this.setState({id: -1, notes: "", title: ""})
            // } else {
            this.props.close_song_page();
            // }

        }).catch((thrown) => {
            toast.error(JSON.stringify(find_error_message_in_response(thrown.response)));
        });
    };

    render() {
        const Columns = [
            { dataField: 'checkbox', text: 'Select ', formatter: this.checkboxFormatter },
            { dataField: 'full_name', text: 'Name ', filter: textFilter({ delay: 0 }), formatter: BuildDetailFormatter('/musiclibrary/people/') },
          ]
          let displayed_person = MusicLibraryDatabase.people.slice();
          displayed_person.forEach((item) => {
            item.full_name = item.last_name + ", " + item.first_name;
          });
        return (
            <div className="container">
                <Form onSubmit={this.createSong}>
                    <FormGroup>
                        <Label for="title">Title:</Label>
                        <Input
                            type="text"
                            name="title"
                            onChange={this.onChange}
                            value={this.state.title || ""}
                            required={true}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label className="col-6">
                            <BootstrapTable
                                keyField={"wut"}
                                filter={filterFactory()}
                                data={displayed_person}
                                columns={Columns}
                            // closeOnSelect={false}
                            // printOptions="on-focus"
                            // multiple
                            // placeholder="Select Lyricist(s)"
                            // value={this.state.lyricists || ""}
                            // options={this.people_dropdown_list()}
                            // onChange={this.onLyricistDropdownChange}
                            />
                        </Label>
                        <Label className="col-6">
                            <BootstrapTable
                                keyField={"wut"}
                                filter={filterFactory()}
                                data={displayed_person}
                                columns={Columns}
                            // closeOnSelect={false}
                            // printOptions="on-focus"
                            // multiple
                            // placeholder="Select Composer(s)"
                            // value={this.state.composers || ""}
                            // options={this.people_dropdown_list()}
                            // onChange={this.onComposerDropdownChange}
                            />
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label className="col-6" for="arrangers" style={{ float: "right" }}>
                            <BootstrapTable
                                keyField={"wut"}
                                filter={filterFactory()}
                                columns={Columns}
                                data={displayed_person}
                            // name="arrangers"
                            // closeOnSelect={false}
                            // printOptions="on-focus"
                            // multiple
                            // placeholder="Select Arranger(s)"
                            // value={this.state.arrangers || ""}
                            // options={this.people_dropdown_list()}
                            // onChange={this.onArrangerDropdownChange}
                            /></Label>
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
                    <FormGroup>
                        <Label for="notes">Notes:</Label>
                        <Input
                            type="textarea"
                            name="notes"
                            onChange={this.onChange}
                            value={this.state.notes || ""}
                            required={true}
                        />
                    </FormGroup>
                    <form onSubmit={e => { e.preventDefault(); }}><Button>Submit</Button>
                        <Button onClick={this.props.close_song_page} className={"close_modal_button"}>Cancel</Button></form>
                </Form>
            </div>
        );
    }
}