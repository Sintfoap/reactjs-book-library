import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import ReactModal from 'react-modal';

import axios from "axios";
import BookModal from "./book_modal";
import DeleteModal from "./Delete_modal";
import EditorFormatter from "./Edit_formatter.js"
import DeleteFormatter from "./Delete_formater.js"

import { API_URL } from "../constants";
import BuildDetailFormatter from "./Detail_formatter";

ReactModal.setAppElement('#root')

class BookDataGrid extends React.Component {
    constructor() {
        super();
        this.state = {
            showModal: false,
            showDeleteModal: false,
            viewing_book: {}
        };

        this.handleOpenDeleteModal = this.handleOpenDeleteModal.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.on_book_change = this.on_book_change.bind(this);
        this.on_delete_book_change = this.on_delete_book_change.bind(this);
    }

    on_book_change() {
        this.handleCloseModal()
        this.props.on_change();
    }

    on_delete_book_change() {
        axios.delete(API_URL + 'books/' + this.state.viewing_book.id).then(() => {
            this.handleCloseModal()
            this.props.on_change()
        });
    }

    handleOpenModal(row) {
        this.setState({ viewing_book: row, showModal: true });
    }

    handleOpenDeleteModal(row) {
        this.setState({ viewing_book: row, showDeleteModal: true });
    }

    handleCloseModal() {
        this.setState({ showModal: false, showDeleteModal: false });
    }


    find_author = (book) => {
        if (book.author_obj) {
            return book.author_obj.last_name + ", " + book.author_obj.first_name
        }
    }

    find_genre = (book) => {
        if (book.genre_obj) {
            return book.genre_obj.category
        }
    }

    find_series = (book) => {
        if (book.series_obj) {
            return book.series_obj.name
        }
    }

    render() {
        const columns = [
            // { key: 'id', name: 'ID' },
            { dataField: 'title', text: 'Title', filter: textFilter({ delay: 0 }), formatter: BuildDetailFormatter('/books/') },
            { dataField: 'notes', text: 'Notes', style: { width: 250 }, filter: textFilter({ delay: 0 }) },
            { dataField: 'author_name', text: 'Author', filter: textFilter({ delay: 0 }), formatter: BuildDetailFormatter('/authors/', 'author') },
            { dataField: 'genre_name', text: 'Genre', filter: textFilter({ delay: 0 }), formatter: BuildDetailFormatter('/genres/', 'genre') },
            { dataField: 'series_name', text: 'Series', filter: textFilter({ delay: 0 }), formatter: BuildDetailFormatter('/series/', 'series') },
            { dataField: 'edit', resizable: false, text: 'Edit', style: { width: 55 }, formatter: EditorFormatter },
            { dataField: 'delete', resizable: false, text: 'Delete', style: { width: 60 }, formatter: DeleteFormatter }
        ]
        let displayed_books = this.props.books.slice()
        displayed_books.forEach((item) => {
            item.author_name = this.find_author(item)
            item.genre_name = this.find_genre(item)
            item.series_name = this.find_series(item)
            item.edit = { id: item.id, on_click: this.handleOpenModal }
            item.delete = { id: item.id, on_click: this.handleOpenDeleteModal }
        })
        return (
            <div>
                <BookModal
                    isOpen={this.state.showModal}
                    contentLabel="Book Modal"
                    viewing_book={this.state.viewing_book}
                    new={false}
                    close_modal={this.handleCloseModal}
                    on_change={this.on_book_change}
                    authors={this.props.authors}
                    genres={this.props.genres}
                    series={this.props.series}
                />
                <DeleteModal
                    isOpen={this.state.showDeleteModal}
                    contentLabel="Delete Book"
                    viewing_book={this.state.viewing_book}
                    close_modal={this.handleCloseModal}
                    item_type={"Book"}
                    item_desc={this.state.viewing_book.title}
                    on_change={this.on_delete_book_change}
                />
                <BootstrapTable
                    keyField={"wut"}
                    filter={filterFactory()}
                    columns={columns}
                    data={this.props.books}
                />
            </div>
        )
    }
}

export default BookDataGrid
