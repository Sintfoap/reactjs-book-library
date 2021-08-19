import axios from "axios";
import React from "react";
import ReactModal, { contextType } from 'react-modal';
import SelectSearch from "react-select-search";
import { toast } from "react-toastify";
import { Button, Form, FormGroup, Input, Label, ButtonGroup } from "reactstrap";
import { MUSIC_API_URL } from "../constants";
import { find_error_message_in_response } from "../constants/utils";
import MusicLibrarySongPeopleDataGrid from "./MusicLibrarySongPeopleDatagrid";
import MusicLibraryDateModal from "./MusicLibraryDateModal"
import ReactTags from 'react-tag-autocomplete'
import MusicLibraryDatabase from "./MusicLibraryDatabase";
import loading_screen from "../components/Loading_screen";
import { withRouter } from "react-router-dom";
import MusicLibraryDatesDataGrid from "./MusicLibraryDatesDataGrid";
import MusicLibraryPublisherModal from "./MusicLibraryPublisherModal"
import MusicLibraryPersonModal from "./MusicLibraryPersonModal";
import MusicLibraryCollectionModal from "./MusicLibraryCollectionModal";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
ReactModal.setAppElement('#root')

class MusicLibrarySongDetail extends React.Component {
    constructor(props) {
        super(props);
        // console.log(props)
        let my_state = {
            song_confirmation: false,
            creating_new_song: this.props.creating_new_song,
            editing: Boolean(this.props.creating_new_song),
            showPublishersModal: false,
            showCollectionsModal: false,
            showPersonModal: false,
            added_publisher_or_collection: false
        }
        this.state = my_state;
        this.check_if_ready_to_render = this.check_if_ready_to_render.bind(this);
        this.handleOpenDateModal = this.handleOpenDateModal.bind(this);
        this.handleCloseDateModal = this.handleCloseDateModal.bind(this);
        this.handle_get_song_data = this.handle_get_song_data.bind(this);
        this.on_date_change = this.on_date_change.bind(this);
        this.add_tag = this.add_tag.bind(this);
        this.remove_tag = this.remove_tag.bind(this);
        this.create_song = this.create_song.bind(this);
        this.edit_song = this.edit_song.bind(this);
        this.add_composer = this.add_composer.bind(this);
        this.remove_composer = this.remove_composer.bind(this);
        this.add_arranger = this.add_arranger.bind(this);
        this.remove_arranger = this.remove_arranger.bind(this);
        this.add_lyricist = this.add_lyricist.bind(this);
        this.remove_lyricist = this.remove_lyricist.bind(this);
        this.handleOpenPublisherModal = this.handleOpenPublisherModal.bind(this);
        this.handleClosePublisherModal = this.handleClosePublisherModal.bind(this);
        this.on_publishers_change = this.on_publishers_change.bind(this);
        this.handleOpenCollectionModal = this.handleOpenCollectionModal.bind(this);
        this.handleCloseCollectionModal = this.handleCloseCollectionModal.bind(this);
        this.on_collections_change = this.on_collections_change.bind(this);
        this.handleOpenPersonModal = this.handleOpenPersonModal.bind(this);
        this.handleClosePersonModal = this.handleClosePersonModal.bind(this);
        this.on_person_change = this.on_person_change.bind(this);
        this.reactTags = React.createRef()
    }

    componentDidMount() {
        if (!MusicLibraryDatabase.everything_loaded()) {
            MusicLibraryDatabase.resetState(this.check_if_ready_to_render);
        } else {
            this.check_if_ready_to_render()
        }
    }

    create_song_state() {
        this.setState({
            id: -1,
            title: "",
            notes: "",
            composers: new Set(),
            arrangers: new Set(),
            lyricists: new Set(),
            tags: [],
            publisher: "",
            collection: "",
            creating_new_song: true,
            song_confirmation: true
        })
    }

    handle_get_song_data(data) {
        let new_state = {
            ...data,
            song_confirmation: true
        }
        new_state.composers = new Set(new_state.composers)
        new_state.arrangers = new Set(new_state.arrangers)
        new_state.lyricists = new Set(new_state.lyricists)
        this.setState(new_state)
    }

    get_song = () => {
        axios.get(MUSIC_API_URL + 'songs/' + this.props.match.params.id).then(res => this.handle_get_song_data(res.data)).catch((thrown) => {
            toast.error(JSON.stringify(find_error_message_in_response(thrown.response)))
        })
    }

    check_if_ready_to_render() {
        if (MusicLibraryDatabase.everything_loaded()) {
            if (this.state.added_publisher_or_collection) { // for when new publisher or collection is added, so that we dont blow away the whole state
                this.setState({})
            } else if (this.state.creating_new_song) {
                this.create_song_state();
            } else {
                this.get_song();
            }
        }
    }
    add_composer(composer) {
        this.setState({ composers: this.state.composers.add(composer) })
    }

