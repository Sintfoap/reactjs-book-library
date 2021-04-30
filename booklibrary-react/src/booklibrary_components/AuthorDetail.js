import React from "react";
import { withRouter } from "react-router";

import axios from "axios";

import { API_URL } from "../constants";
import Database from "./Database";
import loading_screen from '../components/Loading_screen'
import BookDataGrid from "./BookDataGrid";
import AuthorModal from "./AuthorModal";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { find_error_message_in_response } from "../constants/utils";
import { toast } from "react-toastify";

class AuthorDetail extends React.Component {
    constructor() {
        super();
        this.state = {
            author: undefined,
            author_confirmation: false
        }
        this.check_if_ready_to_render = this.check_if_ready_to_render.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.on_author_change = this.on_author_change.bind(this);
    }

    handleOpenModal (row) {
      // console.log(row)
      this.setState({showModal: true});
    }
    
    handleCloseModal () {
      this.setState({ showModal: false });
    }
  
    on_author_change() {
      this.handleCloseModal()
      Database.resetState(this.check_if_ready_to_render)
    }
  
    check_if_ready_to_render() {
      if(Database.everything_loaded()) {
        this.getAuthor();
      }
    }
  
    componentDidMount() {
      if(!Database.everything_loaded()) {
        Database.resetState(this.check_if_ready_to_render);
      }else {
        this.getAuthor();
      }
    }

    getAuthor = () => {
        axios.get(API_URL + 'authors/' + this.props.match.params.id).then(res => this.setState({ author: res.data, author_confirmation: true })).catch((thrown) => {
          console.log(thrown)
          toast.error(JSON.stringify(find_error_message_in_response(thrown.response)))
        });
    }

    render() {
        if(this.state.author_confirmation){
            return (<div className="container">
                <div className="row" style={{ marginTop: 60, marginLeft: 0 }}><h1>{this.state.author.last_name + ', ' + this.state.author.first_name}</h1><Button href="#" outline color="primary" className="btn-sm edit-delete-button" onClick={() => this.handleOpenModal(this.state.author)} style={{marginLeft: 13, marginTop: 13}}><FontAwesomeIcon icon={faEdit}/></Button>
                  <BookDataGrid
                  books={this.state.author.books}
                  on_change={() => {Database.resetBooks(this.check_if_ready_to_render)}}
                  authors={Database.authors}
                  genres={Database.genres}
                  series={Database.series}
                  filter_unowned={true}
                  />
                </div>
                <AuthorModal
                  isOpen={this.state.showModal}
                  contentLabel="Author Modal"
                  viewing_author={this.state.author}
                  new={false}
                  close_modal={this.handleCloseModal}
                  on_change={this.on_author_change}
                />
                </div>)
        }else {
            return loading_screen()
        }

    }
}
export default withRouter(AuthorDetail)