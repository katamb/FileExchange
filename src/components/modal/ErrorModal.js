import React from 'react'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default class ConfirmationModal extends React.Component {
    render = () => (
        <Modal show={this.props.show}
               onHide={this.props.onHide}
               size="md"
               aria-labelledby="contained-modal-title-vcenter"
               centered>

            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <h4>Centered Modal</h4>
                <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                    dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                    consectetur ac, vestibulum at eros.
                </p>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}