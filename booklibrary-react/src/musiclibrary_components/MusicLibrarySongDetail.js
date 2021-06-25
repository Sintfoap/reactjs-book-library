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
            song_confirmation: false,
            creating_new_song: this.props.creating_new_song,
            editing: Boolean(this.props.creating_new_song)
        }
        this.state = my_state;
        this.check_if_ready_to_render = this.check_if_ready_to_render.bind(this);
        this.handle_get_song_data = this.handle_get_song_data.bind(this);
        this.create_song = this.create_song.bind(this);
        this.edit_song = this.edit_song.bind(this);
        this.add_composer = this.add_composer.bind(this);
        this.remove_composer = this.remove_composer.bind(this);
        this.add_arranger = this.add_arranger.bind(this);
        this.remove_arranger = this.remove_arranger.bind(this);
        this.add_lyricist = this.add_lyricist.bind(this);
        this.remove_lyricist = this.remove_lyricist.bind(this);
    }

    componentDidMount() {
        if(!MusicLibraryDatabase.everything_loaded()) {
            MusicLibraryDatabase.resetState(this.check_if_ready_to_render);
        } else {
            this.check_if_ready_to_render()
        }
    }

    create_song_state() {
        this.setState({
            id: -1,
            title: "",
            notes: "",
            composers: new Set(),
            arrangers: new Set(),
            lyricists: new Set(),
            publisher: "",
            creating_new_song: true,
            song_confirmation: true
        })
    }

    handle_get_song_data(data) {
        let new_state = {
            ...data,
            song_confirmation: true 
        }
        new_state.composers = new Set(new_state.composers)
        new_state.arrangers = new Set(new_state.arrangers)
        new_state.lyricists = new Set(new_state.lyricists)
        this.setState(new_state)
    }

    get_song = () => {
        axios.get(MUSIC_API_URL + 'songs/' + this.props.match.params.id).then(res => this.handle_get_song_data(res.data)).catch((thrown) => {
            toast.error(JSON.stringify(find_error_message_in_response(thrown.response)))
        })
    }

    check_if_ready_to_render() {
        if (MusicLibraryDatabase.everything_loaded()) {
            if(this.state.creating_new_song){
                this.create_song_state();
            } else {
                this.get_song();
            }
        }
    }
    add_composer(composer) {
        this.setState({ composers: this.state.composers.add(composer) })
    }
    remove_composer(composer) {
        this.state.composers.delete(composer)
        this.setState({ composers: this.state.composers })
    }

    add_arranger(arranger) {
        this.setState({ arrangers: this.state.arrangers.add(arranger) })
    }
    remove_arranger(arranger) {
        this.state.arrangers.delete(arranger)
        this.setState({ arrangers: this.state.arrangers })
    }

    add_lyricist(lyricist) {
        this.setState({ lyricists: this.state.lyricists.add(lyricist) })
    }
    remove_lyricist(lyricist) {
        this.state.lyricists.delete(lyricist)
        this.setState({ lyricists: this.state.lyricists })
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


    create_song = e => {
        e.preventDefault();
        if(this.state.publisher == ""){
            toast.warn("Publisher is required")
            return
        }
        let song_obj = {
            id: this.state.id,
            title: this.state.title,
            notes: this.state.notes,
            publisher: parseInt(this.state.publisher),
        }
        axios.post(MUSIC_API_URL + 'songs', song_obj).then((response) => {
            toast.success("Successfully created Song: " + response.data.title);
            this.props.on_change();
            this.setState({creating_new_song: false, id: response.data.id})
        }).catch((thrown) => {
            toast.error(JSON.stringify(find_error_message_in_response(thrown.response)));
        });
    };

    edit_song = e => {
        e.preventDefault();
        let song_obj = {
            id: this.state.id,
            title: this.state.title,
            notes: this.state.notes,
            publisher: parseInt(this.state.publisher),
        }
        axios.put(MUSIC_API_URL + 'songs/' + this.state.id, song_obj).then((response) => {
            toast.success("Successfully edited Song: " + song_obj.title);
            this.props.on_change();
            this.setState({ creating_new_song: false })
        }).catch((thrown) => {
            toast.error(JSON.stringify(find_error_message_in_response(thrown.response)));
        });
    };

    render() {
        if (this.state.song_confirmation) {
            return (
                <div className="container">
                    <Form onSubmit={this.state.creating_new_song ? this.create_song : this.edit_song} className="row">
                        <FormGroup className="col-12">
                            <Label for="title">Title:</Label>
                            <Input
                                type="text"
                                name="title"
                                onChange={this.onChange}
                                value={this.state.title || ""}
                                required={true}
                                disabled={!this.state.editing}
                            />
                        </FormGroup>
                        <FormGroup className="col-12">
                            <Label for="notes">Notes:</Label>
                            <Input
                                type="textarea"
                                name="notes"
                                onChange={this.onChange}
                                value={this.state.notes || ""}
                                required={false}
                                disabled={!this.state.editing}
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
                                    disabled={!this.state.editing}
                                /></Label>
                        </FormGroup>

                        {!this.state.creating_new_song &&
                            <FormGroup className="col-12">
                                <Label className="col-6">
                                    <MusicLibrarySongPeopleDataGrid
                                        song_id={this.state.id}
                                        relationship={"composers"}
                                        related_people={this.state.composers}
                                        add_relationship_function={this.add_composer}
                                        remove_relationship_function={this.remove_composer}
                                        disabled={!this.state.editing}
                                    />
                                </Label>
                                <Label className="col-6">
                                    <MusicLibrarySongPeopleDataGrid
                                        song_id={this.state.id}
                                        relationship={"arrangers"}
                                        related_people={this.state.arrangers}
                                        add_relationship_function={this.add_arranger}
                                        remove_relationship_function={this.remove_arranger}
                                        disabled={!this.state.editing}
                                    />
                                </Label>
                            </FormGroup>}
                        {!this.state.creating_new_song &&
                            <FormGroup className="col-12">
                                <Label className="col-6" for="arrangers">
                                    <MusicLibrarySongPeopleDataGrid
                                        song_id={this.state.id}
                                        relationship={"lyricists"}
                                        related_people={this.state.lyricists}
                                        add_relationship_function={this.add_lyricist}
                                        remove_relationship_function={this.remove_lyricist}
                                        disabled={!this.state.editing}
                                    /></Label>
                            </FormGroup>}
                        <br></br>
                        <Button>Submit</Button>
                            <Button href="/musiclibrary/music" className={"close_modal_button"} style={{ float:'right'}}>Cancel</Button>
                    </Form>
                </div>
            );
        } else {
            return loading_screen
        }
    }
}
export default withRouter(MusicLibrarySongDetail)