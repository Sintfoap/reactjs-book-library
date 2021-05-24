import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import axios from "axios";
import MusicLibrarySongModal from "./MusicLibrarySongModal";
import DeleteModal from "../components/Delete_modal";
import EditorFormatter from "../components/Edit_formatter.js";
import DeleteFormatter from "../components/Delete_formater.js";
import { MUSIC_API_URL } from "../constants";
import { find_error_message_in_response } from "../constants/utils";
import BuildDetailFormatter from "../components/Detail_formatter";
import { toast } from "react-toastify";

export default class MusicLibrarySongDataGrid extends React.Component {
    constructor(props) {
        super(props);
        // console.log(this.props);
        this.state = {
            showModal: false,
            showDeleteModal: false,
            // filterUnowned: this.props.filter_unowned === undefined ? true : this.props.filter_unowned,
            viewing_song: {}
        };
        this.handleOpenDeleteModal = this.handleOpenDeleteModal.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.on_song_change = this.on_song_change.bind(this);
        this.on_delete_song_change = this.on_delete_song_change.bind(this);
        this.sort_songs = this.sort_songs.bind(this);
        // this.on_change_owned_filter = this.on_change_owned_filter.bind(this);
    }

    on_song_change() {
        this.handleCloseModal();
        this.props.on_change();
    }

    on_delete_song_change() {
        axios.delete(MUSIC_API_URL + 'songs/' + this.state.viewing_song.id).then(() => {
            this.handleCloseModal();
            this.props.on_change();
        }).catch((thrown) => {
            toast.error(JSON.stringify(find_error_message_in_response(thrown.response)));
        });
    }

    // on_change_owned_filter(e) {
    //     this.setState({ filterUnowned: e.target.checked });
    // }

    handleOpenModal(row) {
        this.setState({ viewing_song: row, showModal: true });
    }

    handleOpenDeleteModal(row) {
        this.setState({ viewing_song: row, showDeleteModal: true });
    }

    handleCloseModal() {
        this.setState({ showModal: false, showDeleteModal: false });
    }


    find_composer = (song) => {
        if (song.composer_obj) {
            return song.composer_obj.last_name + ", " + song.composer_obj.first_name;
        }
    };

    find_publisher = (song) => {
        if (song.publisher_obj) {
            return song.publisher_obj.category;
        }
    };

    // find_series = (book) => {
    //     if (book.series_obj) {
    //         if (book.number_in_series) {
    //             return book.series_obj.name + " #" + book.number_in_series.toString();
    //         }
    //         return book.series_obj.name;
    //     }
    // };

    sort_songs = (a, b) => {
        return a[this.props.sort_field] - b[this.props.sort_field];
    };

    // find_owned = (book) => {
    //     if (!book.owned) {
    //         return { backgroundColor: "pink" };
    //     }
    // };


    render() {

        const columns = [
            // { key: 'id', name: 'ID' },
            { dataField: 'title', text: 'Title', filter: textFilter({ delay: 0 }), formatter: BuildDetailFormatter('/musiclibrary/songs/') },
            { dataField: 'notes', text: 'Notes', style: { width: 250, "fontStyle": "italic" }, filter: textFilter({ delay: 0 }) },
            { dataField: 'composer_name', text: 'Composer', filter: textFilter({ delay: 0 }), formatter: BuildDetailFormatter('/musiclibrary/composer/', 'composer') },
            { dataField: 'publisher_name', text: 'Publisher', filter: textFilter({ delay: 0 }), formatter: BuildDetailFormatter('/musiclibrary/publisher/', 'publisher') },
            // { dataField: 'series_name', text: 'Series', filter: textFilter({ delay: 0 }), formatter: BuildDetailFormatter('/booklibrary/series/', 'series') },
            { dataField: 'edit', resizable: false, text: 'Edit', style: { width: 55 }, formatter: EditorFormatter },
            { dataField: 'delete', resizable: false, text: 'Delete', style: { width: 60 }, formatter: DeleteFormatter }
        ];
        let displayed_songs = [];
        this.props.songs.forEach((item) => {
            item.composer_name = this.find_composer(item);
            item.publisher_name = this.find_publisher(item);
            // item.series_name = this.find_series(item);
            item.edit = { id: item.id, on_click: this.handleOpenModal };
            item.delete = { id: item.id, on_click: this.handleOpenDeleteModal };
            // if (!this.state.filterUnowned || item.owned) {
            //     displayed_songs.push(item);
            // }
        });
        // if (this.props.sort_field) {
        //     displayed_songs.sort(this.sort_songs);
        // }
        return (
            <div>
                <MusicLibrarySongModal
                    isOpen={this.state.showModal}
                    contentLabel="Song Modal"
                    viewing_song={this.state.viewing_song}
                    new={false}
                    close_modal={this.handleCloseModal}
                    on_change={this.on_song_change}
                    composers={this.props.composers}
                    publishers={this.props.publishers}
                    // series={this.props.series}
                    // number_in_series={this.props.number_in_series}
                    />
                    {/* owned={this.props.owned}  */}
                <DeleteModal
                    isOpen={this.state.showDeleteModal}
                    contentLabel="Delete Song"
                    viewing_song={this.state.viewing_song}
                    close_modal={this.handleCloseModal}
                    item_type={"Song"}
                    item_desc={this.state.viewing_song.name}
                    on_change={this.on_delete_song_change} />
                {/* <div style={{ float: "right", marginRight: 10, paddingTop: 7, marginBottom: 7 }}>
                    <input type="checkbox" onChange={this.on_change_owned_filter} checked={this.state.filterUnowned} />
                    <span> Owned</span>
                </div> */}
                <BootstrapTable
                    keyField={"wut"}
                    filter={filterFactory()}
                    columns={columns}
                    data={displayed_songs} />
            </div>
        );
    }
}
// rowStyle={this.find_owned}