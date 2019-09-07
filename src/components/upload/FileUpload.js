import React from 'react';
import FileUploadInput from "../common/FileUploadInput";
import Button from "react-bootstrap/Button";
import {showErrorModal, showSuccessModal} from "../../state/actions/modalActions";
import {connect} from "react-redux";
import {BACKEND_ADDRESS} from "../mainConstants";
import UploadingButton from "../common/UploadingButton";
import UploadPreview from "./UploadPreview";

class FileUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            files: []
        }
    }

    addFiles = (data) => {
        const files = Array.from(data);
        const newList = this.state.files.concat(files);
        this.setState({files: newList});
    };

    removeFiles = (toRemoveIndex) => {
        const newList = this.state.files.filter((file, index) => toRemoveIndex !== index);
        this.setState({files: newList});
    };

    uploadData = () => {
        this.setState({loading: true});
        let formData = new FormData();
        for (let file of this.state.files) {
            formData.append("files", file);
        }

        fetch(`${BACKEND_ADDRESS}/upload`, {
            method: 'POST',
            headers: {},
            body: formData
        }).then((response) => {
            if (response.status !== 200) {
                response.json().then((jsonResponse) => this.props.openErrorModal(jsonResponse.message));
            } else {
                this.props.openSuccessModal();
                this.setState({files: []});
            }
            this.setState({loading: false});
        })
    };

    render = () => (
        <div className="container">
            <div className="row justify-content-center">

                <div className="col-sm-10 col-md-9 col-lg-8 col-xl-7">
                    <h3 className="pt-4 pb-2">Upload files</h3>
                    <FileUploadInput addFiles={this.addFiles}/>

                    {!this.state.loading &&
                    <div className="text-center my-3">
                        <Button onClick={this.uploadData}>Upload</Button>
                    </div>
                    }
                    {this.state.loading &&
                    <UploadingButton/>
                    }
                </div>

                <div className="col-sm-12 col-md-11 col-lg-10 col-xl-10 text-center">
                    {this.state.files.length > 0 &&
                    <h4 className="mt-3 mb-2">Preview files (click to remove)</h4>}
                    <div className="row justify-content-center">
                        {this.state.files.map((file, index) =>
                            <UploadPreview key={index} file={file} keyProp={index}
                                           removeFile={(ind) => this.removeFiles(ind)}/>)}
                    </div>
                </div>

            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        openErrorModal: (msg) => dispatch(showErrorModal("Failed to upload files. \n Errormessage: " + msg)),
        openSuccessModal: () => dispatch(showSuccessModal("Files uploaded successfully!"))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FileUpload)
