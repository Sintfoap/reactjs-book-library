import React from "react";
import DataGrid from 'react-data-grid';

import axios from "axios";
import NewGenreModal from "./new_genre_modal";

import { API_URL } from "../constants";

class Genres extends React.Component {
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
    this.getGenres();
    // this.getSeries();
  };

  getGenres = () => {
    axios.get(API_URL + 'genres').then(res => this.setState({ genres: res.data }));
  };

  deleteGenre = id => {
    axios.delete(API_URL + 'genres/' + id).then(res => this.setState({ genres: res.data}));
  };

  find_books = (id) =>{
    const book = this.props.books.find(book = book.id == id)
    if (book){
      return book.title
    }
  }

  render() {
    const columns = [
      { key: 'id', name: 'ID' },
      { key: 'category', name: 'Category' }
    ]

    return (
      <div>
        <NewGenreModal 
          create={true}
          on_change={() => this.resetState()}
        />
        <ul>
        <DataGrid
          columns={columns}
          rows={this.state.genres}
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

export default Genres;