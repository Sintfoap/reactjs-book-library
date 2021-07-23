import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import axios from "axios";
import BookLibraryBookModal from "./BookLibraryBookModal";
import DeleteModal from "../components/Delete_modal";
import EditorFormatter from "../components/Edit_formatter.js";
import DeleteFormatter from "../components/Delete_formater.js";
import { BOOK_API_URL } from "../constants";
import { find_error_message_in_response } from "../constants/utils";
import BuildDetailFormatter from "../components/Detail_formatter";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";
import sortCaret from "../components/Sort_caret";
import headerFormatter from "../components/Header_formater";

export default class BookLibraryBookDataGrid extends React.Component {
    constructor(props) {
        super(props);
        // console.log(this.props);
        this.state = {
            showModal: false,
            showDeleteModal: false,
            filterUnowned: this.props.filter_unowned === undefined ? true : this.props.filter_unowned,
            viewing_book: {}
        };
        this.handleOpenDeleteModal = this.handleOpenDeleteModal.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.on_book_change = this.on_book_change.bind(this);
        this.on_delete_book_change = this.on_delete_book_change.bind(this);
        this.sort_books = this.sort_books.bind(this);
        this.on_change_owned_filter = this.on_change_owned_filter.bind(this);
    }

    on_book_change() {
        this.handleCloseModal();
        this.props.on_change();
    }

    on_delete_book_change() {
        axios.delete(BOOK_API_URL + 'books/' + this.state.viewing_book.id).then(() => {
            this.handleCloseModal();
            this.props.on_change();
        }).catch((thrown) => {
            toast.error(JSON.stringify(find_error_message_in_response(thrown.response)));
        });
    }

    on_change_owned_filter(e) {
        this.setState({ filterUnowned: e.target.checked });
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
        if (book.author) {
            return book.author.last_name + ", " + book.author.first_name;
        }
    };

    find_genre = (book) => {
        if (book.genre) {
            return book.genre.category;
        }
    };

    find_series = (book) => {
        if (book.series) {
            if (book.number_in_series) {
                return book.series.name + " #" + book.number_in_series.toString();
            }
            return book.series.name;
        }
    };

    sort_books = (a, b) => {
        return a[this.props.sort_field] - b[this.props.sort_field];
    };

    find_owned = (book) => {
        if (!book.owned) {
            return { backgroundColor: "pink" };
        }
    };


