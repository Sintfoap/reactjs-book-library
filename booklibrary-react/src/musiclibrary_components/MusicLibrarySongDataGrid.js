import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import axios from "axios";
// import MusicLibrarySongModal from "./MusicLibrarySongModal";
import DeleteModal from "../components/Delete_modal";
import EditorFormatter from "../components/Edit_formatter.js";
import DeleteFormatter from "../components/Delete_formater.js";
import { MUSIC_API_URL } from "../constants";
import { find_error_message_in_response } from "../constants/utils";
import BuildDetailFormatter from "../components/Detail_formatter";
import { toast } from "react-toastify";
import { ButtonGroup, Button } from "reactstrap";

export default class MusicLibrarySongDataGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            showDeleteModal: false,
            showComposerColumn: false,
            showArrangerColumn: false,
            showLyricistColumn: false,
            viewing_song: {}
        };
        this.handleOpenDeleteModal = this.handleOpenDeleteModal.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.on_song_change = this.on_song_change.bind(this);
        this.on_delete_song_change = this.on_delete_song_change.bind(this);
        this.sort_songs = this.sort_songs.bind(this);
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
    onChange = e => {
        // console.log(e)
        e.preventDefault();
        if (e.target.name === "showComposerColumn") {
            this.setState({ [e.target.name]: e.target.checked });
        } else if (e.target.name === "showArrangerColumn") {
            this.setState({ [e.target.name]: e.target.checked })
        } else if (e.target.name === "showLyricistColumn") {
            this.setState({ [e.target.name]: e.target.checked })
        } else {
            this.setState({ [e.target.name]: e.target.value })
        }
    };

    sort_songs = (a, b) => {
        return a[this.props.sort_field] - b[this.props.sort_field];
    };

    render() {
        const columns = [
            { dataField: 'title', text: 'Title ', filter: textFilter({ delay: 0 }), formatter: BuildDetailFormatter('/musiclibrary/songs/') },
            { dataField: 'notes', text: 'Notes ', style: { width: 250, "fontStyle": "italic" }, filter: textFilter({ delay: 0 }) },
            { dataField: 'composer_name', text: 'Composer ', filter: textFilter({ delay: 0 }), formatter: BuildDetailFormatter('/musiclibrary/composer/', 'composer'), hidden: !this.state.showComposerColumn },
            { dataField: 'arranger_name', text: 'Arranger ', filter: textFilter({ delay: 0 }), formatter: BuildDetailFormatter('/musiclibrary/arranger/', 'arranger'), hidden: !this.state.showArrangerColumn },
            { dataField: 'lyricist_name', text: 'Lyricist ', filter: textFilter({ delay: 0 }), formatter: BuildDetailFormatter('/musiclibrary/lyricist/', 'lyricist'), hidden: !this.state.showLyricistColumn },
            { dataField: 'publisher_name', text: 'Publisher ', filter: textFilter({ delay: 0 }), formatter: BuildDetailFormatter('/musiclibrary/publisher/', 'publisher') },
            { dataField: 'edit', resizable: false, text: 'Edit ', style: { width: 55 }, formatter: EditorFormatter },
            { dataField: 'delete', resizable: false, text: 'Delete ', style: { width: 60 }, formatter: DeleteFormatter }
        ];
        let displayed_songs = [];
        this.props.songs.forEach((item) => {
            item.composer_name = this.find_composer(item);
            item.publisher_name = this.find_publisher(item);
            item.edit = { id: item.id, on_click: this.handleOpenModal };
            item.delete = { id: item.id, on_click: this.handleOpenDeleteModal };
        });
        return (
            <div>
                <div className="row">
                    <ButtonGroup style={{marginBottom: "1.5%", marginTop: "1.5%"}} className="col-6">
                        <Button color="outline-secondary" onClick={() => this.setState({ showComposerColumn: !this.state.showComposerColumn })} active={this.state.showComposerColumn === true}>Show Composers</Button>
                        <Button color="outline-secondary" onClick={() => this.setState({ showArrangerColumn: !this.state.showArrangerColumn })} active={this.state.showArrangerColumn === true}>Show Arrangers</Button>
                        <Button color="outline-secondary" onClick={() => this.setState({ showLyricistColumn: !this.state.showLyricistColumn })} active={this.state.showLyricistColumn === true}>Show Lyricists</Button>
                    </ButtonGroup>
                </div>
                <DeleteModal
                    isOpen={this.state.showDeleteModal}
                    contentLabel="Delete Song"
                    viewing_song={this.state.viewing_song}
                    close_modal={this.handleCloseModal}
                    item_type={"Song"}
                    item_desc={this.state.viewing_song.name}
                    on_change={this.on_delete_song_change} />
                <BootstrapTable
                    keyField={"wut"}
                    filter={filterFactory()}
                    columns={columns}
                    data={displayed_songs} />
            </div>
        );
    }
}