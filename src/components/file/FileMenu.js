import {BACKEND_ADDRESS} from "../mainConstants";
import {showConfirmationModal, showErrorModal} from "../../state/actions/modalActions";
import {connect} from "react-redux";
import React from "react";
import Button from "react-bootstrap/Button";
import DownloadButton from "../common/DownloadButton";

class FileMenu extends React.Component {

    deleteFiles = () => {
        fetch(`${BACKEND_ADDRESS}/delete`, {
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
        const message = 'Are you sure you want to delete all files?';
        this.props.openConfirmationModal(message, this.deleteFiles);
    };

    render = () => (
        <div className="row justify-content-center">
            <div className="col-sm-11 col-md-5 col-lg-3 my-2">
                <div className="d-flex">
                    <DownloadButton buttonText="Download all"/>
                    <Button className="mr-2 ml-auto" variant="danger"
                            onClick={this.confirmDelete}>Delete all</Button>
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
        openErrorModal: (message) => dispatch(showErrorModal("Problems handling the file. \n Errormessage: " + message)),
        openConfirmationModal: (message, callBack) => dispatch(showConfirmationModal(message, callBack))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FileMenu);