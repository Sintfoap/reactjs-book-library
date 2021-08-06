import { Component } from "react";
import axios from "axios";

import { MUSIC_API_URL } from "../constants";
import { find_error_message_in_response } from "../constants/utils"
import { toast } from "react-toastify";


export default class MusicLibraryDatabase extends Component {
    static songs = [];
    static people = [];
    static publishers = [];
    static collections = [];
    static tags = [];
    static dates = [];
    static song_confirmation = undefined;
    static people_conformation = undefined;
    static publisher_confirmation = undefined;
    static collection_confirmation = undefined;
    static tag_confirmation = undefined;
    static date_confirmation = undefined;

    static everything_loaded() {
        return (MusicLibraryDatabase.song_confirmation === 
            MusicLibraryDatabase.people_conformation === 
            MusicLibraryDatabase.publisher_confirmation === 
            MusicLibraryDatabase.collection_confirmation === 
            MusicLibraryDatabase.tag_confirmation === 
            MusicLibraryDatabase.date_confirmation === true)
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

    static updateSong = (song) => {
        let index = 0;
        let found_song = false
        while(!found_song && index < MusicLibraryDatabase.songs.length) {
            if (MusicLibraryDatabase.songs[index].id == song.id) {
                found_song = true
                MusicLibraryDatabase.songs[index] = song
            }else {
                index += 1
            }
        }
        if(!found_song){
            MusicLibraryDatabase.songs.push(song)
        }
    }

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

    static getCollections = (callback) => {
        axios.get(MUSIC_API_URL + 'collections').then(res => {
            MusicLibraryDatabase.collections = res.data;
            MusicLibraryDatabase.collection_confirmation = true;
            callback()
        }).catch((thrown) => {
            console.log(thrown)
            toast.error(JSON.stringify(find_error_message_in_response(thrown.response)))
        });
    }

    static getTags = (callback) => {
        axios.get(MUSIC_API_URL + 'tags').then(res => {
            MusicLibraryDatabase.tags = res.data;
            MusicLibraryDatabase.tag_confirmation = true;
            callback()
        }).catch((thrown) => {
            console.log(thrown)
            toast.error(JSON.stringify(find_error_message_in_response(thrown.response)))
        });
    }

    static getDates = (callback) => {
        axios.get(MUSIC_API_URL + 'dates').then(res => {
            MusicLibraryDatabase.dates = res.data;
            MusicLibraryDatabase.date_confirmation = true;
            callback()
            }).catch((thrown) => {
                toast.error(JSON.stringify(find_error_message_in_response(thrown.response)))
            });
    };

    static resetSongs = (callback) => {
        MusicLibraryDatabase.getSongs(callback)
    }
    static resetPeople = (callback) => {
        MusicLibraryDatabase.getPeople(callback)
    }
    static resetPublishers = (callback) => {
        MusicLibraryDatabase.getPublishers(callback)
    }
    static resetColletions = (callback) => {
        MusicLibraryDatabase.getCollections(callback)
    }
    static resetTags = (callback) => {
        MusicLibraryDatabase.getTags(callback)
    }    
    static resetDates = (callback) => {
        MusicLibraryDatabase.getDates(callback)
    }

    static resetState = (callback) => {
        MusicLibraryDatabase.song_confirmation = false;
        MusicLibraryDatabase.people_conformation = false;
        MusicLibraryDatabase.publisher_confirmation = false;
        MusicLibraryDatabase.collection_confirmation = false;
        MusicLibraryDatabase.tag_confirmation = false;
        MusicLibraryDatabase.date_confirmation = false;
        MusicLibraryDatabase.getSongs(callback);
        MusicLibraryDatabase.getPeople(callback);
        MusicLibraryDatabase.getPublishers(callback);
        MusicLibraryDatabase.getCollections(callback);
        MusicLibraryDatabase.getTags(callback);
        MusicLibraryDatabase.getDates(callback);
    };
}