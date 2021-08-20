import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import axios from "axios";
// import MusicLibrarySongModal from "./MusicLibrarySongModal";
import { MUSIC_API_URL } from "../constants";
import { find_error_message_in_response } from "../constants/utils";
import { toast } from "react-toastify";
import MusicLibraryDatabase from "./MusicLibraryDatabase";

export default class MusicLibrarySongPeopleDataGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.add_relationship = this.add_relationship.bind(this);
    }

    add_relationship(id, pretty_name) {
        axios.put(MUSIC_API_URL + 'songs/' + this.props.song_id.toString() + '/' + this.props.relationship + '/' + id.toString()).then(res => {
            toast.success("Successfully Added " + this.props.relationship.charAt(0).toUpperCase() + this.props.relationship.slice(1, -1) + " " + pretty_name.toString())
            this.props.add_relationship_function(id)
        }).catch((thrown) => {
            console.log(thrown)
            toast.error(JSON.stringify(find_error_message_in_response(thrown.response)))
        });
    }

    remove_relationship(id, pretty_name) {
        axios.delete(MUSIC_API_URL + 'songs/' + this.props.song_id.toString() + '/' + this.props.relationship + '/' + id.toString()).then(res => {
            toast.success("Successfully Removed " + this.props.relationship.charAt(0).toUpperCase() + this.props.relationship.slice(1, -1) + " " + pretty_name.toString())
            this.props.remove_relationship_function(id)
        }).catch((thrown) => {
            toast.error(JSON.stringify(find_error_message_in_response(thrown.response)))
        });
    }

    sort_people_alphabetically(people) {
        people.sort(function(a, b) {
            var nameA = a.name.toUpperCase(); // ignore upper and lowercase
            var nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            } else if (nameA > nameB) {
              return 1;
            }
            return 0;
          });
    }

    render() {
        let disabled = this.props.disabled
        let hiddenRowKeys = []
        function getSongs(filterVal, data) {
            if(filterVal){
                return data.filter(person => person.name.toLowerCase().includes(filterVal.toLowerCase()) || selected.find(selected_person => person.id === selected_person));
            }
            else {
                return data;
            }
        }
        const columns = [
            { dataField: 'name', filter: textFilter({ delay: 0, placeholder: this.props.placeholder, onFilter: getSongs }) }
        ];
        let displayed_people = [];
        let selected = Array.from(this.props.related_people)
        MusicLibraryDatabase.people.forEach((item) => {
            selected.forEach(person => {
                if (person === item.id) {
                    item.name = item.last_name + ", " + item.first_name
                    displayed_people.push(item)
                }
            })
        });
        this.sort_people_alphabetically(displayed_people)
        if (!this.props.disabled) {
            let unselected_people = MusicLibraryDatabase.people.filter(person => selected.find(selected_person => person.id === selected_person) === undefined)
            unselected_people.forEach((item) => {
                item.name = item.last_name + ", " + item.first_name
            });
            this.sort_people_alphabetically(unselected_people)
            displayed_people = displayed_people.concat(unselected_people)
        }

        let non_selectable = [];
        if (this.props.disabled) {
            MusicLibraryDatabase.people.forEach((item) => {
                non_selectable.push(item.id)
            });
        }
        const selectRow = {
            mode: 'checkbox',
            clickToSelect: true,
            selected: selected,
            hideSelectColumn: true,
            hideSelectAll: true,
            nonSelectable: non_selectable,
            nonSelectableStyle: { backgroundColor: '#e9ecef' },
            bgColor: '#17a2b8',
            onSelect: (row, isSelect, rowIndex, e) => {
                if (isSelect) {
                    this.add_relationship(row.id, row.name)
                } else {
                    this.remove_relationship(row.id, row.name)
                }
            }
        };
        return (
            <div class="musiclibrarysongpeopledatagrid">
                <BootstrapTable
                    keyField={"id"}
                    filter={filterFactory()}
                    columns={columns}
                    hiddenRows={hiddenRowKeys}
                    data={displayed_people}
                    selectRow={selectRow}
                    condensed
                    hover />
            </div>
        );
    }
}