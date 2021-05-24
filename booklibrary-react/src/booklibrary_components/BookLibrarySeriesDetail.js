import React from "react";
import loading_screen from '../components/Loading_screen';
import axios from "axios";
import { Button } from "reactstrap";
import { BOOK_API_URL } from "../constants";
import BookLibraryBookDataGrid from "./BookLibraryBookDataGrid";
import BookLibraryDatabase from "./BookLibraryDatabase";
import BookLibrarySeriesModal from "./BookLibrarySeriesModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { find_error_message_in_response } from "../constants/utils";
import { withRouter } from "react-router";

export class BookLibrarySeriesDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      series: undefined,
      series_confirmation: false,
    };
    this.check_if_ready_to_render = this.check_if_ready_to_render.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.on_series_change = this.on_series_change.bind(this);
  }

  handleOpenModal(row) {
    // console.log(row)
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  on_series_change() {
    this.handleCloseModal();
    BookLibraryDatabase.resetState(this.check_if_ready_to_render);
  }

  check_if_ready_to_render() {
    if (BookLibraryDatabase.everything_loaded()) {
      this.getSeries();
    }
  }

  componentDidMount() {
    if (!BookLibraryDatabase.everything_loaded()) {
      BookLibraryDatabase.resetState(this.check_if_ready_to_render);
    } else {
      this.getSeries();
    }
  }


  getSeries = () => {
    axios.get(BOOK_API_URL + 'series/' + this.props.match.params.id).then(res => this.setState({ series: res.data, series_confirmation: true })).catch((thrown) => {
      console.log(thrown);
      toast.error(JSON.stringify(find_error_message_in_response(thrown.response)));
    });
  };

  render() {
    if (this.state.series_confirmation) {
      return (<div className="container">
        <div className="row" style={{ marginTop: 60, marginLeft: 0 }}><h1>{this.state.series.name}</h1><Button href="#" outline color="primary" className="btn-sm edit-delete-button" onClick={() => this.handleOpenModal(this.state.series)} style={{ marginLeft: 13, marginTop: 13 }}><FontAwesomeIcon icon={faEdit} /></Button></div>
        <BookLibraryBookDataGrid
          books={this.state.series.books}
          on_change={() => { BookLibraryDatabase.resetBooks(this.check_if_ready_to_render); }}
          authors={BookLibraryDatabase.authors}
          genres={BookLibraryDatabase.genres}
          series={BookLibraryDatabase.series}
          sort_field={"number_in_series"}
          filter_unowned={false} />
        <BookLibrarySeriesModal
          isOpen={this.state.showModal}
          contentLabel="Series Modal"
          viewing_series={this.state.series}
          new={this.state.creating_new_series}
          close_modal={this.handleCloseModal}
          on_change={this.on_series_change} />
      </div>);
    } else {
      return loading_screen;
    }

  }
}
export default withRouter(BookLibrarySeriesDetail)