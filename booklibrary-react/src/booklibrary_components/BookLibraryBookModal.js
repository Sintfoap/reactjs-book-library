import React from "react";
import ReactModal from 'react-modal';
import SelectSearch from 'react-select-search';
import 'react-select-search/style.css'
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import { BOOK_API_URL } from "../constants";
import { find_error_message_in_response } from "../constants/utils";
import BookLibraryDatabase from "./BookLibraryDatabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import BookLibraryGenreModal from "./BookLibraryGenreModal";
import BookLibrarySeriesModal from "./BookLibrarySeriesModal";
import { toast } from "react-toastify";
import BookLibraryAuthorModal from "./BookLibraryAuthorModal";
import { get } from "jquery";

export default class BookLibraryBookModal extends React.Component {
    constructor(props) {
        super(props);
        // console.log(props)
        let my_state = this.build_state();
        this.state = my_state;
        this.check_if_ready_to_render = this.check_if_ready_to_render.bind(this);
        this.handleOpenAuthorModal = this.handleOpenAuthorModal.bind(this);
        this.handleCloseAuthorModal = this.handleCloseAuthorModal.bind(this);
        this.on_author_change = this.on_author_change.bind(this);
        this.handleOpenGenreModal = this.handleOpenGenreModal.bind(this);
        this.handleCloseGenreModal = this.handleCloseGenreModal.bind(this);
        this.on_genre_change = this.on_genre_change.bind(this);
        this.handleOpenSeriesModal = this.handleOpenSeriesModal.bind(this);
        this.handleCloseSeriesModal = this.handleCloseSeriesModal.bind(this);
        this.on_series_change = this.on_series_change.bind(this);
    }

    build_state() {
        if (!this.props.new) {
            return {
                id: this.props.viewing_book.id,
                title: this.props.viewing_book.title,
                notes: this.props.viewing_book.notes,
                author: this.props.viewing_book.author,
                genre: this.props.viewing_book.genre,
                series: this.props.viewing_book.series,
                number_in_series: this.props.viewing_book.number_in_series,
                showAuthorModal: false,
                showGenreModal: false,
                showSeriesModal: false,
                owned: this.props.viewing_book.owned,
                keep_creating: false
            };
        } else {
            return {
                id: -1,
                title: "",
                notes: "",
                author: "",
                genre: "",
                series: "",
                number_in_series: "",
                showAuthorModal: false,
                showGenreModal: false,
                showSeriesModal: false,
                owned: true,
                keep_creating: false
            };
        }
    }

    handleOpenAuthorModal() {
        // this.props.close_modal()
        this.setState({ showAuthorModal: true });
    }

    handleCloseAuthorModal() {
        this.setState({ showAuthorModal: false });
    }

    on_author_change(new_author) {
        this.handleCloseAuthorModal();
        this.setState({ author: new_author.id }); // setting author to the newly created author
        BookLibraryDatabase.resetState(this.check_if_ready_to_render);
    }

    handleOpenGenreModal() {
        this.setState({ showGenreModal: true });
    }

    handleCloseGenreModal() {
        this.setState({ showGenreModal: false });
    }

    on_genre_change() {
        this.handleCloseGenreModal();
        BookLibraryDatabase.resetState(this.check_if_ready_to_render);
    }

    handleOpenSeriesModal() {
        this.setState({ showSeriesModal: true });
    }

    handleCloseSeriesModal() {
        this.setState({ showSeriesModal: false });
    }

    on_series_change() {
        this.handleCloseSeriesModal();
        BookLibraryDatabase.resetState(this.check_if_ready_to_render);
    }

    check_if_ready_to_render() {
        // console.log("check_if_ready_to_render");
        if (BookLibraryDatabase.everything_loaded()) {
            this.setState({});
        }
    }

    componentDidUpdate(prevProps) {
        // comparison to avoid infinite loop
        if (this.props !== prevProps) {
            if(!this.state.keep_creating){
                this.setState(this.build_state());
            }
        }
    }


