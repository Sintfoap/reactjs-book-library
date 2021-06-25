import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import axios from "axios";
// import MusicLibrarySongModal from "./MusicLibrarySongModal";
import DeleteModal from "../components/Delete_modal";
import EditorFormatter from "../components/Edit_formatter.js";
import DeleteFormatter from "../components/Delete_formater.js";
import { MUSIC_API_URL } from "../constants";
import { find_error_message_in_response } from "../constants/utils";
import BuildDetailFormatter from "../components/Detail_formatter";
import { toast } from "react-toastify";
import { ButtonGroup, Button } from "reactstrap";
import MusicLibraryDatabase from "./MusicLibraryDatabase";

export default class MusicLibrarySongPeopleDataGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.add_relationship = this.add_relationship.bind(this);
        console.log("Constructor")
        console.log(this.props)
    }

    add_relationship(id, pretty_name){
        console.log("add_relationship")
        console.log(this.props)
        console.log(id)
        axios.put(MUSIC_API_URL + 'songs/'+this.props.song_id.toString()+'/'+this.props.relationship+'/'+id.toString()).then(res => {
            toast.success("Successfully Added " + this.props.relationship.charAt(0).toUpperCase() + this.props.relationship.slice(1, -1) + " " + pretty_name.toString())
            this.props.add_relationship_function(id)
            }).catch((thrown) => {
                console.log(thrown)
                toast.error(JSON.stringify(find_error_message_in_response(thrown.response)))
            });
    }

    remove_relationship(id, pretty_name){
        axios.delete(MUSIC_API_URL + 'songs/'+this.props.song_id.toString()+'/'+this.props.relationship+'/'+id.toString()).then(res => {
            toast.success("Successfully Removed " + this.props.relationship.charAt(0).toUpperCase() + this.props.relationship.slice(1, -1) + " " + pretty_name.toString())
            this.props.remove_relationship_function(id)
            }).catch((thrown) => {
                toast.error(JSON.stringify(find_error_message_in_response(thrown.response)))
            });
    }

    render() {
        const columns = [
            { dataField: 'name', text: 'Name ', filter: textFilter({ delay: 0 }) }
        ];
        let displayed_people = [];
        let selected = Array.from(this.props.related_people)
        MusicLibraryDatabase.people.forEach((item) => {
            item.name = item.last_name + ", " + item.first_name
            displayed_people.push(item)
        });
        let non_selectable = [];
        if(this.props.disabled){
            MusicLibraryDatabase.people.forEach((item) => {
                non_selectable.push(item.id)
            });
        }
        const selectRow = {
            mode: 'checkbox',
            clickToSelect: true,
            selected: selected,
            hideSelectAll: true,
            nonSelectable: non_selectable,
            nonSelectableStyle: { backgroundColor: 'gray' },
            onSelect: (row, isSelect, rowIndex, e) => {
                console.log(row)
                console.log(isSelect)
                if(isSelect){
                    this.add_relationship(row.id, row.name)
                }else {
                    this.remove_relationship(row.id, row.name)
                }
              }
          };
        return (
            <div>
                <BootstrapTable
                    keyField={"id"}
                    filter={filterFactory()}
                    columns={columns}
                    data={displayed_people}
                    selectRow={ selectRow } />
            </div>
        );
    }
}