import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { connection } from '../reducer/userSlice';
import { useDispatch } from 'react-redux';

export default function () {

    const dispatch = useDispatch()    ;
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
        if (login !== '' && password !== '')//TODO : more complex logic
            return true;
        return false;
    }

    const onConnexion = (e) => {
        e.preventDefault();
        if (identifyUser()) {         
            localStorage.setItem('login', formValue.login);   
            dispatch(connection({
                name: 'randomName',
                firstname: 'randomFirstName',
                email: formValue.login,
                sex: 'male',
                dateOfBirth: '2020/02/02'
            }));

            //Add redirection
            history.push('/');
        } else {
            setFormValue({ ...formValue, errorMessage: 'Identifiant ou mot de passe incorrecte' });
        }
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