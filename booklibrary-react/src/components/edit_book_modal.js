import React, { Component } from "react";
import DataGrid from 'react-data-grid';
import ReactModal from 'react-modal';

class EditBookModal extends React.Component  {
    constructor (props) {
        super(props);
        console.log(props)
        this.state ={
        };
    }
    render(){
        return(
            <div>
                <ReactModal>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                </ReactModal>
            </div>
        )
    }
}
export default EditBookModal