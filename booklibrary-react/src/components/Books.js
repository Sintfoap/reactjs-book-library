import React from "react";
import DataGrid from 'react-data-grid';

import axios from "axios";
import NewBookModal from "./new_book_modal";

import { API_URL } from "../constants";

class Books extends React.Component {
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
    this.getBooks();
    // this.getAuthors();
    // this.getGenres();
    // this.getSeries();
  };

  getBooks = () => {
    axios.get(API_URL + 'books').then(res => this.setState({ books: res.data }));
  };

  deleteBook = id => {
    axios.delete(API_URL + 'books/' + id).then(res => this.setState({ books: res.data}));
  };

  find_author = (id) => {
    const author = this.props.authors.find(author => author.id == id)
    if(author){
      return author.first_name + " " + author.last_name
    }
  }

  find_genre = (id) => {
    const genre = this.props.genres.find(genre => genre.id == id)
    if(genre){
      return genre.category
    }
  }

  find_series = (id) => {
    const series = this.props.series.find(series => series.id == id)
    if(series){
      return series.name
    }
  }

  render() {
    const columns = [
      { key: 'id', name: 'ID' },
      { key: 'title', name: 'Title' },
      { key: 'notes', name: 'Notes' },
      { key: 'author_name', name: 'Author' },
      { key: 'genre_name', name: 'Genre' },
      { key: 'series_name', name: 'Series' }
    ]
    let displayed_books = this.state.books.slice()
    displayed_books.forEach((item,index) => {
      item.author_name = this.find_author(item.author)
      item.genre_name = this.find_genre(item.genre)
      item.series_name = this.find_series(item.series)
    })

    return (
      <div>
        <NewBookModal 
          create={true}
          on_change={() => this.resetState()}
        />
        <DataGrid
          columns={columns}
          rows={this.state.books}
          defaultColumnOptions={{
            sortable: true,
            resizable: true
          }}
        />
      </div>
      );
  }
}

export default Books;