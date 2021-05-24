import { Component } from "react";
import axios from "axios";

import { MUSIC_API_URL } from "../constants";
import { find_error_message_in_response } from "../constants/utils"
import { toast } from "react-toastify";


export default class MusicLibraryDatabase extends Component {
    static songs = [];
    static people = [];
    // static composers = [];
    static publishers = [];
    // static lyracists = [];
    static song_confirmation = undefined;
    static people_conformation = undefined;
    // static composer_confirmation = undefined;
    static publisher_confirmation = undefined;
    // static lyracist_confirmation = undefined;

    static everything_loaded() {
        return MusicLibraryDatabase.song_confirmation === MusicLibraryDatabase.people_conformation === MusicLibraryDatabase.publisher_confirmation === true
    }

    static getSongs = (callback) => {
        MusicLibraryDatabase.songs = [
            { id: 1, name: 'Blue (cus I feel blue)', notes: "Austin's song." },
            { id: 2, name: 'Come Thou Fount', notes: "Original." },
            { id: 3, name: 'Take My Life and Let it Be', notes: "Alternate tune." }
        ]
        MusicLibraryDatabase.song_confirmation = true;
        callback()
        // axios.get(MUSIC_API_URL + 'songs').then(res => {
        //     MusicLibraryDatabase.songs = res.data;
        //     MusicLibraryDatabase.song_confirmation = true;
        //     callback()
        //     }).catch((thrown) => {
        //         toast.error(JSON.stringify(find_error_message_in_response(thrown.response)))
        //     });
    };

    // static getComposers = (callback) => {
    //     axios.get(MUSIC_API_URL + 'composers').then(res => {
    //         MusicLibraryDatabase.composers = res.data;
    //         MusicLibraryDatabase.composer_confirmation = true;
    //         callback()
    //     }).catch((thrown) => {
    //         toast.error(JSON.stringify(find_error_message_in_response(thrown.response)))
    //     });
    // }

    static getPeople = (callback) => {
        axios.get(MUSIC_API_URL + 'people').then(res => {
            MusicLibraryDatabase.people = res.data;
            MusicLibraryDatabase.people_conformation = true;
            callback()
        }).catch((thrown) => {
            toast.error(JSON.stringify(find_error_message_in_response(thrown.response)))
        });
    }

    static getPublishers = (callback) => {
        axios.get(MUSIC_API_URL + 'publishers').then(res => {
            MusicLibraryDatabase.publishers = res.data;
            MusicLibraryDatabase.publisher_confirmation = true;
            callback()
        }).catch((thrown) => {
            console.log(thrown)
            toast.error(JSON.stringify(find_error_message_in_response(thrown.response)))
        });
    }

    // static getLyracists = (callback) => {
    //     axios.get(MUSIC_API_URL + 'lyracists').then(res => {
    //         MusicLibraryDatabase.lyracists = res.data;
    //         MusicLibraryDatabase.lyracist_confirmation = true;
    //         callback()
    //     }).catch((thrown) => {
    //         console.log(thrown)
    //         toast.error(JSON.stringify(find_error_message_in_response(thrown.response)))
    //     });
    // }

    static resetSongs = (callback) => {
        MusicLibraryDatabase.getSongs(callback)
    }
    static resetPeople = (callback) => {
        MusicLibraryDatabase.getPeople(callback)
    }
    // static resetComposers = (callback) => {
    //     MusicLibraryDatabase.getComposers(callback)
    // }
    static resetPublishers = (callback) => {
        MusicLibraryDatabase.getPublishers(callback)
    }
    // static resetLyracists = (callback) => {
    //     MusicLibraryDatabase.getLyracists(callback)
    // }

    static resetState = (callback) => {
        MusicLibraryDatabase.song_confirmation = false;
        MusicLibraryDatabase.people_conformation = false;
        // MusicLibraryDatabase.composer_confirmation = false;
        MusicLibraryDatabase.publisher_confirmation = false;
        // MusicLibraryDatabase.lyracist_confirmation = false;
        MusicLibraryDatabase.getSongs(callback);
        MusicLibraryDatabase.getPeople(callback);
        // MusicLibraryDatabase.getComposers(callback);
        MusicLibraryDatabase.getPublishers(callback);
        // MusicLibraryDatabase.getLyracists(callback);
    };
}