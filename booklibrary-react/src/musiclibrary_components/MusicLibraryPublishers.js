import React from "react";
import ReactModal from 'react-modal';
import { Button } from "reactstrap";
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import EditorFormatter from "../components/Edit_formatter.js";
import DeleteFormatter from "../components/Delete_formater.js";
import DeleteModal from "../components/Delete_modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import MusicLibraryPublisherModal from './MusicLibraryPublisherModal.js';
import MusicLibraryDatabase from "./MusicLibraryDatabase";
import { find_error_message_in_response } from "../constants/utils";
import { toast } from "react-toastify";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import { MUSIC_API_URL } from "../constants/index.js";
import BuildDetailFormatter from "../components/Detail_formatter.js";
import paginationFactory from "react-bootstrap-table2-paginator";
import sortCaret from "../components/Sort_caret.js";
import headerFormatter from "../components/Header_formater.js";

ReactModal.setAppElement('#root')

export default class MusicLibraryPublishers extends React.Component {
    constructor() {
        super();
        this.state = {
            showModal: false,
            showDeleteModal: false,
            creating_new_publisher: false,
            viewing_publisher: {}
        };
        this.check_if_ready_to_render = this.check_if_ready_to_render.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleDeleteModal = this.handleDeleteModal.bind(this);
        this.on_publishers_change = this.on_publishers_change.bind(this);
        this.on_delete_publisher_change = this.on_delete_publisher_change.bind(this);
    }
    check_if_ready_to_render() {
        if (MusicLibraryDatabase.everything_loaded()) {
            this.setState();
        }
    }

    handleOpenModal(row) {
        MusicLibraryDatabase.resetState(this.check_if_ready_to_render)
        this.setState({ viewing_publisher: row, showModal: true, creating_new_publisher: false });
    }

    handleDeleteModal(row) {
        this.setState({ viewing_publisher: row, showDeleteModal: true });
    }

    handleCloseModal() {
        this.setState({ showModal: false, showDeleteModal: false });
    }

    on_publishers_change() {
        this.handleCloseModal()
        this.props.on_change();
    }

    on_delete_publisher_change() {
        axios.delete(MUSIC_API_URL + 'publishers/' + this.state.viewing_publisher.id).then(() => {
            this.handleCloseModal();
            this.props.on_change();
        }).catch((thrown) => {
            toast.error(JSON.stringify(find_error_message_in_response(thrown.response)));
        });
    }

    render() {
        const columns = [
            {
                dataField: 'name',
                text: 'Name ',
                sort: true,
                sortCaret: sortCaret,
                filter: textFilter({ delay: 0 }),
                formatter: BuildDetailFormatter('/musiclibrary/publishers/'),
                headerFormatter: headerFormatter
            },
            {
                dataField: 'edit',
                text: 'Edit',
                style: { width: 55 },
                formatter: EditorFormatter
            },
            {
                dataField: 'delete',
                text: 'Delete',
                style: { width: 60 },
                formatter: DeleteFormatter
            }
        ]
        
        const defaultSorted = [{
            dataField: 'name',
            order: 'asc'
        }]

        let displayed_publisher = MusicLibraryDatabase.publishers.slice();
        displayed_publisher.forEach((item) => {
            item.edit = { id: item.id, on_click: this.handleOpenModal };
            item.delete = { id: item.id, on_click: this.handleDeleteModal };
        });
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
                activeStyle.backgroundColor = '#17a2b8';
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
                                className={`btn ${isSelect ? 'btn-info' : 'btn-light'}`}
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
                text: 'All', value: MusicLibraryDatabase.publishers.length
            }]
        };
        return (
            <div>
                <MusicLibraryPublisherModal
                    isOpen={this.state.showModal}
                    contentLabel="Publisher Modal"
                    viewing_publisher={this.state.viewing_publisher}
                    new={this.state.creating_new_publisher}
                    close_modal={this.handleCloseModal}
                    on_change={this.on_publishers_change} />
                <DeleteModal
                    isOpen={this.state.showDeleteModal}
                    contentLabel="Delete Publisher"
                    viewing_publisher={this.state.viewing_publisher}
                    close_modal={this.handleCloseModal}
                    item_type={"Publisher"}
                    item_desc={this.state.viewing_publisher.name}
                    on_change={this.on_delete_publisher_change} />
                <Button style={{ float: "right" }} outline color="info" className="Add_button" onClick={() => {
                    this.setState({
                        showModal: true,
                        creating_new_publisher: true
                    });
                }}><FontAwesomeIcon icon={faPlusSquare} /> New Publisher </Button>
                <BootstrapTable
                    keyField={"wut"}
                    pagination={paginationFactory(options)}
                    filter={filterFactory()}
                    columns={columns}
                    data={MusicLibraryDatabase.publishers}
                    noDataIndication={indication()}
                    defaultSorted={defaultSorted}
                />
            </div>

        );
    }
}