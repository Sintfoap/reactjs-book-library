import React from "react";
import DataGrid from 'react-data-grid';

import axios from "axios";

import { API_URL } from "../constants";

class Series extends React.Component {

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
          rows={this.props.series}
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