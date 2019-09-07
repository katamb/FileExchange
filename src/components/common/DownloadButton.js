import React from "react";
import Button from "react-bootstrap/Button";
import {BACKEND_ADDRESS} from "../mainConstants";

export default class DownloadButton extends React.Component {

    constructor(props) {
        super(props);
        this.download = this.download.bind(this);
        this.downloadFile = this.downloadFile.bind(this);
        this.downloadFiles = this.downloadFiles.bind(this);
        this.getFileInfo = this.getFileInfo.bind(this);
    }

    async download() {
        if (this.props.fileId) {
            // single file
            const fileInfo = await this.getFileInfo(this.props.fileId);
            this.downloadFile(this.props.fileId, fileInfo.originalFileName);
        } else {
            // multiple files
            this.downloadFiles();
        }
    };

    async downloadFiles() {
        const response = await fetch(`${BACKEND_ADDRESS}/get/files`, {method: 'GET'});
        if (response.status !== 200) {
            window.href = "/";
        }
        const fileIds = await response.json();
        for (let fileId of fileIds) {
            const fileInfo = await this.getFileInfo(fileId);
            this.downloadFile(fileId, fileInfo.originalFileName);
        }
    };

    async getFileInfo(fileId) {
        const promise = await fetch(`${BACKEND_ADDRESS}/info/file/${fileId}`, {method: 'GET'});
        return await promise.json();
    }

    async downloadFile(fileId, fileName) {
        const file = await fetch(`${BACKEND_ADDRESS}/download/file/${fileId}`, {method: 'GET'});
        const fileBlob = await file.blob();

        const url = window.URL.createObjectURL(new Blob([fileBlob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    }

    render = () => (
        <Button className="ml-2"
                variant="primary"
                onClick={this.download}>
            {this.props.buttonText}
        </Button>
    )
}