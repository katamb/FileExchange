import React from 'react';
import {showErrorModal, showSuccessModal} from "../../state/actions/modalActions";
import {connect} from "react-redux";
import {BACKEND_ADDRESS} from "../mainConstants";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import TodoView from "./TodoView";
import LinkView from "./LinkView";
import Form from "react-bootstrap/Form";

class SchoolView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            subjects: [],
            addSubject: false,
            newSubjectName: '',
            subjectId: undefined,
            todos: [],
            links: [],
            notes: []
        }
    }

    componentDidMount = () => this.loadSubjects();

    loadSubjects = () => {
        fetch(`${BACKEND_ADDRESS}/api/school/all/subjects`, {
            method: 'GET'
        }).then((response) => {
            if (response.status !== 200) {
                response.json().then((jsonResponse) => this.props.openErrorModal(jsonResponse.message));
            } else {
                response.json().then((jsonResponse) => this.setState({subjects: jsonResponse}));
            }
        })
    };

    loadTodos = (subjectId) => {
        fetch(`${BACKEND_ADDRESS}/api/school/todo/${subjectId}`, {
            method: 'GET'
        }).then((response) => {
            if (response.status !== 200) {
                response.json().then((jsonResponse) => this.props.openErrorModal(jsonResponse.message));
            } else {
                response.json().then((jsonResponse) => this.setState({todos: jsonResponse}));
            }
        })
    };

    loadLinks = (subjectId) => {
        fetch(`${BACKEND_ADDRESS}/api/school/link/${subjectId}`, {
            method: 'GET'
        }).then((response) => {
            if (response.status !== 200) {
                response.json().then((jsonResponse) => this.props.openErrorModal(jsonResponse.message));
            } else {
                response.json().then((jsonResponse) => this.setState({links: jsonResponse}));
            }
        })
    };

    addSubject = () => {
        fetch(`${BACKEND_ADDRESS}/api/school/add/subject`, {
            method: 'POST',
            body: JSON.stringify({subjectName: this.state.newSubjectName}),
            headers: {'Content-Type': 'application/json'}
        }).then((response) => {
            if (response.status !== 200) {
                response.json().then((jsonResponse) => this.props.openErrorModal(jsonResponse.message));
            } else {
                this.loadSubjects();
            }
        })
    };

    getVariant = (itemId) => {
        if (itemId === this.state.subjectId) {
            return 'secondary';
        }
        return 'outline-secondary';
    };

    selectSubject = (subjectId) => {
        this.setState({subjectId: subjectId});
        this.loadTodos(subjectId);
        this.loadLinks(subjectId);
    };

    render = () => (
        <div className="container">
            <div className="row justify-content-center my-3">
                <div className="col-md-8 col-sm-12 text-center">
                    {this.state.subjects.map(subject =>
                        <Button className={`mx-1`}
                                key={subject.subjectId}
                                variant={`${this.getVariant(subject.subjectId)}`}
                                onClick={() => this.selectSubject(subject.subjectId)}>
                            {subject.subjectName}
                        </Button>
                    )}
                </div>

                <div className="col-md-4 col-sm-12 text-center">
                    <Button size="sm" variant="primary" className="mb-1"
                            onClick={() => this.setState({addSubject: !this.state.addSubject})}>
                        {this.state.addSubject &&
                            <span>Hide input</span>}
                        {!this.state.addSubject &&
                            <span>Add subject</span>}
                    </Button>

                    {this.state.addSubject &&
                    <InputGroup className="mb-3">
                        <FormControl size="sm" placeholder="Subject name"
                                     onChange={(e) => this.setState({newSubjectName: e.target.value})}/>
                        <InputGroup.Append>
                            <Button size="sm" variant="primary" onClick={this.addSubject}>
                                Add subject
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>}
                </div>
            </div>

            {!this.state.subjectId &&
            <div className="text-center">
                <h2>Select a subject from above!</h2>
            </div>}

            {this.state.subjectId &&
            <div className="row justify-content-center">

                <TodoView todos={this.state.todos}
                          subjectId={this.state.subjectId}
                          reloadTodos={() => this.loadTodos(this.state.subjectId)}/>

                <LinkView links={this.state.links}
                          subjectId={this.state.subjectId}
                          reloadLinks={() => this.loadLinks(this.state.subjectId)}/>
            </div>}
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

export default connect(mapStateToProps, mapDispatchToProps)(SchoolView)