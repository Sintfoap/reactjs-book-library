import { Component } from "react";
import axios from "axios";
import { BOOK_API_URL } from "../constants";
import { find_error_message_in_response } from "../constants/utils";
import { toast } from "react-toastify";

export default class BookLibraryDatabase extends Component {
    static books = [];
    static authors = [];
    static genres = [];
    static series = [];
    static book_confirmation = undefined;
    static author_confirmation = undefined;
    static genre_confirmation = undefined;
    static series_confirmation = undefined;

    static everything_loaded() {
        return /* BookLibraryDatabase.book_confirmation === */ BookLibraryDatabase.author_confirmation === BookLibraryDatabase.genre_confirmation === BookLibraryDatabase.series_confirmation === true;
    }

    static getBooks = (callback) => {
        axios.get(BOOK_API_URL + 'books').then(res => {
            BookLibraryDatabase.books = res.data;
            BookLibraryDatabase.book_confirmation = true;
            callback();
        }).catch((thrown) => {
            toast.error(JSON.stringify(find_error_message_in_response(thrown.response)));
        });
    };

    static getAuthors = (callback) => {
        axios.get(BOOK_API_URL + 'authors' + "?get_all=true").then(res => {
            BookLibraryDatabase.authors = res.data;
            BookLibraryDatabase.author_confirmation = true;
            callback();
        }).catch((thrown) => {
            toast.error(JSON.stringify(find_error_message_in_response(thrown.response)));
        });
    };

    static getGenres = (callback) => {
        axios.get(BOOK_API_URL + 'genres' + "?get_all=true").then(res => {
            BookLibraryDatabase.genres = res.data;
            BookLibraryDatabase.genre_confirmation = true;
            callback();
        }).catch((thrown) => {
            console.log(thrown);
            toast.error(JSON.stringify(find_error_message_in_response(thrown.response)));
        });
    };

    static getSeries = (callback) => {
        axios.get(BOOK_API_URL + 'series' + "?get_all=true").then(res => {
            BookLibraryDatabase.series = res.data;
            BookLibraryDatabase.series_confirmation = true;
            callback();
        }).catch((thrown) => {
            console.log(thrown);
            toast.error(JSON.stringify(find_error_message_in_response(thrown.response)));
        });
    };

    static resetBooks = (callback) => {
        BookLibraryDatabase.getBooks(callback);
    };
    static resetAuthors = (callback) => {
        BookLibraryDatabase.getAuthors(callback);
    };
    static resetGenres = (callback) => {
        BookLibraryDatabase.getGenres(callback);
    };
    static resetSeries = (callback) => {
        BookLibraryDatabase.getSeries(callback);
    };

    static resetState = (callback) => {
        //BookLibraryDatabase.book_confirmation = false;
        BookLibraryDatabase.author_confirmation = false;
        BookLibraryDatabase.genre_confirmation = false;
        BookLibraryDatabase.series_confirmation = false;
        //BookLibraryDatabase.getBooks(callback);
        BookLibraryDatabase.getAuthors(callback);
        BookLibraryDatabase.getGenres(callback);
        BookLibraryDatabase.getSeries(callback);
    };
}
