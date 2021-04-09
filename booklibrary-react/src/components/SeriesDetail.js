import React from "react";
import { withRouter } from "react-router";
import loading_screen from './Loading_screen'

import axios from "axios";

import { API_URL } from "../constants";

class SeriesDetail extends React.Component {
    constructor() {
        super();
        this.state = {
            series: undefined,
            series_confirmation: false
        }
    }
  
    componentDidMount() {
      this.getSeries();
    }


    getSeries = () => {
        axios.get(API_URL + 'series/' + this.props.match.params.id).then(res => this.setState({ series: res.data, series_confirmation: true }));
    }

    render() {
        if(this.state.series_confirmation){
            return (<div className="container">
                <h1>{this.state.series.name}</h1>
                {/* <p>{JSON.stringify(this.state.series.books)}</p> */}
                </div>)
        }else {
            return loading_screen
        }

    }
}
export default withRouter(SeriesDetail)