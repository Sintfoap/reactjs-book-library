import React from "react";
import loading_screen from '../components/Loading_screen';
import axios from "axios";
import { Button } from "reactstrap";
import { MUSIC_API_URL } from "../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { find_error_message_in_response } from "../constants/utils";
import { withRouter } from "react-router";
import MusicLibraryDatabase from "./MusicLibraryDatabase";
import MusicLibrarySongDataGrid from "./MusicLibrarySongDataGrid";
import MusicLibraryCollectionModal from "./MusicLibraryCollectionModal";

export class MusicLibraryCollectionDetail extends React.Component {
    constructor() {
        super();
        this.state = {
            collection: undefined,
            collection_confirmation: false,
        };
        this.check_if_ready_to_render = this.check_if_ready_to_render.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.on_collection_change = this.on_collection_change.bind(this);
    }

    handleOpenModal(row) {
        // console.log(row)
        this.setState({ showModal: true });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }

    on_collection_change() {
        this.handleCloseModal();
        MusicLibraryDatabase.resetState(this.check_if_ready_to_render);
    }

    check_if_ready_to_render() {
        if (MusicLibraryDatabase.everything_loaded()) {
            this.getCollection();
        }
    }

    componentDidMount() {
        if (!MusicLibraryDatabase.everything_loaded()) {
            MusicLibraryDatabase.resetState(this.check_if_ready_to_render);
        } else {
            this.getCollection();
        }
    }


    getCollection = () => {
        axios.get(MUSIC_API_URL + 'collections/' + this.props.match.params.id).then(res => this.setState({ collection: res.data, collection_confirmation: true })).catch((thrown) => {
            console.log(thrown);
            toast.error(JSON.stringify(find_error_message_in_response(thrown.response)));
        });
    };

    render() {
        function getSongs(collection) {
            let songs = []
            collection.songs.forEach((song) => {
                let list = MusicLibraryDatabase.songs
                list.forEach((inSong) => {
                    if (inSong.id === song.id) {
                        songs.push(inSong)
                    }
                })
            })
            return songs
        }

        if (this.state.collection_confirmation) {
            return (<div className="container">
                <div className="row" style={{ marginTop: 60, marginLeft: 0 }}><h1>{this.state.collection.name}</h1><Button href="#" outline color="primary" className="btn-sm edit-delete-button" onClick={() => this.handleOpenModal(this.state.series)} style={{ marginLeft: 13, marginTop: 13 }}><FontAwesomeIcon icon={faEdit} /></Button></div>
                <MusicLibraryCollectionModal
                    isOpen={this.state.showModal}
                    contentLabel="Collection Modal"
                    viewing_collection={this.state.collection}
                    new={this.state.creating_new_collection}
                    close_modal={this.handleCloseModal}
                    on_change={this.on_collection_change} />
                <MusicLibrarySongDataGrid
                    songs={getSongs(this.state.collection)}
                    on_change={this.props.on_change}
                    people={MusicLibraryDatabase.people}
                    collections={MusicLibraryDatabase.collections}
                />
            </div>);
        } else {
            return loading_screen;
        }

    }
}
export default withRouter(MusicLibraryCollectionDetail)