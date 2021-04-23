import React, { Component, Fragment } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/home"
import GenreDetail from "./components/GenreDetail"
import AuthorDetail from "./components/AuthorDetail";
import SeriesDetail from "./components/SeriesDetail";
import BookDetail from "./components/BookDetail";
import { ToastContainer } from "react-toastify"

class App extends Component {
  render() {
    return (
      <Fragment>
        <Router>
          <Header />
          <Switch>
            <Route path="/books/:id" children={<BookDetail />}>
            </Route>
            <Route path="/authors/:id" children={<AuthorDetail />}>
            </Route>
            <Route path="/genres/:id" children={<GenreDetail />}>
            </Route>
            <Route path="/series/:id" children={<SeriesDetail />}>
            </Route>
            <Route path="/books">
              <Home current_page="books"/>
            </Route>
            <Route path="/authors">
              <Home current_page="authors"/>
            </Route>
            <Route path="/genres">
              <Home current_page="genres"/>
            </Route>
            <Route path="/series">
              <Home current_page="series"/>
            </Route>
            <Route path="/">
              <Home current_page="books"/>
            </Route>
          </Switch>
          <ToastContainer
          position="top-right"
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
