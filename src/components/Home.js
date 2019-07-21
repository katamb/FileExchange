import React from 'react'
import Button from "react-bootstrap/Button";
import ConfirmationModal from "./modal/ConfirmationModal";
import {showConfirmationModal} from "../state/actions";
import {connect} from "react-redux";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
        }
    }

    render = () => (
        <div>
            <h1>Home</h1>
            <p>Welcome home!</p>

            <Button onClick={this.props.openConfirmationModal}>Open redux modal</Button>


            <Button onClick={() => this.setState({showModal: true})}>Open modal</Button>
            <ConfirmationModal
                show={this.state.showModal}
                onHide={() => this.setState({showModal: false})}/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        openConfirmationModal: () => dispatch(showConfirmationModal("msg", "cb"))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home)