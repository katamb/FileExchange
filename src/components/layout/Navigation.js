import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export default class Navigation extends React.Component {
    render = () => (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">Home</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/files/upload">Upload files</Nav.Link>
                    <Nav.Link href="/files/access">Access files</Nav.Link>
                    <Nav.Link href="/school">School</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}