    remove_composer(composer) {
        this.state.composers.delete(composer)
        this.setState({ composers: this.state.composers })
    }

    add_arranger(arranger) {
        this.setState({ arrangers: this.state.arrangers.add(arranger) })
    }

    remove_arranger(arranger) {
        this.state.arrangers.delete(arranger)
        this.setState({ arrangers: this.state.arrangers })
    }

    add_lyricist(lyricist) {
        this.setState({ lyricists: this.state.lyricists.add(lyricist) })
    }

    remove_lyricist(lyricist) {
        this.state.lyricists.delete(lyricist)
        this.setState({ lyricists: this.state.lyricists })
    }

    handleOpenDateModal() {
        // this.props.close_modal()
        this.setState({ showDateModal: true });
    }

    handleOpenPublisherModal(row) {
        MusicLibraryDatabase.resetState(this.check_if_ready_to_render)
        this.setState({ showPublisherModal: true });
    }

    handleOpenCollectionModal(row) {
        MusicLibraryDatabase.resetState(this.check_if_ready_to_render)
        this.setState({ showCollectionsModal: true });
    }

    handleCloseDateModal() {
        this.setState({ showDateModal: false });
    }

    handleCloseCollectionModal() {
        this.setState({ showCollectionsModal: false });
    }

    handleClosePublisherModal() {
        this.setState({ showPublisherModal: false });
    }

    handleOpenPersonModal(row) {
        MusicLibraryDatabase.resetState(this.check_if_ready_to_render)
        this.setState({ showPersonModal: true });
    }

    handleClosePersonModal() {
        this.setState({ showPersonModal: false });
    }

    on_publishers_change(new_publisher) {
        console.log(new_publisher)
        this.handleClosePublisherModal();
        this.setState({ publisher: new_publisher.id, added_publisher_or_collection: true });
        MusicLibraryDatabase.resetState(this.check_if_ready_to_render);
    }

    on_collections_change(new_collection) {
        this.handleCloseCollectionModal();
        this.setState({ collection: new_collection.id, added_publisher_or_collection: true });
        MusicLibraryDatabase.resetState(this.check_if_ready_to_render);
    }

    on_person_change() {
        this.handleClosePersonModal();
        MusicLibraryDatabase.resetState(this.check_if_ready_to_render);
    }

    on_date_change() {
        this.handleCloseDateModal()
        MusicLibraryDatabase.resetState(this.check_if_ready_to_render);
    }

    onDropdownChange = (id, item) => {
        this.setState({ [item.type]: id });
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    };

    publishers_dropdown_list() {
        let items = [];
        MusicLibraryDatabase.publishers.forEach(publisher => {
            items.push(
                {
                    value: publisher.id,
                    name: publisher.name,
                    type: 'publisher',

                });
        });
        return items;
    }

    collections_dropdown_list() {
        let items = [{
            value: " ",
            name: "",
            type: 'collection'
        }];
        MusicLibraryDatabase.collections.forEach(collection => {
            items.push(
                {
                    value: collection.id,
                    name: collection.name,
                    type: 'collection',

                });
        });
        return items;
    }

    add_tag(tag) {
        axios.put(MUSIC_API_URL + 'songs/' + this.state.id + '/tags/' + tag).then((response) => {
            toast.success("Successfully Added Tag to Song: " + tag);
            MusicLibraryDatabase.updateSong(response.data)
            const found_tag = MusicLibraryDatabase.tags.filter(tag_in_db => tag_in_db.tag == tag).length > 0
            if (!found_tag) {
                MusicLibraryDatabase.resetTags(this.check_if_ready_to_render)
            }
        }).catch((thrown) => {
            console.log(thrown)
            toast.error(JSON.stringify(find_error_message_in_response(thrown.response)));
        });
    }

    remove_tag(tag_id) {
        let tag = MusicLibraryDatabase.tags.filter(tag => tag.id === tag_id)
        axios.delete(MUSIC_API_URL + 'songs/' + this.state.id + '/tags/' + tag[0].tag).then((response) => {
            toast.success("Successfully Deleted Tag from Song: " + tag[0].tag);
            MusicLibraryDatabase.updateSong(response.data)
        }).catch((thrown) => {
            console.log(thrown)
            toast.error(JSON.stringify(find_error_message_in_response(thrown.response)));
        });
    }


