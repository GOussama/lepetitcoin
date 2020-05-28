import React from 'react';
import { withRouter } from 'react-router';
import { Navbar, Nav, Button } from 'react-bootstrap';

const Navigation = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">LePetitCoin</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/">Mes annonces (5)</Nav.Link>
                <Nav.Link href="/">Nouvelle annonce</Nav.Link>
            </Nav>
            <Nav className="mr-right">
                <Nav.Link href="/">Benjema</Nav.Link>
                <Button variant="outline-info">Log out</Button>
            </Nav>
        </Navbar>
    );
}

export default Navigation;
export const NavigationWithHistory = withRouter(Navigation);