import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import axios from "axios";
import MusicLibraryDateModal from "./MusicLibraryDateModal";
import DeleteModal from "../components/Delete_modal";
import DeleteFormatter from "../components/Delete_formater.js";
import { MUSIC_API_URL } from "../constants";
import { find_error_message_in_response } from "../constants/utils";
import BuildDetailFormatter from "../components/Detail_formatter";
import { toast } from "react-toastify";
import MusicLibraryDatabase from "./MusicLibraryDatabase";
import _default from "react-data-grid";

export default class MusicLibraryDatesDataGrid extends React.Component {
    constructor(props) {
        super(props);
        // console.log(this.props);
        this.state = {
            showModal: false,
            showDeleteModal: false,
            viewing_date: {}
        };
        this.handleOpenDeleteModal = this.handleOpenDeleteModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.check_if_ready_to_render = this.check_if_ready_to_render.bind(this);
        this.on_delete_date_change = this.on_delete_date_change.bind(this);
        this.determine_bg_color = this.determine_bg_color.bind(this);
    }

    check_if_ready_to_render() {
        if (MusicLibraryDatabase.everything_loaded()) {
            this.setState({ load_page: true })
        }
    }

    on_delete_date_change() {
        axios.delete(MUSIC_API_URL + 'dates/' + this.state.viewing_date.id).then(() => {
            this.handleCloseModal();
            MusicLibraryDatabase.resetState(this.check_if_ready_to_render);
        }).catch((thrown) => {
            console.log(thrown)
            toast.error(JSON.stringify(find_error_message_in_response(thrown.response)));
        });
    }

    handleOpenDeleteModal(row) {
        this.setState({ viewing_date: row, showDeleteModal: true });
    }

    handleCloseModal() {
        this.setState({ showModal: false, showDeleteModal: false });
    }

    determine_bg_color() {
        if (this.props.disabled) {
            return { backgroundColor: "#e9ecef" }
        } else {
            return { backgroundColor: "white" }
        }
    }

    render() {
        let disabled = this.props.disabled
        const columns = [
            {
                dataField: 'date',
                sort: true
            },
            {
                dataField: 'description',
                style: { width: 250, "fontStyle": "italic" }
            },
            {
                dataField: 'delete',
                resizable: false,
                text: 'Delete',
                style: { width: 60 },
                formatter: DeleteFormatter,
                hidden: disabled
            }
        ];

        const defaultSorted = [{
            dataField: 'date',
            order: 'asc'
        }]

        let displayed_dates = [];
        this.props.dates.forEach((item) => {
            if (this.props.viewing_song.id === item.song_obj.id) {
                item.delete = { id: item.id, on_click: this.handleOpenDeleteModal };
                displayed_dates.push(item);
            }
        });

        function indication() {
            return "Table got nothing"
        }

        return (
            <div>
                <DeleteModal
                    isOpen={this.state.showDeleteModal}
                    contentLabel="Delete Date"
                    viewing_date={this.state.viewing_date}
                    close_modal={this.handleCloseModal}
                    item_type={"Date"}
                    item_desc={this.state.viewing_date.title}
                    on_change={this.on_delete_date_change} />
                <BootstrapTable
                    rowStyle={this.determine_bg_color}
                    keyField={"date"}
                    filter={filterFactory()}
                    columns={columns}
                    data={displayed_dates}
                    noDataIndication={indication}
                    defaultSorted={defaultSorted}
                />
            </div>
        );
    }
}