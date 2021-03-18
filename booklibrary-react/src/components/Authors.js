import React from "react";
import DataGrid from 'react-data-grid';
import { Button } from "reactstrap";
import ReactModal from 'react-modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faPlusSquare, faTrash } from '@fortawesome/free-solid-svg-icons'

import axios from "axios";
import AuthorModal from "./author_modal";
import DeleteModal from "./Delete_modal";
import EditorFormatter from "./Edit_formatter.js"
import DeleteFormatter from "./Delete_formater.js"

import { API_URL } from "../constants";

ReactModal.setAppElement('#root')

class Authors extends React.Component {
  constructor () {
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


  handleDeleteModal (row) {
    console.log("Clicked delete")
    console.log(row)
    this.setState({ viewing_author: row, showDeleteModal: true})
  }

  handleOpenModal (row) {
    console.log(row)
    this.setState({ viewing_author: row, showModal: true, creating_new_author: false });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false, showDeleteModal: false });
  }

  on_author_change() {
    this.handleCloseModal()
    this.props.on_change();
  }

  on_delete_author_change() {
    axios.delete(API_URL + 'authors/' + this.state.viewing_author.id).then(() => {
      this.handleCloseModal()
      this.props.on_change()
    });
  }
  
  render() {
    const columns = [
      // { key: 'id', name: 'ID' },
      { key: 'last_name', name: 'Last name', },
      { key: 'first_name', name: 'First name' },
      { key: 'edit', name: 'Edit', width: 55, formatter: EditorFormatter },
      { key: 'delete', name: 'Delete', width: 60, formatter: DeleteFormatter }
    ]
    let displayed_authors = this.props.authors.slice()
    displayed_authors.forEach((item) => {
      item.edit = {id: item.id, on_click: this.handleOpenModal}
      item.delete = {id: item.id, on_click: this.handleDeleteModal}
    })

    return (
      <div>
        <AuthorModal
          isOpen={this.state.showModal}
          contentLabel="Author Modal"
          viewing_author={this.state.viewing_author}
          new={this.state.creating_new_author}
          close_modal={this.handleCloseModal}
          on_change={this.on_author_change}
        />
        <DeleteModal
          isOpen={this.state.showDeleteModal}
          contentLabel="Delete Author"
          viewing_author={this.state.viewing_author}
          close_modal={this.handleCloseModal}
          item_type={"Author"}
          item_desc={this.state.viewing_author.first_name + " " + this.state.viewing_author.last_name}
          on_change={this.on_delete_author_change}
        />
        <div className="container">
          <Button outline color="success" className="Add_button" onClick={() => {
            this.setState({
              showModal: true,
              creating_new_author: true
            })}}><FontAwesomeIcon icon={ faPlusSquare }/> New Author </Button>
          <DataGrid
            columns={columns}
            rows={this.props.authors}
            // rowGetter={i => this.props.books[i]}
            // rowsCount={this.props.books.length}
            defaultColumnOptions={{
              sortable: true,
              // resizable: true,
              minWidth: 55
            }}
          />
        </div>
      </div>
      );
  }
}

export default Authors;