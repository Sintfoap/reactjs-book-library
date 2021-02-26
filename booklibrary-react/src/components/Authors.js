import React from "react";
import DataGrid from 'react-data-grid';

import axios from "axios";

import { API_URL } from "../constants";

class Authors extends React.Component {

  deleteAuthor = id => {
    axios.delete(API_URL + 'authors/' + id).then(res => this.setState({ authors: res.data}));
  };
  
  render() {
    const columns = [
      { key: 'id', name: 'ID' },
      { key: 'first_name', name: 'First_name' },
      { key: 'last_name', name: 'Last_name' },
    ]

    return (
      <div>
        <ul>
        <DataGrid
          columns={columns}
          rows={this.props.authors}
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

export default Authors;