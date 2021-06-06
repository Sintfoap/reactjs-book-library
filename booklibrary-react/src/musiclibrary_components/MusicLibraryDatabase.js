import { Component } from "react";
import axios from "axios";

import { MUSIC_API_URL } from "../constants";
import { find_error_message_in_response } from "../constants/utils"
import { toast } from "react-toastify";


export default class MusicLibraryDatabase extends Component {
    static songs = [];
    static people = [];
    static publishers = [];
    static song_confirmation = undefined;
    static people_conformation = undefined;
    static publisher_confirmation = undefined;

    static everything_loaded() {
        return MusicLibraryDatabase.song_confirmation === MusicLibraryDatabase.people_conformation === MusicLibraryDatabase.publisher_confirmation === true
    }

    static getSongs = (callback) => {
        axios.get(MUSIC_API_URL + 'songs').then(res => {
            MusicLibraryDatabase.songs = res.data;
            MusicLibraryDatabase.song_confirmation = true;
            callback()
            }).catch((thrown) => {
                toast.error(JSON.stringify(find_error_message_in_response(thrown.response)))
            });
    };

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

    static resetSongs = (callback) => {
        MusicLibraryDatabase.getSongs(callback)
    }
    static resetPeople = (callback) => {
        MusicLibraryDatabase.getPeople(callback)
    }
    static resetPublishers = (callback) => {
        MusicLibraryDatabase.getPublishers(callback)
    }

    static resetState = (callback) => {
        MusicLibraryDatabase.song_confirmation = false;
        MusicLibraryDatabase.people_conformation = false;
        MusicLibraryDatabase.publisher_confirmation = false;
        MusicLibraryDatabase.getSongs(callback);
        MusicLibraryDatabase.getPeople(callback);
        MusicLibraryDatabase.getPublishers(callback);
    };
}