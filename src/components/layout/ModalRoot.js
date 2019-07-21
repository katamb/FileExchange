import React from 'react'
import ConfirmationModal from "./../modal/ConfirmationModal";
import {connect} from "react-redux";
import {closeModal} from "../../state/actions/modalActions";
import {CONFIRMATION, ERROR} from "../../state/constants/modalConstants";
import ErrorModal from "../modal/ErrorModal";

class ModalRoot extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
        }
    }

    render = () => (
        <>
            {this.props.modalInfo &&
            <ConfirmationModal show={this.props.modalInfo.modalType === CONFIRMATION}
                               onHide={() => this.props.closeModal()}
                               modal={this.props.modalInfo.modalProps}/>}

            {this.props.modalInfo &&
            <ErrorModal show={this.props.modalInfo.modalType === ERROR}
                        onHide={() => this.props.closeModal()}
                        modal={this.props.modalInfo.modalProps}/>}
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        modalInfo: state.modals
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        closeModal: () => dispatch(closeModal())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalRoot)