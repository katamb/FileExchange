import React from 'react';
import FileUpload from "../common/FileUpload";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {showErrorModal, showSuccessModal} from "../../state/actions/modalActions";
import {connect} from "react-redux";
import {BACKEND_ADDRESS} from "../mainConstants";
import Spinner from "react-bootstrap/Spinner";

class PhotoUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            photos: []
        }
    }

    addPhotos = (data) => {
        const files = Array.from(data);
        const newList = this.state.photos.concat(files);

        this.setState({photos: newList});
    };

    removePhotos = (toRemoveName) => {
        const newList = this.state.photos.filter(photo => toRemoveName !== photo.name);
        this.setState({photos: newList});
    };

    uploadData = () => {
        this.setState({loading: true});
        let formData = new FormData();
        for (let name in this.state.photos) {
            formData.append("pics", this.state.photos[name]);
        }

        fetch(`${BACKEND_ADDRESS}/upload/photos`, {
            method: 'POST',
            headers: {},
            body: formData
        }).then((response) => {
            if (response.status !== 200) {
                response.json().then((jsonResponse) => this.props.openErrorModal(jsonResponse.message))
            } else {
                this.props.openSuccessModal();
                this.setState({photos: []});
            }
            this.setState({loading: false});
        })
    };

    render = () => (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-sm-10 col-md-9 col-lg-8 col-xl-7">

                    <label className="pt-3">Upload photos</label>
                    <FileUpload addFiles={this.addPhotos}/>

                    {!this.state.loading &&
                        <div className="text-center my-3">
                            <Button onClick={this.uploadData}>Upload images</Button>
                        </div>
                    }

                    {this.state.loading &&
                    <div className="text-center my-3">
                        <Button disabled>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            <span>&nbsp;Uploading...</span>
                        </Button>
                    </div>
                    }

                </div>
                <div className="col-sm-12 col-md-11 col-lg-10 col-xl-10">
                    {this.state.photos.length > 0 &&
                    <label>Preview photos (click to remove)</label>}
                    <div className="row justify-content-center">
                        {this.state.photos.map((photo, index) =>
                            <PhotoPreview key={index}
                                          photo={photo}
                                          removePhoto={(name) => this.removePhotos(name)}/>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        openErrorModal: (msg) => dispatch(showErrorModal("Failed to upload given files. \n Errormessage: " + msg)),
        openSuccessModal: () => dispatch(showSuccessModal("Files uploaded successfully!"))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotoUpload)

class PhotoPreview extends React.Component {

    constructor(props) {
        super(props);
        this.loadPreview(props);
        this.state = {
            photoPreview: null
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps !== this.props) this.loadPreview(nextProps);
    }

    loadPreview = (props) => {
        let reader = new FileReader();
        reader.onload = (event) => this.setState({photoPreview: event.target.result});
        reader.readAsDataURL(props.photo);
    };

    render = () => (
        <div className="col-sm-6 col-md-4 mb-2">
            <Card className="cursor-pointer border-danger-on-hover"
                  onClick={() => this.props.removePhoto(this.props.photo.name)}>
                <Card.Img variant="top" src={this.state.photoPreview} alt="Image preview..."/>
                <Card.Body className="p-2 text-center">
                    <Card.Title className="m-0">{this.props.photo.name}</Card.Title>
                </Card.Body>
            </Card>
        </div>
    )
}