import React from "react";
import { withRouter } from "react-router";
import loading_screen from './Loading_screen'

import axios from "axios";

import { API_URL } from "../constants";
import BookDataGrid from "./BookDataGrid";
import Database from "./Database";

class GenreDetail extends React.Component {
    constructor() {
        super();
        this.state = {
            genre: undefined,
            genre_confirmation: false
        }
    }

    check_if_ready_to_render() {
      if(Database.everything_loaded()) {
        this.getGenre();
      }
    }

    componentDidMount() {
      if(!Database.everything_loaded()) {
        Database.resetState(this.check_if_ready_to_render);
      }else {
        this.getGenre();
      }
    }

    getGenre = () => {
        axios.get(API_URL + 'genres/' + this.props.match.params.id).then(res => this.setState({ genre: res.data, genre_confirmation: true }));
    }

    render() {
        if (this.state.genre_confirmation) {
            return (<div className="container">
                <h1>{this.state.genre.category}</h1>
                <BookDataGrid
                books={this.state.genre.books}
                on_change={() => {Database.resetBooks(this.check_if_ready_to_render)}}
                authors={Database.authors}
                genres={Database.genres}
                series={Database.series}
                />
            </div>)
        } else {
            return loading_screen
        }

    }
}
export default withRouter(GenreDetail)