import React from "react";
import { withRouter } from "react-router";
import loading_screen from './Loading_screen'

import axios from "axios";

import { API_URL } from "../constants";

class GenreDetail extends React.Component {
    constructor() {
        super();
        this.state = {
            genre: undefined,
            genre_confirmation: false
        }
    }
  
    componentDidMount() {
      this.getGenre();
    }


    getGenre = () => {
        axios.get(API_URL + 'genres/' + this.props.match.params.id).then(res => this.setState({ genre: res.data, genre_confirmation: true }));
    }

    render() {
        if(this.state.genre_confirmation){
            return (<div className="container">
                <h1>{this.state.genre.category}</h1>
                {/* <p>{JSON.stringify(this.state.genre.books)}</p> */}
                </div>)
        }else {
            return loading_screen
        }

    }
}
export default withRouter(GenreDetail)