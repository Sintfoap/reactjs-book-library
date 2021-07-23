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
import paginationFactory from "react-bootstrap-table2-paginator";
import sortCaret from "../components/Sort_caret";
import headerFormatter from "../components/Header_formater";

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
      {
        dataField: 'name',
        text: 'Name ',
        sort: true,
        sortCaret:  sortCaret,
        filter: textFilter({ delay: 0 }),
        formatter: BuildDetailFormatter('/booklibrary/series/'),
        headerFormatter: headerFormatter
      },
      {
        dataField: 'edit',
        text: 'Edit',
        style: { width: 55 },
        formatter: EditorFormatter
      },
      {
        dataField: 'delete',
        text: 'Delete',
        style: { width: 60 },
        formatter: DeleteFormatter
      }
    ];
    const defaultSorted = [{
      dataField: 'name',
      order: 'asc'
    }]
    let displayed_series = BookLibraryDatabase.series.slice();
    displayed_series.forEach((item) => {
      item.edit = { id: item.id, on_click: this.handleOpenModal };
      item.delete = { id: item.id, on_click: this.handleDeleteModal };
    });
    function indication() {
      return "Table got nothing"
    }
    const sizePerPageRenderer = ({
      options,
      currSizePerPage,
      onSizePerPageChange
    }) => (
      <div className="btn-group" role="group">
        {
          options.map((option) => {
            const isSelect = currSizePerPage === `${option.page}`;
            return (
              <button
                key={option.text}
                type="button"
                onClick={() => onSizePerPageChange(option.page)}
                className={`btn ${isSelect ? 'btn-maroon' : 'btn-light'}`}
              >
                {option.text}
              </button>
            );
          })
        }
      </div>
    );
    const pageButtonRenderer = ({
      page,
      active,
      onPageChange,
    }) => {
      const handleClick = (e) => {
        e.preventDefault();
        onPageChange(page);
      };
      const activeStyle = {};
      if (active) {
        activeStyle.backgroundColor = '#671210';
        activeStyle.color = 'white';
      } else {
        activeStyle.backgroundColor = 'white';
        activeStyle.color = 'black';
      }
      if (typeof page === 'string') {
        activeStyle.backgroundColor = 'white';
        activeStyle.color = 'black';
      }
      return (
        <li className="page-item">
          <a href="#" onClick={handleClick} style={activeStyle} className="btn-sm">{page}</a>
        </li>
      );
    };
    const options = {
      sizePerPageRenderer,
      pageButtonRenderer,
      paginationSize: 6,
      pageStartIndex: 1,
      // alwaysShowAllBtns: true, // Always show next and previous button
      // withFirstAndLast: false, // Hide the going to First and Last page button
      // hideSizePerPage: true, // Hide the sizePerPage dropdown always
      hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
      firstPageText: 'First',
      prePageText: 'Back',
      nextPageText: 'Next',
      lastPageText: 'Last',
      nextPageTitle: 'First page',
      prePageTitle: 'Pre page',
      firstPageTitle: 'Next page',
      lastPageTitle: 'Last page',
      showTotal: true,
      disablePageTitle: true,
      sizePerPageList: [{
        text: '10', value: 10
      }, {
        text: '15', value: 15
      }, {
        text: '20', value: 20
      }, {
        text: 'All', value: BookLibraryDatabase.series.length
      }]
    };
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
        <Button style={{ float: "right" }} outline className="Add_button btn-outline-maroon" onClick={() => {
          this.setState({
            showModal: true,
            creating_new_series: true
          });
        }}><FontAwesomeIcon icon={faPlusSquare} /> New Series </Button>
        <BootstrapTable
          keyField={"wut"}
          pagination={paginationFactory(options)}
          filter={filterFactory()}
          columns={columns}
          data={BookLibraryDatabase.series}
          noDataIndication={indication}
          defaultSorted={defaultSorted} />
      </div>
    );
  }
}
