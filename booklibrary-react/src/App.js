import React, { Component, Fragment } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from "./booklibrary_components/Header";
import Home from "./booklibrary_components/home"
import GenreDetail from "./booklibrary_components/GenreDetail"
import AuthorDetail from "./booklibrary_components/AuthorDetail";
import SeriesDetail from "./booklibrary_components/SeriesDetail";
import BookDetail from "./booklibrary_components/BookDetail";
import { ToastContainer } from "react-toastify"
import Menu from "./components/Menu";
import MusicLibraryHome from "./musiclibrary_components/MusicLibraryHome";
import MusicLibraryHeader from "./musiclibrary_components/MusicLibraryHeader"

class App extends Component {
  constructor () {
    super();
    this.state={
      app: ""
    }
  }
  render() {
    return (
      <Fragment>
        <Router>
          <Switch>
            <Route path="/musiclibrary">
              <MusicLibraryHeader/>
            </Route>
            <Route path="/">
              <Header/>
            </Route>
          </Switch>
          <Switch>
            <Route path="/booklibrary/books/:id" children={<BookDetail />}>
            </Route>
            <Route path="/booklibrary/authors/:id" children={<AuthorDetail />}>
            </Route>
            <Route path="/booklibrary/genres/:id" children={<GenreDetail />}>
            </Route>
            <Route path="/booklibrary/series/:id" children={<SeriesDetail />}>
            </Route>
            <Route path="/booklibrary/books">
              <Home current_page="books"/>
            </Route>
            <Route path="/booklibrary/authors">
              <Home current_page="authors"/>
            </Route>
            <Route path="/booklibrary/genres">
              <Home current_page="genres"/>
            </Route>
            <Route path="/booklibrary/series">
              <Home current_page="series"/>
            </Route>
            <Route path="/musiclibrary/music">
              <MusicLibraryHome current_page="music"/>
            </Route>
            <Route path="/musiclibrary/composers">
              <MusicLibraryHome current_page="composers"/>
            </Route>
            <Route path="/musiclibrary/publishers">
              <MusicLibraryHome current_page="publishers"/>
            </Route>
            <Route path="/musiclibrary/tags">
              <MusicLibraryHome current_page="tags"/>
            </Route>
            <Route path="/">
              <Menu />
            </Route>
          </Switch>
          <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover></ToastContainer>
        </Router>
      </Fragment>
    );
  }
}
export default App;
