import React from 'react'
import Button from "react-bootstrap/Button";
import {showConfirmationModal} from "../state/actions/modalActions";
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

        </div>
    )
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        openConfirmationModal: () => dispatch(showConfirmationModal("msg", () => console.log("yo")))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home)