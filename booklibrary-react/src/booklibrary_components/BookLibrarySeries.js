import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { Button } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import BookLibrarySeriesModal from "./BookLibrarySeriesModal";
import DeleteModal from "../components/Delete_modal";
import EditorFormatter from "../components/Edit_formatter.js";
import DeleteFormatter from "../components/Delete_formater.js";
import { BOOK_API_URL } from "../constants";
import { find_error_message_in_response } from "../constants/utils";
import BuildDetailFormatter from "../components/Detail_formatter";
import BookLibraryDatabase from "./BookLibraryDatabase";
import { toast } from "react-toastify";

export default class BookLibrarySeries extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      showDeleteModal: false,
      creating_new_series: false,
      viewing_series: {}
    };

    this.handleDeleteModal = this.handleDeleteModal.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.on_series_change = this.on_series_change.bind(this);
    this.on_delete_series_change = this.on_delete_series_change.bind(this);
  }

  handleDeleteModal(row) {
    // console.log("Clicked delete")
    // console.log(row)
    this.setState({ viewing_series: row, showDeleteModal: true });
  }

  handleOpenModal(row) {
    // console.log(row)
    this.setState({ viewing_series: row, showModal: true, creating_new_series: false });
  }

  handleCloseModal() {
    this.setState({ showModal: false, showDeleteModal: false });
  }

  on_series_change() {
    this.handleCloseModal();
    this.props.on_change();
  }

  on_delete_series_change() {
    axios.delete(BOOK_API_URL + 'series/' + this.state.viewing_series.id).then(() => {
      this.handleCloseModal();
      this.props.on_change();
    }).catch((thrown) => {
      toast.error(JSON.stringify(find_error_message_in_response(thrown.response)));
    });
  }

  render() {
    const columns = [
      // { key: 'id', name: 'ID' },
      { dataField: 'name', text: 'Name ', filter: textFilter({ delay: 0 }), formatter: BuildDetailFormatter('/booklibrary/series/') },
      { dataField: 'edit', text: 'Edit', style: { width: 55 }, formatter: EditorFormatter },
      { dataField: 'delete', text: 'Delete', style: { width: 60 }, formatter: DeleteFormatter }
    ];
    let displayed_series = BookLibraryDatabase.series.slice();
    displayed_series.forEach((item) => {
      item.edit = { id: item.id, on_click: this.handleOpenModal };
      item.delete = { id: item.id, on_click: this.handleDeleteModal };
    });
    function indication() {
      toast.error("I'm a Teapot!")
      return "Table got nothing"
    }
    return (
      <div>
        <BookLibrarySeriesModal
          isOpen={this.state.showModal}
          contentLabel="Series Modal"
          viewing_series={this.state.viewing_series}
          new={this.state.creating_new_series}
          close_modal={this.handleCloseModal}
          on_change={this.on_series_change} />
        <DeleteModal
          isOpen={this.state.showDeleteModal}
          contentLabel="Delete Series"
          viewing_series={this.state.viewing_series}
          close_modal={this.handleCloseModal}
          item_type={"Series"}
          item_desc={this.state.viewing_series.name}
          on_change={this.on_delete_series_change} />
        <Button style={{ float: "right" }} outline color="success" className="Add_button" onClick={() => {
          this.setState({
            showModal: true,
            creating_new_series: true
          });
        }}><FontAwesomeIcon icon={faPlusSquare} /> New Series </Button>
        <BootstrapTable
          keyField={"wut"}
          filter={filterFactory()}
          columns={columns}
          data={BookLibraryDatabase.series}
          noDataIndication={ indication } />
      </div>
    );
  }
}
