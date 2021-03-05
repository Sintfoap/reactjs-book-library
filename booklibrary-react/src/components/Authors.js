import React from "react";
import DataGrid from 'react-data-grid';
import { Button } from "reactstrap";
import ReactModal from 'react-modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

import axios from "axios";
import EditAuthorModal from "./edit_author_modal";

import { API_URL } from "../constants";

ReactModal.setAppElement('#root')

const EditorFormatter = ({ value, row }) => {
  return <a href="#" onClick={() => row.edit.on_click(row)}><FontAwesomeIcon icon={faEdit}/></a>
  }
const DeleteFormatter = ({ value, row }) => {
  return <a href="#" onClick={() => row.delete.on_click(row)}><FontAwesomeIcon icon={faTrash}/></a>
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
      { key: 'id', name: 'ID' },
      { key: 'first_name', name: 'First_name' },
      { key: 'last_name', name: 'Last_name' },
      { key: 'edit', name: 'Edit', formatter: EditorFormatter },
      { key: 'delete', name: 'Delete', formatter: DeleteFormatter }
    ]
    let displayed_authors = this.props.authors.slice()
    displayed_authors.forEach((item) => {
      item.edit = {id: item.id, on_click: this.handleOpenModal}
      item.delete = {id: item.id, on_click: this.handleDeleteModal}
    })

    return (
      <div>
        <EditAuthorModal
          isOpen={this.state.showModal}
          contentLabel="Author Modal"
          viewing_author={this.state.viewing_author}
          new={this.state.creating_new_author}
          close_modal={this.handleCloseModal}
          on_change={this.on_author_change}
        />
        <Button onClick={() => {
          this.setState({
            showModal: true,
            creating_new_author: true
          })}}>MAKE ME AN AUTHOR</Button>
        <DataGrid
          columns={columns}
          rows={this.props.authors}
          // rowGetter={i => this.props.books[i]}
          // rowsCount={this.props.books.length}
          defaultColumnOptions={{
            sortable: true,
            resizable: true
          }}
        />
      </div>
      );
  }
}

export default Authors;