    render() {
        const columns = [
            // { key: 'id', name: 'ID' },
            {
                dataField: 'title', text: 'Title',
                sort: true,
                sortCaret: sortCaret,
                filter: textFilter({ delay: 0 }),
                formatter: BuildDetailFormatter('/booklibrary/books/'),
                headerFormatter: headerFormatter
            },
            {
                dataField: 'notes',
                text: 'Notes',
                style: { width: 250, "fontStyle": "italic" },
                filter: textFilter({ delay: 0 }),
                headerFormatter: headerFormatter
            },
            {
                dataField: 'author_name',
                text: 'Author', filter: textFilter({ delay: 0 }),
                sort: true,
                sortCaret: sortCaret,
                formatter: BuildDetailFormatter('/booklibrary/authors/', 'author'),
                headerFormatter: headerFormatter
            },
            {
                dataField: 'genre_name',
                text: 'Genre',
                sort: true,
                sortCaret: sortCaret,
                filter: textFilter({ delay: 0 }),
                formatter: BuildDetailFormatter('/booklibrary/genres/', 'genre'),
                headerFormatter: headerFormatter
            },
            {
                dataField: 'series_name',
                text: 'Series',
                sort: true,
                sortCaret: sortCaret,
                filter: textFilter({ delay: 0 }),
                formatter: BuildDetailFormatter('/booklibrary/series/', 'series'),
                headerFormatter: headerFormatter
            },
            {
                dataField: 'edit',
                resizable: false,
                text: 'Edit',
                style: { width: 55 },
                formatter: EditorFormatter
            },
            {
                dataField: 'delete',
                resizable: false,
                text: 'Delete',
                style: { width: 60 },
                formatter: DeleteFormatter
            }
        ];
        const defaultSorted = [{
            dataField: 'author_name',
            order: 'asc'
        }]
        let displayed_books = [];
        this.props.books.forEach((item) => {
            item.author_name = this.find_author(item);
            item.genre_name = this.find_genre(item);
            item.series_name = this.find_series(item);
            item.edit = { id: item.id, on_click: this.handleOpenModal };
            item.delete = { id: item.id, on_click: this.handleOpenDeleteModal };
            if (!this.state.filterUnowned || item.owned) {
                displayed_books.push(item);
            }
        });
        if (this.props.sort_field) {
            // console.log(this.props.sort_field)
            displayed_books.sort(this.sort_books);
        }
        function indication() {
            return "Table got nothing"
        }
        const pageButtonRenderer = ({
            page,
            active,
            onPageChange,
        }) => {
            const handleClick = (e) => {
                e.preventDefault();
                onPageChange(page);
            };
            const activeStyle = {};
            if (active) {
                activeStyle.backgroundColor = '#671210';
                activeStyle.color = 'white';
            } else {
                activeStyle.backgroundColor = 'white';
                activeStyle.color = 'black';
            }
            if (typeof page === 'string') {
                activeStyle.backgroundColor = 'white';
                activeStyle.color = 'black';
            }
            return (
                <li className="page-item">
                    <a href="#" onClick={handleClick} style={activeStyle} className="btn-sm">{page}</a>
                </li>
            );
        };
        const sizePerPageRenderer = ({
            options,
            currSizePerPage,
            onSizePerPageChange
        }) => (
            <div className="btn-group" role="group">
                {
                    options.map((option) => {
                        const isSelect = currSizePerPage === `${option.page}`;
                        return (
                            <button
                                key={option.text}
                                type="button"
                                onClick={() => onSizePerPageChange(option.page)}
                                className={`btn ${isSelect ? 'btn-maroon' : 'btn-light'}`}
                            >
                                {option.text}
                            </button>
                        );
                    })
                }
            </div>
        );
        const options = {
            sizePerPageRenderer,
            pageButtonRenderer,
            paginationSize: 6,
            pageStartIndex: 1,
            // alwaysShowAllBtns: true, // Always show next and previous button
            // withFirstAndLast: false, // Hide the going to First and Last page button
            // hideSizePerPage: true, // Hide the sizePerPage dropdown always
            hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
            firstPageText: 'First',
            prePageText: 'Back',
            nextPageText: 'Next',
            lastPageText: 'Last',
            nextPageTitle: 'First page',
            prePageTitle: 'Pre page',
            firstPageTitle: 'Next page',
            lastPageTitle: 'Last page',
            showTotal: true,
            disablePageTitle: true,
            sizePerPageList: [{
                text: '10', value: 10
            }, {
                text: '15', value: 15
            }, {
                text: '20', value: 20
            }, {
                text: 'All', value: this.props.books.length
            }]
        };

        return (
            <div>
                { this.state.showModal && 
                <BookLibraryBookModal
                    isOpen={this.state.showModal}
                    contentLabel="Book Modal"
                    viewing_book={this.state.viewing_book}
                    new={false}
                    close_modal={this.handleCloseModal}
                    on_change={this.on_book_change}
                    authors={this.props.authors}
                    genres={this.props.genres}
                    series={this.props.series}
                    number_in_series={this.props.number_in_series}
                    owned={this.props.owned} />
                }
                <DeleteModal
                    isOpen={this.state.showDeleteModal}
                    contentLabel="Delete Book"
                    viewing_book={this.state.viewing_book}
                    close_modal={this.handleCloseModal}
                    item_type={"Book"}
                    item_desc={this.state.viewing_book.title}
                    on_change={this.on_delete_book_change} />
                <div style={{ float: "right", marginRight: 10, paddingTop: 7, marginBottom: 7 }}>
                    <input type="checkbox" onChange={this.on_change_owned_filter} checked={this.state.filterUnowned} />
                    <span> Owned</span>
                </div>
                <BootstrapTable
                    bootstrap4
                    keyField={"wut"}
                    filter={filterFactory()}
                    pagination={paginationFactory(options)}
                    columns={columns}
                    data={displayed_books}
                    rowStyle={this.find_owned}
                    noDataIndication={indication}
                    defaultSorted={defaultSorted} />
            </div>
        );
    }
}