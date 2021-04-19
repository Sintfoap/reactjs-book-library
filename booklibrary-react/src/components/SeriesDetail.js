import React from "react";
import { withRouter } from "react-router";
import loading_screen from './Loading_screen'

import axios from "axios";

import { API_URL } from "../constants";
import BookDataGrid from "./BookDataGrid";
import Database from "./Database";

class SeriesDetail extends React.Component {
    constructor() {
        super();
        this.state = {
            series: undefined,
            series_confirmation: false,
        }
        this.check_if_ready_to_render = this.check_if_ready_to_render.bind(this);

    }

    check_if_ready_to_render() {
      if(Database.everything_loaded()) {
        this.getSeries();
      }
    }

    componentDidMount() {
      if(!Database.everything_loaded()) {
        Database.resetState(this.check_if_ready_to_render);
      }else {
        this.getSeries();
      }
    }


    getSeries = () => {
        axios.get(API_URL + 'series/' + this.props.match.params.id).then(res => this.setState({ series: res.data, series_confirmation: true }));
    }

    render() {
        if(this.state.series_confirmation){
            return (<div className="container">
                <h1>{this.state.series.name}</h1>
                <BookDataGrid
                books={this.state.series.books}
                on_change={() => {Database.resetBooks(this.check_if_ready_to_render)}}
                authors={Database.authors}
                genres={Database.genres}
                series={Database.series}
                sort_field={"number_in_series"}
                />
                </div>)
        }else {
            return loading_screen
        }

    }
}
export default withRouter(SeriesDetail)