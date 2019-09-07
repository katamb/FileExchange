import React from 'react'
import {BACKEND_ADDRESS} from "../mainConstants";
import FileMenu from "./FileMenu";
import FileListPreview from "./FileListPreview";

export default class FilesList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            files: []
        }
    }

    componentDidMount() {
        fetch(`${BACKEND_ADDRESS}/get/files`, {
            method: 'GET'
        }).then((response) => {
            if (response.status === 200) {
                return response.json().then((json) => {
                    this.setState({files: json});
                });
            }
        })
    }

    render = () => (
        <div className="container-fluid">
            <FileMenu type={this.props.type}/>
            <div className="row justify-content-center">
                {this.state.files.map((fileId, index) =>
                    <FileListPreview key={index} fileId={fileId}/>)}
            </div>
        </div>
    )
}