    create_song(e) {
        e.preventDefault();
        if (this.state.publisher === "") {
            toast.warn("Publisher is required")
            return
        }
        let song_obj = {
            id: this.state.id,
            title: this.state.title,
            notes: this.state.notes,
            publisher: parseInt(this.state.publisher),
            collection: parseInt(this.state.collection),
        }
        axios.post(MUSIC_API_URL + 'songs', song_obj).then((response) => {
            toast.success("Successfully created Song: " + response.data.title);
            this.setState({ creating_new_song: false, id: response.data.id })
        }).catch((thrown) => {
            console.log(thrown)
            toast.error(JSON.stringify(find_error_message_in_response(thrown.response)));
        });
    };

    edit_song(e) {
        e.preventDefault();
        let song_obj = {
            id: this.state.id,
            title: this.state.title,
            notes: this.state.notes,
            publisher: parseInt(this.state.publisher),
            collection: parseInt(this.state.collection),
        }
        axios.put(MUSIC_API_URL + 'songs/' + this.state.id, song_obj).then((response) => {
            toast.success("Successfully edited Song: " + song_obj.title);
            this.setState({ creating_new_song: false, editing: false })
        }).catch((thrown) => {
            console.log(thrown)
            toast.error(JSON.stringify(find_error_message_in_response(thrown.response)));
        });
    };

    onDelete(i) {
        const tags = this.state.tags.slice(0)
        this.remove_tag(tags.splice(i, 1)[0])
        this.setState({ tags: tags })
    }

    onAddition(tag) {
        const tags = [...this.state.tags, tag.id]
        this.add_tag(tag.name)
        this.setState({ tags: tags })
    }

