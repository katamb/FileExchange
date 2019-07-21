import React from 'react'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default class ConfirmationModal extends React.Component {

    runCallback = () => {
        this.props.modal.callBack();
        this.props.onHide();
    };

    render = () => (
        <Modal show={this.props.show}
               onHide={this.props.onHide}
               size="md"
               aria-labelledby="contained-modal-title-vcenter"
               centered>

            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Confirm action
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {this.props.modal &&
                <p>{this.props.modal.message}</p>}
            </Modal.Body>

            <Modal.Footer>
                {this.props.modal &&
                <Button onClick={this.runCallback}>Yes</Button>}
                <Button onClick={this.props.onHide}>No</Button>
            </Modal.Footer>
        </Modal>
    )
}