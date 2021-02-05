import React, { Component } from "react";
import { Table } from "reactstrap";
import NewBookModal from "./new_book_modal";

import ConfirmRemovalModal from "./confirm_removal_modal";

class BookList extends Component {
  render() {
    const books = this.props.books;
    return (
      <Table dark>
        <thead>
          <tr>
            <th>Title</th>
            <th>Notes</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Series</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!books || books.length <= 0 ? (
            <tr>
              <td colSpan="6" align="center">
                <b>Ops, no books here yet</b>
              </td>
            </tr>
          ) : (
            books.map(book => (
              <tr key={book.pk}>
                <td>{book.title}</td>
                <td>{book.notes}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.series}</td>
                <td align="center">
                  <NewBookModal
                    create={false}
                    book={book}
                    resetState={this.props.resetState}
                  />
                  &nbsp;&nbsp;
                  <ConfirmRemovalModal
                    pk={book.pk}
                    resetState={this.props.resetState}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    );
  }
}

export default BookList;