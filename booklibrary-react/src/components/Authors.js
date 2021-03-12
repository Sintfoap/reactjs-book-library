import React from "react";
import DataGrid from 'react-data-grid';
import { Button } from "reactstrap";
import ReactModal from 'react-modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faPlusSquare, faTrash } from '@fortawesome/free-solid-svg-icons'

import axios from "axios";
import AuthorModal from "./author_modal";

import { API_URL } from "../constants";

ReactModal.setAppElement('#root')

const EditorFormatter = ({ value, row }) => {
  return <Button href="#" outline color="primary" className="btn-sm edit-delete-button" onClick={() => row.edit.on_click(row)}><FontAwesomeIcon icon={faEdit}/></Button>
  }
const DeleteFormatter = ({ value, row }) => {
  return <Button href="#" outline color="danger" className="btn-sm edit-delete-button" onClick={() => row.delete.on_click(row)}><FontAwesomeIcon icon={faTrash}/></Button>
  }

class Authors extends React.Component {
  constructor () {
    super();
    this.state = {
      showModal: false,
      creating_new_author: false,
      viewing_author: {}
    };

    this.handleDeleteModal = this.handleDeleteModal.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.on_author_change = this.on_author_change.bind(this);

  }


  handleDeleteModal (row) {
    // if(confirm("Do you want to delete book " + String(row.id) + " " + row.title + "?")){
      this.deleteAuthor(row.id)
    //}
  }

  handleOpenModal (row) {
    console.log(row)
    this.setState({ viewing_author: row, showModal: true, creating_new_author: false });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }

  on_author_change() {
    this.handleCloseModal()
    this.props.on_change();
  }

  deleteAuthor = id => {
    axios.delete(API_URL + 'authors/' + id).then(res => {
      this.setState({ authors: res.data})
      this.props.on_change()
    });
  };

  render() {
    const columns = [
      // { key: 'id', name: 'ID' },
      { key: 'first_name', name: 'First_name' },
      { key: 'last_name', name: 'Last_name' },
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
            resizable: true,
            minWidth: 55
          }}
        />
      </div>
      );
  }
}

export default Authors;