import React from 'react';
import {showErrorModal, showSuccessModal} from "../../state/actions/modalActions";
import {connect} from "react-redux";
import {BACKEND_ADDRESS} from "../mainConstants";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Dropdown from "react-bootstrap/Dropdown";
import {DONE, IN_PROGRESS, IN_REVIEW, TODO} from "./TodoConstants";
import Form from "react-bootstrap/Form";

class TodoView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newTodoContent: ''
        }
    }

    addTodo = () => {
        if (this.state.newTodoContent.length === 0) return;

        fetch(`${BACKEND_ADDRESS}/api/school/add/todo`, {
            method: 'POST',
            body: JSON.stringify({todoSubject: this.props.subjectId, todoContent: this.state.newTodoContent}),
            headers: {'Content-Type': 'application/json'}
        }).then((response) => {
            if (response.status !== 200) {
                response.json().then((jsonResponse) => this.props.openErrorModal(jsonResponse.message));
            } else {
                this.props.reloadTodos();
                this.setState({newTodoContent: ''})
            }
        })
    };

    getBackground = (status) => {
        switch (status) {
            case TODO:
                return 'danger';
            case IN_PROGRESS:
                return 'warning';
            case IN_REVIEW:
                return 'info';
            case DONE:
                return 'success';
            default:
                return 'secondary';
        }
    };

    changeStatus = (todoId, status) => {
        fetch(`${BACKEND_ADDRESS}/api/school/update/todo`, {
            method: 'PUT',
            body: JSON.stringify({todoId: todoId, todoStatus: status}),
            headers: {'Content-Type': 'application/json'}
        }).then((response) => {
            if (response.status !== 200) {
                response.json().then((jsonResponse) => this.props.openErrorModal(jsonResponse.message));
            } else {
                this.props.reloadTodos();
            }
        })
    };

    render = () => (
        <div className="col-6">
            <h2>To Do:</h2>
            <ListGroup className="pr-3">
                {this.props.todos.map(todo =>
                    <ListGroup.Item key={todo.todoId} variant={this.getBackground(todo.todoStatus)}>
                        <div className="d-flex">
                            <div className="mr-auto">
                                {todo.todoContent}
                            </div>

                            <div className="ml-auto">
                                <Dropdown>
                                    <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                                        {todo.todoStatus}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item>
                                            <Button classname="m-2" variant="danger"
                                                    onClick={() => this.changeStatus(todo.todoId, TODO)}>
                                                To Do
                                            </Button>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            <Button classname="m-2" variant="warning"
                                                    onClick={() => this.changeStatus(todo.todoId, IN_PROGRESS)}>
                                                In Progress
                                            </Button>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            <Button classname="m-2" variant="info"
                                                    onClick={() => this.changeStatus(todo.todoId, IN_REVIEW)}>
                                                In review
                                            </Button>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            <Button classname="m-2" variant="success"
                                                    onClick={() => this.changeStatus(todo.todoId, DONE)}>
                                                Done
                                            </Button>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>

                    </ListGroup.Item>
                )}
            </ListGroup>

            <Form className="mt-3 mb-0 pr-3">
                <Form.Group controlId="formLinkTodo">
                    <Form.Control size="sm" type="text"
                                  placeholder="Todo content"
                                  value={this.state.newTodoContent}
                                  onChange={(e) => this.setState({newTodoContent: e.target.value})}/>
                </Form.Group>
            </Form>

            <Button size="sm" variant="primary" type="submit" className="mt-0" onClick={this.addTodo}>
                Add todo
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

export default connect(mapStateToProps, mapDispatchToProps)(TodoView)