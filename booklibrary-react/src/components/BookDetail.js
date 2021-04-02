import React from "react";
import { withRouter } from "react-router";
import Loading_animation from '../constants/images/Loading_animation.gif';

import axios from "axios";

import { API_URL } from "../constants";

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


    loading_screen() {
        return <div className="text-center row">
            <img
                src={Loading_animation}
                alt="Loading_animation"
            />
        </div>
    }


    getBook = () => {
        axios.get(API_URL + 'books/' + this.props.match.params.id).then(res => this.setState({ book: res.data, book_confirmation: true }));
    }

    render() {
        if(this.state.book_confirmation){
            return (<div>
                <h1>{this.state.book.id}</h1>
                <p>{this.state.book.title}</p>
                <p>{this.state.book.notes}</p>
                <p>{JSON.stringify(this.state.book.author_obj)}</p>
                <p>{JSON.stringify(this.state.book.genre_obj)}</p>
                <p>{JSON.stringify(this.state.book.series_obj)}</p>
                </div>)
        }else {
            return this.loading_screen()
        }

    }
}
export default withRouter(BookDetail)