import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

export default class Navigation extends React.Component {
    render = () => (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">Home</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <NavDropdown title="Videos">
                        <NavDropdown.Item href="videos/upload">Upload</NavDropdown.Item>
                        <NavDropdown.Item href="videos/watch">Watch</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Pictures">
                        <NavDropdown.Item href="pictures/upload">Upload</NavDropdown.Item>
                        <NavDropdown.Item href="pictures/watch">Watch</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}