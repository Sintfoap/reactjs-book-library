import React, { Component, Fragment } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import BookLibraryHeader from "./booklibrary_components/BookLibraryHeader";
import BookLibraryHome from "./booklibrary_components/BookLibraryHome"
import BookLibraryGenreDetail from "./booklibrary_components/BookLibraryGenreDetail"
import BookLibraryAuthorDetail from "./booklibrary_components/BookLibraryAuthorDetail";
import BookLibrarySeriesDetail from "./booklibrary_components/BookLibrarySeriesDetail";
import BookLibraryBookDetail from "./booklibrary_components/BookLibraryBookDetail";
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
            <Route path="/booklibrary">
              <BookLibraryHeader/>
            </Route>
          </Switch>
          <Switch>
            <Route path="/booklibrary/books/:id" children={<BookLibraryBookDetail />}>
            </Route>
            <Route path="/booklibrary/authors/:id" children={<BookLibraryAuthorDetail />}>
            </Route>
            <Route path="/booklibrary/genres/:id" children={<BookLibraryGenreDetail />}>
            </Route>
            <Route path="/booklibrary/series/:id" children={<BookLibrarySeriesDetail />}>
            </Route>
            <Route path="/booklibrary/books">
              <BookLibraryHome current_page="books"/>
            </Route>
            <Route path="/booklibrary/authors">
              <BookLibraryHome current_page="authors"/>
            </Route>
            <Route path="/booklibrary/genres">
              <BookLibraryHome current_page="genres"/>
            </Route>
            <Route path="/booklibrary/series">
              <BookLibraryHome current_page="series"/>
            </Route>
            <Route path="/musiclibrary/music">
              <MusicLibraryHome current_page="songs"/>
            </Route>
            <Route path="/musiclibrary/composers">
              <MusicLibraryHome current_page="composers"/>
            </Route>
            <Route path="/musiclibrary/publishers">
              <MusicLibraryHome current_page="publishers"/>
            </Route>
            <Route path="/musiclibrary/arrangers">
              <MusicLibraryHome current_page="arrangers"/>
            </Route>
            <Route path="/musiclibrary/lyracists">
              <MusicLibraryHome current_page="lyracists"/>
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
