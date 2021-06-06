import React from "react";
import ReactModal from 'react-modal';
import SelectSearch from "react-select-search";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import MusicLibraryDatabase from "./MusicLibraryDatabase";
ReactModal.setAppElement('#root')

export default class MusicLibraryNewSongPage extends React.Component {
    constructor() {
        super();
        this.state = {
            showModal: false
        };
        this.check_if_ready_to_render = this.check_if_ready_to_render.bind(this);
    }

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
    render() {
        return (
            <div className="container">
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
                    <Label for="notes">Notes:</Label>
                    <Input
                        type="textarea"
                        name="notes"
                        onChange={this.onChange}
                        value={this.state.notes || ""}
                        required={true}
                    />
                </FormGroup>
                <FormGroup>
                    <Label className="col-6" for="publisher">
                        <SelectSearch
                            name="publisher"
                            search
                            placeholder="Select a Publisher"
                            value={this.state.publisher || ""}
                            options={this.publishers_dropdown_list()}
                            onChange={this.onDropdownChange}
                        /></Label>
                    <Label className="col-6">
                        <SelectSearch
                            closeOnSelect={false}
                            printOptions="on-focus"
                            multiple
                            placeholder="Select Composer(s)"
                            value={this.state.composers || ""}
                            options={this.people_dropdown_list()}
                        />
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label className="col-6">
                        <SelectSearch
                            closeOnSelect={false}
                            printOptions="on-focus"
                            multiple
                            placeholder="Select Arranger(s)"
                            value={this.state.composers || ""}
                            options={this.people_dropdown_list()}
                        />
                    </Label>
                    <Label className="col-6">
                        <SelectSearch
                            closeOnSelect={false}
                            printOptions="on-focus"
                            multiple
                            placeholder="Select Lyricist(s)"
                            value={this.state.composers || ""}
                            options={this.people_dropdown_list()}
                        />
                    </Label>
                </FormGroup>

            </div>
        );
    }
}