    onChange = e => {
        // console.log(e)
        if (e.target.name === "owned") {
            this.setState({ [e.target.name]: e.target.checked });
        } else if (e.target.name === "keep_creating") {
            this.setState({ [e.target.name]: e.target.checked })
        } else {
            this.setState({ [e.target.name]: e.target.value })
        }
    };

    onDropdownChange = (id, item) => {
        this.setState({ [item.type]: id });
    };

    createBook = e => {
        e.preventDefault();
        let book_obj = this.state;
        book_obj.genre = parseInt(book_obj.genre);
        book_obj.author = parseInt(book_obj.author);
        book_obj.series = book_obj.series === " " || book_obj.series === undefined ? "" : parseInt(book_obj.series);
        book_obj.number_in_series = book_obj.number_in_series === " " || book_obj.number_in_series === undefined ? "" : parseInt(book_obj.number_in_series);
        // if (book_obj.series === "") {
        //     delete book_obj.series;
        // }
        // if (book_obj.number_in_series === "") {
        //     delete book_obj.number_in_series;
        // }
        // console.log(this.state);
        axios.post(BOOK_API_URL + 'books', this.state).then(() => {
            toast.success("Successfully created Book: " + book_obj.title);
            this.props.on_change();
            if (this.state.keep_creating) {
                this.setState({id: -1, notes: "", title: ""})
            } else {
                this.props.handleCloseModal();
            }

        }).catch((thrown) => {
            toast.error(JSON.stringify(find_error_message_in_response(thrown.response)));
        });
    };

    editBook = e => {
        e.preventDefault();
        let book_obj = this.state;
        book_obj.genre = parseInt(book_obj.genre);
        book_obj.author = parseInt(book_obj.author);
        book_obj.series = book_obj.series === " " ? "" : parseInt(book_obj.series);
        book_obj.number_in_series = book_obj.number_in_series === " " ? "" : parseInt(book_obj.number_in_series);
        axios.put(BOOK_API_URL + 'books/' + book_obj.id, book_obj).then(() => {
            this.props.on_change();
            toast.success("Successfully edited Book: " + book_obj.title);
        }).catch((thrown) => {
            toast.error(JSON.stringify(find_error_message_in_response(thrown.response)));
        });
    };

    authors_dropdown_list() {
        let items = [];
        BookLibraryDatabase.authors.forEach(author => {
            items.push(
                {
                    value: author.id,
                    name: author.last_name + ", " + author.first_name,
                    type: 'author',

                });
        });
        return items;
    }

    genres_dropdown_list() {
        let items = [];
        BookLibraryDatabase.genres.forEach(genre => {
            items.push(
                {
                    value: genre.id,
                    name: genre.category,
                    type: 'genre'
                });
        });
        return items;
    }

