import React from "react";
import { withRouter } from "react-router";
import loading_screen from './Loading_screen.js'

import axios from "axios";

import { API_URL } from "../constants";
import { Link } from "react-router-dom";

class BookDetail extends React.Component {
    constructor() {
        super();
        this.state = {
            book: undefined,
            book_confirmation: false
        }
    }

    componentDidMount() {
        this.getBook();
    }

    getBook = () => {
        axios.get(API_URL + 'books/' + this.props.match.params.id).then(res => this.setState({ book: res.data, book_confirmation: true }));
    }

    render() {
        if (this.state.book_confirmation) {
            return (<div className="container">
                <div>
                    <h1>{this.state.book.title}</h1>
                    {this.state.book.notes.length > 0 &&
                        <p className="card-body card" style={{ maxWidth: "75%", float: "right" }}>{this.state.book.notes}</p>
                    }
                    <div style={{ float: "left" }}>
                        <h5>Author: <Link className="btn btn-outline-secondary Nav_button" to={"/authors/" + String(this.state.book.author)}>{this.state.book.author_obj.last_name}, {this.state.book.author_obj.first_name}</Link></h5>
                        <h5>Genre: <Link className="btn btn-outline-secondary Nav_button" to={"/genres/" + String(this.state.book.genre)}>{this.state.book.genre_obj.category}</Link></h5>
                        {Object.keys(this.state.book.series_obj).length > 0 &&
                            <div>
                                <h5>Series: <Link className="btn btn-outline-secondary Nav_button" to={"/series/" + String(this.state.book.series)}>{this.state.book.series_obj.name}</Link></h5>
                                <h5>Position in Series: {this.state.book.number_in_series}</h5>
                            </div>
                        }
                    </div>
                </div>
            </div>
            )
        } else {
            return loading_screen
        }

    }
}
export default withRouter(BookDetail)