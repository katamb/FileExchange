import React from 'react'
import {BACKEND_ADDRESS} from "../mainConstants";
import {showConfirmationModal, showErrorModal} from "../../state/actions/modalActions";
import {connect} from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import fileIcon from "./../../assets/file.svg"
import {IMG_FILE_TYPE} from "../common/constants";
import DownloadButton from "../common/DownloadButton";

class FileDetails extends React.Component {

    constructor(props) {
        super(props);
        this.getFileInfo = this.getFileInfo.bind(this);
        this.getFileInfo();
        this.state = {
            defaultPreview: true,
            filePreview: fileIcon,
            file: {}
        }
    }

    async getFileInfo() {
        const response = await fetch(`${BACKEND_ADDRESS}/info/file/${this.props.fileId}`, {method: 'GET'});
        if (response.status !== 200) window.location.href = "/files/access";
        const file = await response.json();
        if (this.getFileType(file) === IMG_FILE_TYPE) {
            this.setState({
                defaultPreview: false,
                filePreview: `${BACKEND_ADDRESS}/get/file/${this.props.fileId}`,
                file: file
            });
        } else {
            this.setState({
                defaultPreview: true,
                file: file
            })
        }
    };

    getFileType = (file) => {
        return (file !== undefined) ? file.fileType.split("/")[0] : "";
    };

    deleteFile = () => {
        fetch(`${BACKEND_ADDRESS}/delete/${this.props.fileId}`, {
            method: 'DELETE'
        }).then((response) => {
            if (response.status !== 200) {
                response.json().then((json) => {
                    this.props.openErrorModal(json.message);
                })
            } else {
                window.location.href = "/files/access";
            }
        })
    };

    confirmDelete = () => {
        const message = 'Are you sure you want to delete this file?';
        this.props.openConfirmationModal(message, this.deleteFile);
    };

    render = () => (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-md-10 col-sm-12">
                    <Card className="mx-auto my-3">
                        {!this.state.defaultPreview &&
                        <Card.Img className="max-img-height" variant="top"
                                  src={this.state.filePreview} alt="File preview..."/>}

                        {this.state.defaultPreview &&
                        <div>
                            <Card.Img className="upload-preview" variant="top"
                                      src={this.state.filePreview} alt="File preview..."/>
                            <div className="on-top-file">
                                <h3>{this.state.file.fileExtension}</h3>
                            </div>
                        </div>}

                        <Card.Body>
                            <Card.Title>{this.state.file.originalFileName}</Card.Title>
                            <div className="row">
                                <DownloadButton buttonText="Download" fileId={this.props.fileId}/>
                                <Button className="mr-2 ml-auto" variant="danger"
                                        onClick={this.confirmDelete}>Delete</Button>
                            </div>

                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        fileId: ownProps.match.params.fileId
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        openErrorModal: (message) => dispatch(showErrorModal("Problems handling the file. \n Errormessage: " + message)),
        openConfirmationModal: (message, callBack) => dispatch(showConfirmationModal(message, callBack))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FileDetails)
