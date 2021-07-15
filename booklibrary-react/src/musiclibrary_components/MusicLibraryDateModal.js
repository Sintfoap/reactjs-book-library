import React from "react";
import ReactModal from 'react-modal';
import SelectSearch from 'react-select-search';
import 'react-select-search/style.css'
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import { MUSIC_API_URL } from "../constants";
import { find_error_message_in_response } from "../constants/utils";
import MusicLibraryDatabase from "./MusicLibraryDatabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

export default class MusicLibraryDateModal extends React.Component {
    constructor(props) {
        super(props);
        let my_state = this.build_state();
        this.state = my_state;
        this.check_if_ready_to_render = this.check_if_ready_to_render.bind(this);
    }

    build_state() {
        return {
            id: -1,
            date: "",
            description: "",
            song: this.props.song_id
        };
    }

    check_if_ready_to_render() {
        // console.log("check_if_ready_to_render");
        if (MusicLibraryDatabase.everything_loaded()) {
            this.setState({});
        }
    }

    componentDidMount() {
        this.setState(this.build_state());
    }


    onChange = e => {
        // console.log(e)
        this.setState({ [e.target.name]: e.target.value})
    };

    onDropdownChange = (id, item) => {
        this.setState({ [item.type]: id });
    };

    createDate = e => {
        // console.log(e)
        e.preventDefault();
        let date_obj = {
            date: this.state.date,
            description: this.state.description,
            song: parseInt(this.state.song)
        }
        axios.post(MUSIC_API_URL + 'dates', this.state).then(() => {
            toast.success("Successfully created Date: " + date_obj.date);
            this.props.on_change();
        }).catch((thrown) => {
            toast.error(JSON.stringify(find_error_message_in_response(thrown.response)));
        });
    };

    songs_dropdown_list() {
        let items = [];
        MusicLibraryDatabase.songs.forEach(song => {
            items.push(
                {
                    value: song.id,
                    name: song.title,
                    type: 'song',

                });
        });
        return items;
    }

    render() {
        const customStyles = {
            content: {
                "max-height": "80%",
                height: "fit-content",
                margin: "auto",
                width: "50%"
            }
        };
        return (
            <div>
                <ReactModal
                    isOpen={this.props.isOpen}
                    style={customStyles}
                >
                    <Form onSubmit={this.createDate}>
                        <FormGroup>
                            <Label for="date">Date:</Label>
                            <Input
                                type="date"
                                name="date"
                                onChange={this.onChange}
                                value={this.state.date || ""}
                                required={true} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description:</Label>
                            <Input
                                type="textarea"
                                name="description"
                                onChange={this.onChange}
                                value={this.state.description || ""}
                            />
                        </FormGroup>
                        <form onSubmit={e => { e.preventDefault(); }}><Button>Submit</Button>
                            <Button onClick={this.props.close_modal} className={"close_modal_button "}>Cancel</Button></form>
                    </Form>
                </ReactModal>
            </div>
        );
    }
}