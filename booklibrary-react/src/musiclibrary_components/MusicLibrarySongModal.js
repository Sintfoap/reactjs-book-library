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
import MusicLibraryPublisherModal from "./MusicLibraryPublisherModal";
// import BookLibrarySeriesModal from "./BookLibrarySeriesModal";
import { toast } from "react-toastify";
import MusicLibraryComposerModal from "./MusicLibraryComposerModal";

export default class MusicLibrarySongModal extends React.Component {
    constructor(props) {
        super(props);
        // console.log(props)
        let my_state = this.build_state();
        this.state = my_state;
        this.check_if_ready_to_render = this.check_if_ready_to_render.bind(this);
        this.handleOpenComposerModal = this.handleOpenComposerModal.bind(this);
        this.handleCloseComposerModal = this.handleCloseComposerModal.bind(this);
        this.on_composer_change = this.on_composer_change.bind(this);
        this.handleOpenPublisherModal = this.handleOpenPublisherModal.bind(this);
        this.handleClosePublisherModal = this.handleClosePublisherModal.bind(this);
        this.on_publisher_change = this.on_publisher_change.bind(this);
        // this.handleOpenSeriesModal = this.handleOpenSeriesModal.bind(this);
        // this.handleCloseSeriesModal = this.handleCloseSeriesModal.bind(this);
        // this.on_series_change = this.on_series_change.bind(this);
    }

    build_state() {
        if (!this.props.new) {
            return {
                id: this.props.viewing_song.id,
                name: this.props.viewing_song.name,
                notes: this.props.viewing_song.notes,
                composer: this.props.viewing_song.composer,
                publisher: this.props.viewing_song.publisher,
                // series: this.props.viewing_song.series,
                // number_in_series: this.props.viewing_song.number_in_series,
                showComposerModal: false,
                showPublisherModal: false,
                // showSeriesModal: false,
                // owned: this.props.viewing_book.owned
            };
        } else {
            return {
                id: -1,
                name: "",
                notes: "",
                composer: "",
                publisher: "",
                // series: "",
                // number_in_series: "",
                showComposerModal: false,
                showPublisherModal: false,
                // showSeriesModal: false,
                // owned: true
            };
        }
    }

    handleOpenComposerModal() {
        // this.props.close_modal()
        this.setState({ showComposerModal: true });
    }

    handleCloseComposerModal() {
        this.setState({ showComposerModal: false });
    }

    on_composer_change() {
        this.handleCloseComposerModal();
        MusicLibraryDatabase.resetState(this.check_if_ready_to_render);
    }

    handleOpenPublisherModal() {
        this.setState({ showPublisherModal: true });
    }

    handleClosePublisherModal() {
        this.setState({ showPublisherModal: false });
    }

    on_publisher_change() {
        this.handleClosePublisherModal();
        MusicLibraryDatabase.resetState(this.check_if_ready_to_render);
    }

    // handleOpenSeriesModal() {
    //     this.setState({ showSeriesModal: true });
    // }

    // handleCloseSeriesModal() {
    //     this.setState({ showSeriesModal: false });
    // }

    // on_series_change() {
    //     this.handleCloseSeriesModal();
    //     BookLibraryDatabase.resetState(this.check_if_ready_to_render);
    // }

    check_if_ready_to_render() {
        // console.log("check_if_ready_to_render");
        if (MusicLibraryDatabase.everything_loaded()) {
            this.setState({});
        }
    }

    componentDidUpdate(prevProps) {
        // comparison to avoid infinite loop
        if (this.props !== prevProps) {
            this.setState(this.build_state());
        }
    }

    onChange = e => {
        // console.log(e)
        this.setState({ [e.target.name]: e.target.checked });
    };

    onDropdownChange = (id, item) => {
        // console.log(id, item)
        this.setState({ [item.type]: id });
    };

    createSong = e => {
        e.preventDefault();
        let song_obj = this.state;
        song_obj.publisher = parseInt(song_obj.publisher);
        song_obj.composer = parseInt(song_obj.composer);
        // book_obj.series = book_obj.series === " " ? "" : parseInt(book_obj.series);
        // book_obj.number_in_series = book_obj.number_in_series === " " ? "" : parseInt(book_obj.number_in_series);
        // if (book_obj.series === "") {
        //     delete book_obj.series;
        // }
        // if (book_obj.number_in_series === "") {
        //     delete book_obj.number_in_series;
        // }
        console.log(this.state);
        axios.post(MUSIC_API_URL + 'songs', this.state).then(() => {
            toast.success("Successfully created Song: " + song_obj.name);
            this.props.on_change();
        }).catch((thrown) => {
            console.log(thrown);
            toast.error(JSON.stringify(find_error_message_in_response(thrown.response)));
        });
    };

    editSong = e => {
        e.preventDefault();
        let song_obj = this.state;
        song_obj.publisher = parseInt(song_obj.publisher);
        song_obj.composer = parseInt(song_obj.composer);
        // song_obj.series = book_obj.series === " " ? "" : parseInt(book_obj.series);
        // book_obj.number_in_series = book_obj.number_in_series === " " ? "" : parseInt(book_obj.number_in_series);
        axios.put(MUSIC_API_URL + 'songs/' + song_obj.id, song_obj).then(() => {
            this.props.on_change();
            toast.success("Successfully edited Song: " + song_obj.name);
        }).catch((thrown) => {
            toast.error(JSON.stringify(find_error_message_in_response(thrown.response)));
        });
    };

