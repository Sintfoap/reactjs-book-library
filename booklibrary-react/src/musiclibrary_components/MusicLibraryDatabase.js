import { Component } from "react";
import axios from "axios";

import { MUSIC_API_URL } from "../constants";
import { find_error_message_in_response } from "../constants/utils"
import { toast } from "react-toastify";


export default class MusicLibraryDatabase extends Component {
    static songs = [];
    static composers = [];
    static publishers = [];
    static lyracists = [];
    static song_confirmation = undefined;
    static composer_confirmation = undefined;
    static publisher_confirmation = undefined;
    static lyracist_confirmation = undefined;

    static everything_loaded() {
        return MusicLibraryDatabase.song_confirmation === MusicLibraryDatabase.composer_confirmation === MusicLibraryDatabase.publisher_confirmation === MusicLibraryDatabase.lyracist_confirmation === true
    }

    static getSongs = (callback) => {
        MusicLibraryDatabase.songs = [
            {id: 1, name: 'Blue (cus I feel blue)', notes: "Austin's song."},
            {id: 2, name: 'Come Thou Fount', notes: "Original."},
            {id: 3, name: 'Take My Life and Let it Be', notes: "Alternate tune."}
        ]
        MusicLibraryDatabase.song_confirmation = true;
        callback()
        // axios.get(API_URL + 'music').then(res => {
        //     MusicLibraryDatabase.music = res.data;
        //     MusicLibraryDatabase.music_confirmation = true;
        //     callback()
        //     }).catch((thrown) => {
        //         toast.error(JSON.stringify(find_error_message_in_response(thrown.response)))
        //     });
    };

    static getComposers = (callback) => {
        // MusicLibraryDatabase.composers = [
        //     {id: 1, first_name: 'John', last_name: 'Williams'},
        //     {id: 2, first_name: 'Phillip', last_name: 'Bliss'},
        //     {id: 3, first_name: 'Fanny', last_name: 'Crosby'},
        //     {id: 3, first_name: 'Thomas', last_name: 'Keesecker'}
        // ]
        // MusicLibraryDatabase.composer_confirmation = true;
        // callback()
        axios.get(MUSIC_API_URL + 'composers').then(res => {
            MusicLibraryDatabase.composers = res.data;
            MusicLibraryDatabase.composer_confirmation = true;
            callback()
            }).catch((thrown) => {
                toast.error(JSON.stringify(find_error_message_in_response(thrown.response)))
              });
    }

    static getPublishers = (callback) => {
        // MusicLibraryDatabase.publishers = [
        //     {id: 1, name: 'Hope Publishing'},
        //     {id: 2, name: 'Penguin Publishing'},
        //     {id: 3, name: 'JW Pepper'},
        //     {id: 4, name: 'Birnamwood Publications'}

        // ]
        // MusicLibraryDatabase.publisher_confirmation = true;
        // callback()
        axios.get(MUSIC_API_URL + 'publishers').then(res => {
            MusicLibraryDatabase.publishers = res.data;
            MusicLibraryDatabase.publisher_confirmation = true;
            callback()
            }).catch((thrown) => {
                console.log(thrown)
                toast.error(JSON.stringify(find_error_message_in_response(thrown.response)))
              });
    }
    
    static getLyracists = (callback) => {
        // MusicLibraryDatabase.lyracists = [
        //     {id: 1, first_name: 'Francis Ridley', last_name: 'Havergal'},
        //     {id: 2, first_name: 'Horatio', last_name: 'Bonar'},
        //     {id: 3, first_name: 'Cathrine', last_name: 'Winkworth'},
        //     {id: 4, first_name: 'Chris', last_name: 'Anderson'}
        // ]
        // MusicLibraryDatabase.lyracist_confirmation = true;
        axios.get(MUSIC_API_URL + 'lyracists').then(res => {
            MusicLibraryDatabase.lyracists = res.data;
            MusicLibraryDatabase.lyracist_confirmation = true;
            callback()
            }).catch((thrown) => {
                console.log(thrown)
                toast.error(JSON.stringify(find_error_message_in_response(thrown.response)))
              });
    }

    static resetSongs = (callback) => {
        MusicLibraryDatabase.getSongs(callback)
    }
    static resetComposers = (callback) => {
        MusicLibraryDatabase.getComposers(callback)
    }
    static resetPublishers = (callback) => {
        MusicLibraryDatabase.getPublishers(callback)
    }
    static resetLyracists = (callback) => {
        MusicLibraryDatabase.getLyracists(callback)
    }

    static resetState = (callback) => {
        MusicLibraryDatabase.song_confirmation = false;
        MusicLibraryDatabase.composer_confirmation = false;
        MusicLibraryDatabase.publisher_confirmation = false;
        MusicLibraryDatabase.lyracist_confirmation = false;
        MusicLibraryDatabase.getSongs(callback);
        MusicLibraryDatabase.getComposers(callback);
        MusicLibraryDatabase.getPublishers(callback);
        MusicLibraryDatabase.getLyracists(callback);
    };
}