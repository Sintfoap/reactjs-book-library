import React from "react";
import DataGrid from 'react-data-grid';

import axios from "axios";

import { API_URL } from "../constants";

class Series extends React.Component {
  state = {
    books: [],
    authors: [],
    genres: [],
    series:[],
  };

  componentDidMount() {
    this.resetState();
  }

  resetState = () => {
    // this.getBooks();
    // this.getAuthors();
    // this.getGenres();
    this.getSeries();
  };

  getSeries = () => {
    axios.get(API_URL + 'series').then(res => this.setState({ series: res.data }));
  };

  deleteSeries = id => {
    axios.delete(API_URL + 'series/' + id).then(res => this.setState({ series: res.data}));
  };

  render() {
    const columns = [
      { key: 'id', name: 'ID' },
      { key: 'name', name: 'Name' }
    ]

    return (
      <div>
        <ul>
        <DataGrid
          columns={columns}
          rows={this.state.series}
          defaultColumnOptions={{
            sortable: true,
            resizable: true
          }}
        />
        </ul>
      </div>
      );
  }
}

export default Series;