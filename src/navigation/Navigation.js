import React from 'react';
import { withRouter } from 'react-router';
import { Navbar, Nav, Form, Badge, Button } from 'react-bootstrap';

const Navigation = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">LePetitCoin</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/">Nouvelle annonce</Nav.Link>
            </Nav>
            <Form inline>
                <Nav.Link href="/">Benjema</Nav.Link>
                <Button variant="outline-info">Log out</Button>
            </Form>
        </Navbar>
    );
}

export default Navigation;
export const NavigationWithHistory = withRouter(Navigation);