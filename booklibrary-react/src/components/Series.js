import React from "react";
import DataGrid from 'react-data-grid';
import ReactModal from 'react-modal';
import { Button } from "reactstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faPlusSquare } from '@fortawesome/free-solid-svg-icons'

import axios from "axios";
import SeriesModal from "./series_modal";

import { API_URL } from "../constants";

ReactModal.setAppElement('#root')

const EditorFormatter = ({ value, row }) => {
  return <Button href="#" outline color="primary" className="btn-sm" onClick={() => row.edit.on_click(row)}><FontAwesomeIcon icon={faEdit}/></Button>
  }
const DeleteFormatter = ({ value, row }) => {
  return <Button href="#" outline color="danger" className="btn-sm" onClick={() => row.delete.on_click(row)}><FontAwesomeIcon icon={faTrash}/></Button>
  }

class Series extends React.Component {
  constructor () {
    super();
    this.state = {
      showModal: false,
      creating_new_series: false,
      viewing_series: {}
    };
  
    this.handleDeleteModal = this.handleDeleteModal.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.on_series_change = this.on_series_change.bind(this);
  }

  handleDeleteModal (row) {
    // if(confirm("Do you want to delete book " + String(row.id) + " " + row.title + "?")){
      this.deleteSeries(row.id)
    //}
  }

  handleOpenModal (row) {
    console.log(row)
    this.setState({ viewing_series: row, showModal: true, creating_new_series: false });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }

  on_series_change() {
    this.handleCloseModal()
    this.props.on_change();
  }
  deleteSeries = id => {
    axios.delete(API_URL + 'series/' + id).then(res => {
      this.setState({ series: res.data})
      this.props.on_change()
    });
  };

  render() {
    const columns = [
      { key: 'id', name: 'ID' },
      { key: 'name', name: 'Name' },
      { key: 'edit', name: 'Edit', formatter: EditorFormatter },
      { key: 'delete', name: 'Delete', formatter: DeleteFormatter }
    ]
    let displayed_series = this.props.series.slice()
    displayed_series.forEach((item) => {
      item.edit = {id: item.id, on_click: this.handleOpenModal}
      item.delete = {id: item.id, on_click: this.handleDeleteModal}
    })    
    return (
      <div>
         <SeriesModal
           isOpen={this.state.showModal}
           contentLabel="Series Modal"
           viewing_series={this.state.viewing_series}
           new={this.state.creating_new_series}
           close_modal={this.handleCloseModal}
           on_change={this.on_series_change}
          />
        <Button outline color="success" className="Add_button" onClick={() => {
          this.setState({
            showModal: true,
            creating_new_series: true
          })}}><FontAwesomeIcon icon={ faPlusSquare }/> New Series </Button>
        <DataGrid
          columns={columns}
          rows={this.props.series}
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

export default Series;