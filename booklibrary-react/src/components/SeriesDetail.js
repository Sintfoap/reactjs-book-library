import React from "react";
import { withRouter } from "react-router";
import Loading_animation from '../constants/images/Loading_animation.gif';

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


    loading_screen() {
        return <div className="text-center row">
            <img
                src={Loading_animation}
                alt="Loading_animation"
            />
        </div>
    }


    getSeries = () => {
        axios.get(API_URL + 'series/' + this.props.match.params.id).then(res => this.setState({ series: res.data, series_confirmation: true }));
    }

    render() {
        if(this.state.series_confirmation){
            return (<div>
                <h1>{this.state.series.id}</h1>
                <p>{this.state.series.name}</p>
                <p>{JSON.stringify(this.state.series.books)}</p>
                </div>)
        }else {
            return this.loading_screen()
        }

    }
}
export default withRouter(SeriesDetail)