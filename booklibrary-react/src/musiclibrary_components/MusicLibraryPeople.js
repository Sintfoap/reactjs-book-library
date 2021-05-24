import React from "react";
import ReactModal from 'react-modal';
import { Button } from "reactstrap";
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import MusicLibraryPersonModal from "./MusicLibraryPersonModal"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
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
      { dataField: 'full_name', text: 'Name ', filter: textFilter({ delay: 0 }), formatter: BuildDetailFormatter('/musiclibrary/people/') },
      { dataField: 'edit', text: 'Edit', style: { width: 55 }, formatter: EditorFormatter },
      { dataField: 'delete', text: 'Delete', style: { width: 60 }, formatter: DeleteFormatter }
    ]
    let displayed_person = MusicLibraryDatabase.people.slice();
    displayed_person.forEach((item) => {
      item.full_name = item.last_name + ", " + item.first_name;
      item.edit = { id: item.id, on_click: this.handleOpenModal };
      item.delete = { id: item.id, on_click: this.handleDeleteModal };
    });
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
        <Button style={{ float: "right" }} outline color="success" className="Add_button" onClick={() => {
          this.setState({
            showModal: true,
            creating_new_person: true
          });
        }}><FontAwesomeIcon icon={faPlusSquare} /> New Person </Button>
        <BootstrapTable
          keyField={"wut"}
          filter={filterFactory()}
          columns={columns}
          data={MusicLibraryDatabase.people}
        />
      </div>

    );
  }

}