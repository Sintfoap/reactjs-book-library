import React, { Component } from "react";
import { Container } from "reactstrap";
import Books from "./Books"
import Authors from "./Authors"
import Genres from "./Genres"
import Series from "./Series"
import loading_screen from './Loading_screen'

import Database from './Database'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      current_page: this.props.current_page,
      load_page: false
    };
    
    this.check_if_ready_to_render = this.check_if_ready_to_render.bind(this);
  }  

  componentDidUpdate(prevProps) {
    // comparison to avoid infinite loop
    if (this.props.current_page !== prevProps.current_page) {
      this.setState({current_page: this.props.current_page})
    }
  }

  check_if_ready_to_render() {
    if(Database.everything_loaded()) {
      this.setState({load_page: true})
    }
  }

  componentDidMount() {
    if(!Database.everything_loaded()) {
      Database.resetState(this.check_if_ready_to_render);
    }
  }

  getpage = () => {
    // console.log(this)
    if(Database.everything_loaded()){
      switch (this.state.current_page) {        
        default: case "books":
          return (
            <Books 
            books={this.state.books}
            authors={this.state.authors}
            genres={this.state.genres}
            series={this.state.series}
            on_change={() => {Database.resetBooks(this.check_if_ready_to_render)}}
            />
          )
        case "authors":
          return (
            <Authors 
            books={this.state.books}
            authors={this.state.authors}
            genres={this.state.genres}
            series={this.state.series}
            on_change={() => {Database.resetAuthors(this.check_if_ready_to_render)}}
            />
          )
        case "genres":
          return (
            <Genres 
            books={this.state.books}
            authors={this.state.authors}
            genres={this.state.genres}
            series={this.state.series}
            on_change={() => {Database.resetGenres(this.check_if_ready_to_render)}}
            />
          )
        case "series":
          return (
            <Series 
            books={this.state.books}
            authors={this.state.authors}
            genres={this.state.genres}
            series={this.state.series}
            on_change={() => {Database.resetSeries(this.check_if_ready_to_render)}}
            />
          )

      }
    } else {
      return loading_screen()
    }
  }

  render() {

    return (
      <div>
        <Container style={{ marginTop: "20px" }}>
          {this.getpage()}
        </Container>
      </div>
    );
  }
}
export default Home;