import React from 'react';
import { withRouter } from 'react-router';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { selectLogin, logout } from '../reducer/userSlice';
import { selectValue } from '../reducer/annoncesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Navigation = () => {

    const login = useSelector(selectLogin);
    const annonces = useSelector(selectValue);
    const dispatch = useDispatch();
    const history = useHistory();

    const loggingOut = () => {
        dispatch(logout());
        localStorage.removeItem('login');
        history.push('/Connexion');
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">LePetitCoin</Navbar.Brand>
            <Nav className="mr-auto">
                {/* <Nav.Link href="/">Home</Nav.Link> */}
                {login !== '' && <Nav.Link href="/">Mes annonces ({annonces.length})</Nav.Link>}
            </Nav>
            {login !== '' && <Navbar.Text className="mr-2">{login} est en ligne</Navbar.Text>}
            <Nav className="mr-right">   
                {login !== '' && <Nav.Link href="/CreateAnnonce">Nouvelle annonce</Nav.Link>}             
                {login !== '' && <Button variant="outline-info" onClick={loggingOut}>Déconnexion</Button>}
                {login === '' && <Nav.Link href="/Connexion">Se connecter</Nav.Link>}
                {login === '' && <Nav.Link href="/Inscription">S'inscrire</Nav.Link>}
            </Nav>
        </Navbar>
    );
}

export default Navigation;
export const NavigationWithHistory = withRouter(Navigation);