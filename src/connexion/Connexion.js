import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { connection } from '../reducer/userSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';

export default function () {

    const dispatch = useDispatch();
    const history = useHistory();

    const defaultValue = {
        login: '',
        password: '',
        errorMessage: ''
    };
    const [formValue, setFormValue] = useState(defaultValue);

    const onInputChanged = (e) => {
        const inputValue = e.target.value;
        const inputName = e.target.name;
        setFormValue({ ...formValue, [inputName]: inputValue })
    }

    const identifyUser = () => {
        const { login, password } = formValue;
        axios.get('http://localhost:3000/users')
            .then(response => {
                const users = response.data;
                const foundUser = users.find(u => u.email === login);
                if (foundUser === undefined || foundUser === null) {
                    setFormValue({ ...formValue, errorMessage: 'Identifiant ou mot de passe incorrecte' });
                    return;
                }
                if (foundUser.password !== password) {
                    setFormValue({ ...formValue, errorMessage: 'Identifiant ou mot de passe incorrecte' });
                    return;
                }

                localStorage.setItem('login', formValue.login);
                dispatch(connection({
                    name: foundUser.name,
                    firstname: foundUser.firstname,
                    email: foundUser.email,
                    sex: foundUser.sex,
                    dateOfBirth: foundUser.dateOfBirth,
                }));

                history.push('/');
            })
            .catch(error => {
                console.log('server not responding');
            });
    }

    const onConnexion = (e) => {
        e.preventDefault();
        identifyUser();
    };

    return (
        <div className="mt-5">
            <Row>
                <Col md="3"></Col>
                <Col md="6">
                    <div className="mb-4">
                        <span className="mb-5">S'identifier ou </span><a href="/Inscription">créer un compte</a>
                    </div>

                    <form onSubmit={onConnexion}>
                        <Row className="mt-2">
                            <Col md="4">
                                <label htmlFor="name">Identifiant</label>
                            </Col>
                            <Col md="8">
                                <input type="text" className="form-control" id="login" placeholder="Login ou email" name="login" onChange={onInputChanged} />
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col md="4">
                                <label htmlFor="password">Mot de passe</label>
                            </Col>
                            <Col md="8">
                                <input type="password" className="form-control" id="password" placeholder="Mot de passe" name="password" onChange={onInputChanged} />
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col md="4">
                                <input className="btn btn-primary" type="submit" value="Valider" />
                            </Col>
                            <Col md="8">
                                {formValue.errorMessage && <div className="errorMessage">{formValue.errorMessage}</div>}
                            </Col>
                        </Row>
                    </form>
                </Col>
                <Col md="3"></Col>
            </Row>
        </div>
    );
}