    composers_dropdown_list() {
        let items = [];
        MusicLibraryDatabase.composers.forEach(composer => {
            items.push(
                {
                    value: composer.id,
                    name: composer.last_name + ", " + composer.first_name,
                    type: 'composer'
                });
        });
        return items;
    }

    publishers_dropdown_list() {
        let items = [];
        MusicLibraryDatabase.publishers.forEach(publisher => {
            items.push(
                {
                    value: publisher.id,
                    name: publisher.category,
                    type: 'publisher'
                });
        });
        return items;
    }

    // series_dropdown_list() {
    //     let items = [{
    //         value: " ",
    //         name: "",
    //         type: 'series'
    //     }];
    //     BookLibraryDatabase.series.forEach(series => {
    //         items.push(
    //             {
    //                 value: series.id,
    //                 name: series.name,
    //                 type: 'series'
    //             });
    //     });
    //     return items;
    // }

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
                <MusicLibraryComposerModal
                    isOpen={this.state.showComposerModal}
                    contentLabel="Composer Modal"
                    viewing_composer={this.state.composer}
                    new={true}
                    close_modal={this.handleCloseComposerModal}
                    on_change={this.on_composer_change} />
                <MusicLibraryPublisherModal
                    isOpen={this.state.showPublisherModal}
                    contentLabel="Publisher Modal"
                    viewing_publisher={this.state.publisher}
                    new={true}
                    close_modal={this.handleClosePublisherModal}
                    on_change={this.on_publisher_change} />
                {/* <BookLibrarySeriesModal
                    isOpen={this.state.showSeriesModal}
                    contentLabel="Series Modal"
                    viewing_genre={this.state.series}
                    new={true}
                    close_modal={this.handleCloseSeriesModal}
                    on_change={this.on_series_change} /> */}
                {this.state.showComposerModal === this.state.showPublisherModal === false &&
                    <ReactModal
                        isOpen={this.props.isOpen}
                        style={customStyles}
                    > 
                    {/* === this.state.showSeriesModal */}
                        <Form onSubmit={this.props.new ? this.c : this.editSong}>
                            <FormGroup>
                                <Label for="name">Name:</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    onChange={this.onChange}
                                    value={this.state.name || ""}
                                    required={true} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="notes">Notes:</Label>
                                <Input
                                    type="textarea"
                                    name="notes"
                                    onChange={this.onChange}
                                    value={this.state.notes || ""}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label className="col-11" for="composer">Composer:
                                <SelectSearch
                                        name="composer"
                                        search
                                        placeholder="Select an Composer"
                                        value={this.state.composer || ""}
                                        options={this.composers_dropdown_list()}
                                        onChange={this.onDropdownChange}
                                    />
                                </Label>
                                {this.props.showCreateButtons &&
                                    <Button href="#" outline color="success" className="btn-sm edit-delete-button" onClick={() => this.handleOpenComposerModal()} style={{ marginTop: 30, float: "right" }}><FontAwesomeIcon icon={faPlusSquare}></FontAwesomeIcon></Button>}
                            </FormGroup>
                            <FormGroup>
                                <Label className="col-11" for="publisher">Publisher:
                                <SelectSearch
                                        name="publisher"
                                        search
                                        placeholder="Select a Publisher"
                                        value={this.state.publisher || ""}
                                        options={this.publishers_dropdown_list()}
                                        onChange={this.onDropdownChange}
                                    />
                                </Label>
                                {this.props.showCreateButtons &&
                                    <Button href="#" outline color="success" className="btn-sm edit-delete-button" onClick={() => this.handleOpenPublisherModal()} style={{ marginTop: 30, float: "right" }}><FontAwesomeIcon icon={faPlusSquare}></FontAwesomeIcon></Button>}
                            </FormGroup>
                            {/* <FormGroup>
                                <Label className="col-11" for="series">Series:
                                <SelectSearch
                                        className="select-search"
                                        name="series"
                                        search
                                        placeholder="Select a Series"
                                        value={this.state.series || ""}
                                        options={this.series_dropdown_list()}
                                        onChange={this.onDropdownChange}
                                    /> */}
                                {/* </Label> */}
                                {/* {this.props.showCreateButtons &&
                                    <Button href="#" outline color="success" className="btn-sm edit-delete-button" onClick={() => this.handleOpenSeriesModal()} style={{ marginTop: 30, float: "right" }}><FontAwesomeIcon icon={faPlusSquare}></FontAwesomeIcon></Button>}
                            </FormGroup> */}
                            {/* {(this.state.series) !== "" && (this.state.series) !== " " && (this.state.series) !== undefined && (this.state.series) !== null &&
                                <FormGroup>
                                    <Label for="number_in_series">Number in Series:</Label>
                                    <Input
                                        type="number"
                                        name="number_in_series"
                                        onChange={this.onChange}
                                        value={this.state.number_in_series || ""} />
                                </FormGroup>} */}
                            {/* <FormGroup check>
                                <Label check for="owned"></Label>
                                <Input
                                    type="checkbox"
                                    name="owned"
                                    onChange={this.onChange}
                                    checked={this.state.owned || false}
                                />Owned
                            </FormGroup> */}
                            <form onSubmit={e => { e.preventDefault(); }}><Button>Submit</Button>
                                <Button onClick={this.props.close_modal} className={"close_modal_button"}>Cancel</Button></form>
                        </Form>
                    </ReactModal>}
            </div>
        );
    }
}
