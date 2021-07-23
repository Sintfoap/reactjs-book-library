import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Button } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import BookLibraryAuthorModal from "./BookLibraryAuthorModal";
import DeleteModal from "../components/Delete_modal";
import EditorFormatter from "../components/Edit_formatter.js";
import DeleteFormatter from "../components/Delete_formater.js";
import { BOOK_API_URL } from "../constants";
import { find_error_message_in_response } from "../constants/utils";
import BuildDetailFormatter from "../components/Detail_formatter";
import BookLibraryDatabase from "./BookLibraryDatabase";
import { toast } from "react-toastify";
import sortCaret from "../components/Sort_caret";
import headerFormatter from "../components/Header_formater";

export default class BookLibraryAuthors extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      showDeleteModal: false,
      creating_new_author: false,
      viewing_author: {}
    };

    this.handleDeleteModal = this.handleDeleteModal.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.on_author_change = this.on_author_change.bind(this);
    this.on_delete_author_change = this.on_delete_author_change.bind(this);

  }


  handleDeleteModal(row) {
    // console.log("Clicked delete")
    // console.log(row)
    this.setState({ viewing_author: row, showDeleteModal: true });
  }

  handleOpenModal(row) {
    // console.log(row)
    this.setState({ viewing_author: row, showModal: true, creating_new_author: false });
  }

  handleCloseModal() {
    this.setState({ showModal: false, showDeleteModal: false });
  }

  on_author_change() {
    this.handleCloseModal();
    this.props.on_change();
  }

  on_delete_author_change() {
    axios.delete(BOOK_API_URL + 'authors/' + this.state.viewing_author.id).then(() => {
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
        dataField: 'full_name',
        text: 'Name ',
        sort: true,
        sortCaret: sortCaret,
        filter: textFilter({ delay: 0 }),
        formatter: BuildDetailFormatter('/booklibrary/authors/'),
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
      dataField: 'full_name',
      order: 'asc'
    }]
    let displayed_authors = BookLibraryDatabase.authors.slice();
    displayed_authors.forEach((item) => {
      item.full_name = item.last_name + ", " + item.first_name;
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
        text: 'All', value: BookLibraryDatabase.authors.length
      }]
    };
    return (
      <div>
        <BookLibraryAuthorModal
          isOpen={this.state.showModal}
          contentLabel="Author Modal"
          viewing_author={this.state.viewing_author}
          new={this.state.creating_new_author}
          close_modal={this.handleCloseModal}
          on_change={this.on_author_change} />
        <DeleteModal
          isOpen={this.state.showDeleteModal}
          contentLabel="Delete Author"
          viewing_author={this.state.viewing_author}
          close_modal={this.handleCloseModal}
          item_type={"Author"}
          item_desc={this.state.viewing_author.first_name + " " + this.state.viewing_author.last_name}
          on_change={this.on_delete_author_change} />
        <div className="container">
          <Button style={{ float: "right" }} outline className="Add_button btn-outline-maroon" onClick={() => {
            this.setState({
              showModal: true,
              creating_new_author: true
            });
          }}><FontAwesomeIcon icon={faPlusSquare} /> New Author </Button>
          <BootstrapTable
            bootstrap4
            keyField="id"
            pagination={paginationFactory(options)}
            filter={filterFactory()}
            columns={columns}
            data={BookLibraryDatabase.authors}
            noDataIndication={indication}
            defaultSorted={defaultSorted} />
        </div>
      </div>
    );
  }
}
