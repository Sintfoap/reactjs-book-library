import React from "react";
import ReactTags from 'react-tag-autocomplete'
import MusicLibraryDatabase from "./MusicLibraryDatabase";
import PropTypes from 'prop-types'

export default class TagFilter extends React.Component {
    static propTypes = {
        column: PropTypes.object.isRequired,
        onFilter: PropTypes.func.isRequired
    }
    constructor(props) {
        super(props);
        this.state = {
            tags: []
        }
        this.filter = this.filter.bind(this);
        this.getValue = this.getValue.bind(this);
        this.onDelete = this.onDelete.bind(this)
        this.onAddition = this.onAddition.bind(this)
    }
    onDelete(i){
        this.state.tags.splice(i, 1)
        this.setState({tags: this.state.tags})
        this.filter()
    }
    onAddition(tag){
        this.state.tags.push(tag)
        this.setState({tags: this.state.tags})
        this.filter()
    }
    getValue() {
        return this.state.tags;
    }
    filter() {
        this.props.onFilter(this.getValue());
    }
    render() {
        const tags = this.state.tags.map(tag => MusicLibraryDatabase.tags.find(db_tag => db_tag.id === tag.id)).map((tag) => { tag.name = tag.tag; return tag })
        const known_tag_ids = this.state.tags.map(tag => tag.id)
        const tag_suggestions = MusicLibraryDatabase.tags.filter(tag => known_tag_ids.indexOf(tag.id) === -1).map((tag) => { tag.name = tag.tag; return tag })
        return (
        <ReactTags
            tags={tags}
            suggestions={tag_suggestions}
            onDelete={this.onDelete}
            onAddition={this.onAddition}
        />
        );
    }
}