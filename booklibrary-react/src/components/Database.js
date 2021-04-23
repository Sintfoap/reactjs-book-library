import { Component } from "react";
import axios from "axios";

import { API_URL } from "../constants";
import { find_error_message_in_response } from "../constants/utils"
import { toast } from "react-toastify";


class Database extends Component {
    static books = [];
    static authors = [];
    static genres = [];
    static series = [];
    static book_confirmation = undefined;
    static author_confirmation = undefined;
    static genre_confirmation = undefined;
    static series_confirmation = undefined;

    static everything_loaded() {
        return Database.book_confirmation === Database.author_confirmation === Database.genre_confirmation === Database.series_confirmation === true
    }

    static getBooks = (callback) => {
        axios.get(API_URL + 'books').then(res => {
            Database.books = res.data;
            Database.book_confirmation = true;
            callback()
            });
    };

    static getAuthors = (callback) => {
        axios.get(API_URL + 'authors').then(res => {
            Database.authors = res.data;
            Database.author_confirmation = true;
            callback()
            }).catch((thrown) => {
                toast.error(JSON.stringify(find_error_message_in_response(thrown.response)))
              });
    }

    static getGenres = (callback) => {
        axios.get(API_URL + 'genres').then(res => {
            Database.genres = res.data;
            Database.genre_confirmation = true;
            callback()
            });
    }

    static getSeries = (callback) => {
        axios.get(API_URL + 'series').then(res => {
            Database.series = res.data;
            Database.series_confirmation = true;
            callback()
            });
    }

    static resetBooks = (callback) => {
        Database.getBooks(callback)
    }
    static resetAuthors = (callback) => {
        Database.getAuthors(callback)
    }
    static resetGenres = (callback) => {
        Database.getGenres(callback)
    }
    static resetSeries = (callback) => {
        Database.getSeries(callback)
    }

    static resetState = (callback) => {
        Database.book_confirmation = false;
        Database.author_confirmation = false;
        Database.genre_confirmation = false;
        Database.series_confirmation = false;
        Database.getBooks(callback);
        Database.getAuthors(callback);
        Database.getGenres(callback);
        Database.getSeries(callback);
    };
}

export default Database 