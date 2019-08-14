import React from 'react'
import {BACKEND_ADDRESS} from "../mainConstants";
import {showConfirmationModal, showErrorModal} from "../../state/actions/modalActions";
import {connect} from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

class PhotoDetails extends React.Component {

    constructor(props) {
        super(props);
        this.getPhotoInfo();
        this.state = {
            photo: {}
        }
    }

    getPhotoInfo = () => {
        console.log(this.props.photoId)
        fetch(`${BACKEND_ADDRESS}/info/photo/${this.props.photoId}`, {
            method: 'GET'
        }).then((response) => {
            if (response.status !== 200) {
                this.props.openErrorModal(response.message);
            } else {
                response.json().then((json) => {
                    this.setState({photo: json});
                });
            }
        })
    };

    deletePhoto = () => {
        fetch(`${BACKEND_ADDRESS}/delete/photo/${this.props.photoId}`, {
            method: 'DELETE'
        }).then((response) => {
            if (response.status !== 200) {
                response.json().then((json) => {
                    this.props.openErrorModal(json.message);
                })
            } else {
                window.location.href = "/photos/watch";
            }
        })
    };

    confirmDelete = () => {
        const message = 'Are you sure you want to delete this photo?';
        this.props.openConfirmationModal(message, this.deletePhoto);
    };

    render = () => (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-md-10 col-sm-12">
                    <Card className="mx-auto my-3">
                        <Card.Img className="max-img-height"
                                  src={`${BACKEND_ADDRESS}/get/photo/${this.props.photoId}`}
                                  alt="Image preview..."/>
                        <Card.Body>
                            <Card.Title>{this.state.photo.originalFileName}</Card.Title>

                            <div className="row">
                                <a className="ml-2"
                                   href={`${BACKEND_ADDRESS}/download/photo/${this.props.photoId}`}>
                                    <Button variant="primary">Download</Button>
                                </a>
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
        photoId: ownProps.match.params.photoId
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        openErrorModal: (message) => dispatch(showErrorModal("Problems handling the file. \n Errormessage: " + message)),
        openConfirmationModal: (message, callBack) => dispatch(showConfirmationModal(message, callBack))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotoDetails)
