import React from 'react';
import {showErrorModal, showSuccessModal} from "../../state/actions/modalActions";
import {connect} from "react-redux";
import {BACKEND_ADDRESS} from "../mainConstants";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";

class LinkView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newLinkContent: '',
            newLinkUrl: ''
        }
    }

    addLink = () => {
        if (this.state.newLinkContent.length === 0 || this.state.newLinkUrl.length === 0) return;
        console.log(this.state.newLinkUrl)

        fetch(`${BACKEND_ADDRESS}/api/school/add/link`, {
            method: 'POST',
            body: JSON.stringify({
                linkSubject: this.props.subjectId,
                linkContent: this.state.newLinkContent,
                linkUrl: this.state.newLinkUrl
            }),
            headers: {'Content-Type': 'application/json'}
        }).then((response) => {
            if (response.status !== 200) {
                response.json().then((jsonResponse) => this.props.openErrorModal(jsonResponse.message));
            } else {
                this.props.reloadLinks();
                this.setState({
                    newLinkContent: '',
                    newLinkUrl: ''
                })
            }
        })
    };

    render = () => (
        <div className="col-6">
            <h2>Links:</h2>
            <ListGroup>
                {this.props.links.map(link =>
                    <ListGroup.Item key={link.linkId} variant="secondary">
                        <div className="d-flex">
                            <div className="mr-auto">
                                <a href={link.linkUrl}>{link.linkContent}</a>
                            </div>
                        </div>
                    </ListGroup.Item>
                )}
            </ListGroup>

            <Form className="mt-3">
                <Form.Group controlId="formLinkContent">
                    <Form.Control size="sm" type="text" placeholder="Link name"
                                  value={this.state.newLinkContent}
                                  onChange={(e) => this.setState({newLinkContent: e.target.value})}/>
                </Form.Group>

                <Form.Group controlId="formLinkUrl">
                    <Form.Control size="sm" as="textarea" rows="3" type="text" placeholder="Link URL"
                                  value={this.state.newLinkUrl}
                                  onChange={(e) => this.setState({newLinkUrl: e.target.value})}/>
                </Form.Group>
            </Form>

            <Button size="sm" variant="primary" type="submit" onClick={this.addLink}>
                Add link
            </Button>

        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        openErrorModal: (msg) => dispatch(showErrorModal(msg)),
        openSuccessModal: (msg) => dispatch(showSuccessModal(msg))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LinkView)