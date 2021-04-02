import React from "react";
import { withRouter } from "react-router";
import Loading_animation from '../constants/images/Loading_animation.gif';

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


    loading_screen() {
        return <div className="text-center row">
            <img
                src={Loading_animation}
                alt="Loading_animation"
            />
        </div>
    }


    getGenre = () => {
        axios.get(API_URL + 'genres/' + this.props.match.params.id).then(res => this.setState({ genre: res.data, genre_confirmation: true }));
    }

    render() {
        if(this.state.genre_confirmation){
            return (<div>
                <h1>{this.state.genre.id}</h1>
                <p>{this.state.genre.category}</p>
                <p>{JSON.stringify(this.state.genre.books)}</p>
                </div>)
        }else {
            return this.loading_screen()
        }

    }
}
export default withRouter(GenreDetail)