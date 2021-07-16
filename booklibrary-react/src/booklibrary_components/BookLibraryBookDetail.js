import React from "react";
import { withRouter } from "react-router";
import loading_screen from '../components/Loading_screen'
import axios from "axios";
import { BOOK_API_URL } from "../constants";
import { Link } from "react-router-dom";
import BookLibraryDatabase from "./BookLibraryDatabase";
import BookLibraryBookModal from "./BookLibraryBookModal";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { find_error_message_in_response } from "../constants/utils.js";

class BookLibraryBookDetail extends React.Component {
    constructor() {
        super();
        this.state = {
            book: undefined,
            book_confirmation: false,
            showModal: false,
            viewing_book: {}

        }
        this.check_if_ready_to_render = this.check_if_ready_to_render.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.on_book_change = this.on_book_change.bind(this);

    }

    handleOpenModal(row) {
        this.setState({ viewing_book: this.state.book, showModal: true });
        this.setState({ showModal: true });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }

    on_book_change() {
        this.handleCloseModal()
        BookLibraryDatabase.resetState(this.check_if_ready_to_render)
    }

    check_if_ready_to_render() {
        if (BookLibraryDatabase.everything_loaded()) {
            this.getBook();
        }

    }

    componentDidMount() {
        this.getBook();
    }

    getBook = () => {
        axios.get(BOOK_API_URL + 'books/' + this.props.match.params.id).then(res => this.setState({ book: res.data, book_confirmation: true })).catch((thrown) => {
            toast.error(JSON.stringify(find_error_message_in_response(thrown.response)))
        });
    }

    render() {
        if (this.state.book_confirmation) {
            return (<div>
                <div className="container">
                    {this.state.showModal &&
                        <BookLibraryBookModal
                            isOpen={this.state.showModal}
                            contentLabel="Book Modal"
                            new={false}
                            close_modal={this.handleCloseModal}
                            on_change={this.on_book_change}
                            authors={BookLibraryDatabase.authors}
                            genres={BookLibraryDatabase.genres}
                            series={BookLibraryDatabase.series}
                            viewing_book={this.state.viewing_book}
                        />
                    }
                    <div>
                        <div className="row" style={{ marginTop: 60 }}><h1>{this.state.book.title}</h1><Button href="#" outline color="primary" className="btn-sm edit-delete-button" onClick={() => this.handleOpenModal(this.state.book)} style={{ marginLeft: 13, marginTop: 13 }}><FontAwesomeIcon icon={faEdit} /></Button></div>
                        {this.state.book.notes.length > 0 &&
                            <p className="card-body card" style={{ maxWidth: "75%", float: "right" }}>{this.state.book.notes}</p>
                        }
                        <div style={{ float: "left" }}>
                            <h5>Author: <Link className="btn btn-outline-maroon Nav_button" to={"/authors/" + String(this.state.book.author.id)}>{this.state.book.author.last_name}, {this.state.book.author.first_name}</Link></h5>
                            <h5>Genre: <Link className="btn btn-outline-maroon Nav_button" to={"/genres/" + String(this.state.book.genre.id)}>{this.state.book.genre.category}</Link></h5>
                            {Object.keys(this.state.book.series).length > 0 &&
                                <div>
                                    <h5>Series: <Link className="btn btn-outline-maroon Nav_button" to={"/series/" + String(this.state.book.series.id)}>{this.state.book.series.name}</Link></h5>
                                    <h5>Position in Series: {this.state.book.number_in_series}</h5>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            )
        } else {
            return loading_screen
        }

    }
}
export default withRouter(BookLibraryBookDetail)