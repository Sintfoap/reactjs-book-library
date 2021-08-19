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

    render() {
        let disabled = this.props.disabled
        let hiddenRowKeys = []
        const columns = [
            { dataField: 'name', filter: textFilter({ delay: 0, placeholder: this.props.placeholder, onFilter: filterVal => getSongs(filterVal) }) }
        ];
        function getSongs(filterVal = '') {
            if (!disabled) {
                MusicLibraryDatabase.people.forEach((item) => {
                    if (filterVal === '') {
                        let index = 0
                        displayed_people.forEach(person => {
                            if (index < 10) {
                                index += 1
                            } else {
                                hiddenRowKeys.push(person.id)
                            }
                        })
                    } else {
                        hiddenRowKeys.splice(0,10000)
                    }
                    if (displayed_people.indexOf(item) === -1) {
                        item.name = item.last_name + ", " + item.first_name
                        displayed_people.push(item)
                    }
                })
            }
        }
        let displayed_people = [];
        let selected = Array.from(this.props.related_people)
        if (this.props.disabled) {
            MusicLibraryDatabase.people.forEach((item) => {
                selected.forEach(person => {
                    if (person === item.id) {
                        item.name = item.last_name + ", " + item.first_name
                        displayed_people.push(item)
                    }
                })
            });
        } else {
            MusicLibraryDatabase.people.forEach((item) => {
                selected.forEach(person => {
                    if (person === item.id) {
                        item.name = item.last_name + ", " + item.first_name
                        displayed_people.push(item)
                    }
                })
            });
            getSongs()
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
            <div>
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