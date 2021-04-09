import React from "react";
import { withRouter } from "react-router";
import Loading_animation from '../constants/images/Loading_animation.gif';

import axios from "axios";

import { API_URL } from "../constants";
import Database from "./Database";
import loading_screen from "./Loading_screen";
import BookDataGrid from "./BookDataGrid";

class AuthorDetail extends React.Component {
    constructor() {
        super();
        this.state = {
            author: undefined,
            author_confirmation: false
        }
        this.check_if_ready_to_render = this.check_if_ready_to_render.bind(this);
    }

    check_if_ready_to_render() {
      if(Database.everything_loaded()) {
        this.getAuthor();
      }
    }
  
    componentDidMount() {
      if(!Database.everything_loaded()) {
        Database.resetState(this.check_if_ready_to_render);
      }else {
        this.getAuthor();
      }
    }

    getAuthor = () => {
        axios.get(API_URL + 'authors/' + this.props.match.params.id).then(res => this.setState({ author: res.data, author_confirmation: true }));
    }

    render() {
        if(this.state.author_confirmation){
            return (<div className="container">
                <h1>{this.state.author.last_name + ', ' + this.state.author.first_name}</h1>
                <BookDataGrid
                books={this.state.author.books}
                on_change={() => {Database.resetBooks(this.check_if_ready_to_render)}}
                authors={Database.authors}
                genres={Database.genres}
                series={Database.series}
                />
                </div>)
        }else {
            return loading_screen()
        }

    }
}
export default withRouter(AuthorDetail)