import React from "react";
import { withRouter } from "react-router";
import Loading_animation from '../constants/images/Loading_animation.gif';

import axios from "axios";

import { API_URL } from "../constants";

class AuthorDetail extends React.Component {
    constructor() {
        super();
        this.state = {
            author: undefined,
            author_confirmation: false
        }
    }
  
    componentDidMount() {
      this.getAuthor();
    }


    loading_screen() {
        return <div className="text-center row">
            <img
                src={Loading_animation}
                alt="Loading_animation"
            />
        </div>
    }


    getAuthor = () => {
        axios.get(API_URL + 'authors/' + this.props.match.params.id).then(res => this.setState({ author: res.data, author_confirmation: true }));
    }

    render() {
        if(this.state.author_confirmation){
            return (<div>
                <h1>{this.state.author.id}</h1>
                <p>{this.state.author.last_name + ', ' + this.state.author.first_name}</p>
                <p>{JSON.stringify(this.state.author.books)}</p>
                </div>)
        }else {
            return this.loading_screen()
        }

    }
}
export default withRouter(AuthorDetail)