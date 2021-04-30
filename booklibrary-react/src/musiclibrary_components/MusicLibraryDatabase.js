import { Component } from "react";
import axios from "axios";

import { API_URL } from "../constants";
import { find_error_message_in_response } from "../constants/utils"
import { toast } from "react-toastify";


export default class MusicLibraryDatabase extends Component {
    static music = [];
    static composers = [];
    static publishers = [];
    static tags = [];
    static music_confirmation = undefined;
    static composer_confirmation = undefined;
    static publisher_confirmation = undefined;
    static tag_confirmation = undefined;

    static everything_loaded() {
        return MusicLibraryDatabase.music_confirmation === MusicLibraryDatabase.composer_confirmation === MusicLibraryDatabase.publisher_confirmation === MusicLibraryDatabase.tag_confirmation === true
    }

    static getMusic = (callback) => {
        MusicLibraryDatabase.music = [
            {id: 1, name: 'blue (cus I feel blue)'}
        ]
        MusicLibraryDatabase.music_confirmation = true;
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
        axios.get(API_URL + 'composers').then(res => {
            MusicLibraryDatabase.composers = res.data;
            MusicLibraryDatabase.composer_confirmation = true;
            callback()
            }).catch((thrown) => {
                toast.error(JSON.stringify(find_error_message_in_response(thrown.response)))
              });
    }

    static getPublishers = (callback) => {
        axios.get(API_URL + 'publishers').then(res => {
            MusicLibraryDatabase.publishers = res.data;
            MusicLibraryDatabase.publisher_confirmation = true;
            callback()
            }).catch((thrown) => {
                console.log(thrown)
                toast.error(JSON.stringify(find_error_message_in_response(thrown.response)))
              });
    }

    static getTags = (callback) => {
        axios.get(API_URL + 'tags').then(res => {
            MusicLibraryDatabase.tags = res.data;
            MusicLibraryDatabase.tag_confirmation = true;
            callback()
            }).catch((thrown) => {
                console.log(thrown)
                toast.error(JSON.stringify(find_error_message_in_response(thrown.response)))
              });
    }

    static resetMusic = (callback) => {
        MusicLibraryDatabase.getMusic(callback)
    }
    static resetComposers = (callback) => {
        MusicLibraryDatabase.getComposers(callback)
    }
    static resetPublishers = (callback) => {
        MusicLibraryDatabase.getPublishers(callback)
    }
    static resetTags = (callback) => {
        MusicLibraryDatabase.getTags(callback)
    }

    static resetState = (callback) => {
        MusicLibraryDatabase.music_confirmation = false;
        MusicLibraryDatabase.composer_confirmation = false;
        MusicLibraryDatabase.publisher_confirmation = false;
        MusicLibraryDatabase.tag_confirmation = false;
        MusicLibraryDatabase.getMusic(callback);
        MusicLibraryDatabase.getComposers(callback);
        MusicLibraryDatabase.getPublishers(callback);
        MusicLibraryDatabase.getTags(callback);
    };
}