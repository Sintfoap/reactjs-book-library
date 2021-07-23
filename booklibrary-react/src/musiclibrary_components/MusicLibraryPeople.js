import React from "react";
import ReactModal from 'react-modal';
import { Button } from "reactstrap";
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import MusicLibraryPersonModal from "./MusicLibraryPersonModal"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons'
import MusicLibraryDatabase from "./MusicLibraryDatabase";
import BootstrapTable from "react-bootstrap-table-next";
import { find_error_message_in_response } from "../constants/utils";
import axios from "axios";
import { MUSIC_API_URL } from "../constants";
import { toast } from "react-toastify";
import EditorFormatter from "../components/Edit_formatter";
import DeleteFormatter from "../components/Delete_formater";
import DeleteModal from "../components/Delete_modal";
import BuildDetailFormatter from "../components/Detail_formatter";
import paginationFactory from "react-bootstrap-table2-paginator";
import sortCaret from "../components/Sort_caret";
import headerFormatter from "../components/Header_formater";

ReactModal.setAppElement('#root')

export default class MusicLibraryPeople extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      showDeleteModal: false,
      creating_new_person: false,
      viewing_person: {}
    };
    this.check_if_ready_to_render = this.check_if_ready_to_render.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleDeleteModal = this.handleDeleteModal.bind(this);
    this.on_person_change = this.on_person_change.bind(this);
    this.on_delete_person_change = this.on_delete_person_change.bind(this);
  }

  check_if_ready_to_render() {
    if (MusicLibraryDatabase.everything_loaded()) {
      this.setState();
    }
  }
  handleOpenModal(row) {
    MusicLibraryDatabase.resetState(this.check_if_ready_to_render)
    this.setState({ viewing_person: row, showModal: true, creating_new_person: false });
  }

  handleCloseModal() {
    this.setState({ showModal: false, showDeleteModal: false });
  }

  handleDeleteModal(row) {
    this.setState({ viewing_person: row, showDeleteModal: true });
  }


  on_person_change() {
    this.handleCloseModal()
    this.props.on_change();
  }

  on_delete_person_change() {
    axios.delete(MUSIC_API_URL + 'people/' + this.state.viewing_person.id).then(() => {
      this.handleCloseModal();
      this.props.on_change();
    }).catch((thrown) => {
      toast.error(JSON.stringify(find_error_message_in_response(thrown.response)));
    });
  }

  render() {
    const columns = [
      {
        dataField: 'full_name',
        text: 'Name ',
        sort: true,
        sortCaret: sortCaret,
        filter: textFilter({ delay: 0 }),
        formatter: BuildDetailFormatter('/musiclibrary/people/'),
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
    ]
    const defaultSorted = [{
      dataField: 'full_name',
      order: 'asc'
    }]
    let displayed_person = MusicLibraryDatabase.people.slice();
    displayed_person.forEach((item) => {
      item.full_name = item.last_name + ", " + item.first_name;
      item.edit = { id: item.id, on_click: this.handleOpenModal };
      item.delete = { id: item.id, on_click: this.handleDeleteModal };
    });
    function indication() {
      return "Table got nothing"
    }
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
        activeStyle.backgroundColor = '#17a2b8';
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
                className={`btn ${isSelect ? 'btn-info' : 'btn-light'}`}
              >
                {option.text}
              </button>
            );
          })
        }
      </div>
    );
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
        text: 'All', value: MusicLibraryDatabase.people.length
      }]
    };
    return (
      <div>
        <MusicLibraryPersonModal
          isOpen={this.state.showModal}
          contentLabel="Person Modal"
          viewing_person={this.state.viewing_person}
          new={this.state.creating_new_person}
          close_modal={this.handleCloseModal}
          on_change={this.on_person_change} />
        <DeleteModal
          isOpen={this.state.showDeleteModal}
          contentLabel="Delete Person"
          viewing_person={this.state.viewing_person}
          close_modal={this.handleCloseModal}
          item_type={"Person"}
          item_desc={this.state.viewing_person.name}
          on_change={this.on_delete_person_change} />
        <Button style={{ float: "right" }} outline color="info" className="Add_button" onClick={() => {
          this.setState({
            showModal: true,
            creating_new_person: true
          });
        }}><FontAwesomeIcon icon={faPlusSquare} /> New Person </Button>
        <BootstrapTable
          keyField={"wut"}
          pagination={paginationFactory(options)}
          filter={filterFactory()}
          columns={columns}
          data={MusicLibraryDatabase.people}
          noDataIndication={indication()}
          defaultSorted={defaultSorted}
        />
      </div>

    );
  }

}