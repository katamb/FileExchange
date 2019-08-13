import React from 'react'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default class SuccessModal extends React.Component {
    render = () => (
        <Modal show={this.props.show}
               onHide={this.props.onHide}
               size="md"
               aria-labelledby="contained-modal-title-vcenter"
               centered>

            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Success
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {this.props.modal &&
                <p>{this.props.modal.message}</p>
                }
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}