    series_dropdown_list() {
        let items = [{
            value: " ",
            name: "",
            type: 'series'
        }];
        BookLibraryDatabase.series.forEach(series => {
            items.push(
                {
                    value: series.id,
                    name: series.name,
                    type: 'series'
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
                <BookLibraryAuthorModal
                    isOpen={this.state.showAuthorModal}
                    contentLabel="Author Modal"
                    viewing_author={this.state.author}
                    new={true}
                    close_modal={this.handleCloseAuthorModal}
                    on_change={this.on_author_change} />
                <BookLibraryGenreModal
                    isOpen={this.state.showGenreModal}
                    contentLabel="Genre Modal"
                    viewing_genre={this.state.genre}
                    new={true}
                    close_modal={this.handleCloseGenreModal}
                    on_change={this.on_genre_change} />
                <BookLibrarySeriesModal
                    isOpen={this.state.showSeriesModal}
                    contentLabel="Series Modal"
                    viewing_genre={this.state.series}
                    new={true}
                    close_modal={this.handleCloseSeriesModal}
                    on_change={this.on_series_change} />
                {this.state.showAuthorModal === this.state.showGenreModal === this.state.showSeriesModal === false &&
                    <ReactModal
                        isOpen={this.props.isOpen}
                        style={customStyles}
                    >
                        <Form onSubmit={this.props.new ? this.createBook : this.editBook}>
                            <FormGroup>
                                <Label for="title">Title:</Label>
                                <Input
                                    type="text"
                                    name="title"
                                    onChange={this.onChange}
                                    value={this.state.title || ""}
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
                                <Label className="col-11" for="author">Author:
                                <SelectSearch
                                        name="author"
                                        search
                                        placeholder="Select an Author"
                                        value={this.state.author || ""}
                                        options={this.authors_dropdown_list()}
                                        onChange={this.onDropdownChange}
                                    />
                                </Label>
                                {this.props.showCreateButtons &&
                                    <Button href="#" outline className="btn-sm edit-delete-button btn-outline-maroon" onClick={() => this.handleOpenAuthorModal()} style={{ marginTop: 30, float: "right" }}><FontAwesomeIcon icon={faPlusSquare}></FontAwesomeIcon></Button>}
                            </FormGroup>
                            <FormGroup>
                                <Label className="col-11" for="genre">Genre:
                                <SelectSearch
                                        name="genre"
                                        search
                                        placeholder="Select a Genre"
                                        value={this.state.genre || ""}
                                        options={this.genres_dropdown_list()}
                                        onChange={this.onDropdownChange}
                                    />
                                </Label>
                                {this.props.showCreateButtons &&
                                    <Button href="#" outline className="btn-sm edit-delete-button btn-outline-maroon" onClick={() => this.handleOpenGenreModal()} style={{ marginTop: 30, float: "right" }}><FontAwesomeIcon icon={faPlusSquare}></FontAwesomeIcon></Button>}
                            </FormGroup>
                            <FormGroup>
                                <Label className="col-11" for="series">Series:
                                <SelectSearch
                                        className="select-search"
                                        name="series"
                                        search
                                        placeholder="Select a Series"
                                        value={this.state.series || ""}
                                        options={this.series_dropdown_list()}
                                        onChange={this.onDropdownChange}
                                    />
                                </Label>
                                {this.props.showCreateButtons &&
                                    <Button href="#" outline className="btn-sm edit-delete-button btn-outline-maroon" onClick={() => this.handleOpenSeriesModal()} style={{ marginTop: 30, float: "right" }}><FontAwesomeIcon icon={faPlusSquare}></FontAwesomeIcon></Button>}
                            </FormGroup>
                            {(this.state.series) !== "" && (this.state.series) !== " " && (this.state.series) !== undefined && (this.state.series) !== null &&
                                <FormGroup>
                                    <Label for="number_in_series">Number in Series:</Label>
                                    <Input
                                        type="number"
                                        name="number_in_series"
                                        onChange={this.onChange}
                                        value={this.state.number_in_series || ""} />
                                </FormGroup>}
                            <FormGroup check>
                                <Label check for="owned"></Label>
                                <Input
                                    type="checkbox"
                                    name="owned"
                                    onChange={this.onChange}
                                    checked={this.state.owned || false}
                                />Owned
                            </FormGroup>
                            {this.props.showCreateButtons &&
                                <FormGroup check>
                                    <Label check for="keep_creating"></Label>
                                    <Input
                                        type="checkbox"
                                        name="keep_creating"
                                        onChange={this.onChange}
                                        checked={this.state.keep_creating || false}
                                    />Keep Creating
                            </FormGroup>}
                            <form onSubmit={e => { e.preventDefault(); }}><Button className={"btn-outline-maroon"}>Submit</Button>
                                <Button onClick={this.props.close_modal} className={"close_modal_button btn-outline-maroon"}>Cancel</Button></form>
                        </Form>
                    </ReactModal>}
            </div>
        );
    }
}