    render() {
        if (this.state.song_confirmation) {
            const tags = MusicLibraryDatabase.tags.filter(tag => this.state.tags.indexOf(tag.id) !== -1).map((tag) => { tag.name = tag.tag; return tag })
            const tag_suggestions = MusicLibraryDatabase.tags.filter(tag => this.state.tags.indexOf(tag.id) === -1).map((tag) => { tag.name = tag.tag; return tag })
            return (
                <div className="container">
                    <MusicLibraryPersonModal
                        isOpen={this.state.showPersonModal}
                        contentLabel="Person Modal"
                        new={true}
                        close_modal={this.handleClosePersonModal}
                        on_change={this.on_person_change} />
                    <MusicLibraryPublisherModal
                        isOpen={this.state.showPublisherModal}
                        contentLabel="Publisher Modal"
                        new={true}
                        close_modal={this.handleClosePublisherModal}
                        on_change={this.on_publishers_change} />
                    <MusicLibraryCollectionModal
                        isOpen={this.state.showCollectionsModal}
                        contentLabel="Collection Modal"
                        new={true}
                        close_modal={this.handleCloseCollectionModal}
                        on_change={this.on_collections_change} />
                    <MusicLibraryDateModal
                        song_id={this.state.id}
                        isOpen={this.state.showDateModal}
                        contentLabel="Date Modal"
                        viewing_date={this.state.date}
                        new={true}
                        close_modal={this.handleCloseDateModal}
                        on_change={this.on_date_change} />
                    {!this.props.creating_new_song &&
                        <Label style={{ margin: "1% " }}> Editing
                            <ButtonGroup style={{ marginBottom: "1.5%", marginTop: "1.5%" }} className="col-6">
                                <Button color="outline-info" onClick={() => this.setState({ editing: false })} active={this.state.editing === false}>Off</Button>
                                <Button color="outline-info" onClick={() => this.setState({ editing: true })} active={this.state.editing === true}>On</Button>
                            </ButtonGroup></Label>}
                    <Form onSubmit={this.state.creating_new_song ? this.create_song : this.edit_song} className="row">
                        <FormGroup className="col-12">
                            <Label for="title">Title:</Label>
                            <Input
                                type="text"
                                name="title"
                                onChange={this.onChange}
                                value={this.state.title || ""}
                                required={true}
                                disabled={!this.state.editing}
                            />
                        </FormGroup>
                        <FormGroup className="col-12">Publisher:
                            <Label className="col-6" for="publisher">
                                <SelectSearch
                                    name="publisher"
                                    search
                                    placeholder="Select a Publisher"
                                    value={this.state.publisher || ""}
                                    options={this.publishers_dropdown_list()}
                                    onChange={this.onDropdownChange}
                                    disabled={!this.state.editing || this.state.showCollectionsModal || this.state.showPersonModal || this.state.showPublisherModal || this.state.showDateModal}
                                /></Label>
                            {this.state.editing &&
                                <Button style={{ float: "right" }} outline color="info" className="Add_button" onClick={() => {
                                    this.setState({
                                        showPublisherModal: true,
                                    });
                                }}><FontAwesomeIcon icon={faPlusSquare} /> New Publisher </Button>
                            }
                        </FormGroup>
                        <FormGroup className="col-12">Collection:
                            <Label className="col-6" for="collection">
                                <SelectSearch
                                    name="collection"
                                    search
                                    placeholder="Select a Collection"
                                    value={this.state.collection || ""}
                                    options={this.collections_dropdown_list()}
                                    onChange={this.onDropdownChange}
                                    disabled={!this.state.editing || this.state.showPublisherModal || this.state.showCollectionsModal || this.state.showPersonModal || this.state.showDateModal}
                                /></Label>
                            {this.state.editing &&
                                <Button style={{ float: "right" }} outline color="info" className="Add_button" onClick={() => {
                                    this.setState({
                                        showCollectionsModal: true,
                                    });
                                }}><FontAwesomeIcon icon={faPlusSquare} /> New Collection </Button>
                            }
                        </FormGroup>
                        {this.state.editing && !this.state.creating_new_song &&
                            <div className="col-12" style={{ textAlign: "right" }}><Button outline color="info" className="Add_button btn-sm" onClick={() => {
                                this.setState({
                                    showPersonModal: true,
                                });
                            }}><FontAwesomeIcon icon={faPlusSquare} /> New Person </Button></div>}
                        {!this.state.creating_new_song &&
                            <FormGroup className="col-12">
                                <Label className="col-6" for="lyricists">Lyricists:
                                    <MusicLibrarySongPeopleDataGrid
                                        song_id={this.state.id}
                                        relationship={"lyricists"}
                                        related_people={this.state.lyricists}
                                        add_relationship_function={this.add_lyricist}
                                        remove_relationship_function={this.remove_lyricist}
                                        disabled={!this.state.editing}
                                        placeholder={"Enter Lyricist..."}
                                    /></Label>
                                <Label className="col-6"> Composers:
                                    <MusicLibrarySongPeopleDataGrid
                                        song_id={this.state.id}
                                        relationship={"composers"}
                                        related_people={this.state.composers}
                                        add_relationship_function={this.add_composer}
                                        remove_relationship_function={this.remove_composer}
                                        disabled={!this.state.editing}
                                        placeholder={"Enter Composer..."}
                                    /></Label>
                            </FormGroup>}
                        {this.state.editing && !this.state.creating_new_song &&
                            <div className="col-12" style={{ textAlign: "right" }}><Button outline color="info" className="btn-sm Add_button" onClick={() => {
                                this.handleOpenDateModal()
                            }}><FontAwesomeIcon icon={faPlusSquare} /> Add Date</Button></div>
                        }
                        {!this.state.creating_new_song &&
                            <FormGroup className="col-12">
                                <Label className="col-6"> Arrangers:
                                    <MusicLibrarySongPeopleDataGrid
                                        song_id={this.state.id}
                                        relationship={"arrangers"}
                                        related_people={this.state.arrangers}
                                        add_relationship_function={this.add_arranger}
                                        remove_relationship_function={this.remove_arranger}
                                        disabled={!this.state.editing}
                                        placeholder={"Enter Arranger..."}
                                    />
                                </Label>
                                <Label className="col-6" for="dates">Dates:
                                    <MusicLibraryDatesDataGrid
                                        viewing_song={this.state}
                                        dates={MusicLibraryDatabase.dates}
                                        songs={this.state}
                                        sort_field={"title"}
                                        disabled={!this.state.editing}
                                    /></Label>
                            </FormGroup>}{!this.props.creating_new_song && this.state.editing &&
                                <ReactTags
                                    ref={this.reactTags}
                                    tags={tags}
                                    allowNew={true}
                                    suggestions={tag_suggestions}
                                    onDelete={this.onDelete.bind(this)}
                                    onAddition={this.onAddition.bind(this)}
                                    disabled={!this.state.editing}
                                />
                        }
                        {!this.state.creating_new_song &&
                            <FormGroup className="col-12">
                                <Label for="notes">Notes:</Label>
                                <Input
                                    type="textarea"
                                    name="notes"
                                    onChange={this.onChange}
                                    value={this.state.notes || ""}
                                    required={false}
                                    disabled={!this.state.editing}
                                />
                            </FormGroup>}

                        <br></br>
                        {this.state.editing &&
                            <div className="col-12">
                                {this.state.creating_new_song &&
                                    <Button color="info" outline >Continue</Button>}
                                {this.state.editing && !this.state.creating_new_song &&
                                    <Button color="info" outline >Save</Button>}
                                <Button color="info" outline href="/musiclibrary/music" className={"close_modal_button"} style={{ float: 'right' }}>Cancel</Button></div>}
                    </Form>
                </div >
            );
        } else {
            return loading_screen
        }
    }
}
export default withRouter(MusicLibrarySongDetail)