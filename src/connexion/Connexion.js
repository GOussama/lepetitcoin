import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

export default function () {

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
        console.log('login :', login);
        console.log('password :', password);
        if ((login === 'test') && (password === 'test')) {
            return true;
        }
        return false;
    }

    const onConnexion = (e) => {
        e.preventDefault();
        if (identifyUser()) {
            //Call callback function of App.js

            //Add localStorage
            localStorage.setItem('isAuthenticated', true);
            localStorage.setItem('login', formValue.email);

            //Add redirection
            history.push('/');
        } else {
            setFormValue({ ...formValue, errorMessage: 'authentication failed' });
        }
    };

    return (
        <div>
            <h3>Identify yourself</h3>

            <form onSubmit={onConnexion}>
                <Row className="m-2">
                    <Col md="4">
                        <label htmlFor="name">Login</label>
                    </Col>
                    <Col md="8">
                        <input type="text" className="form-control" id="login" placeholder="Enter your login or your email" name="login" onChange={onInputChanged} />
                    </Col>
                </Row>
                <Row className="m-2">
                    <Col md="4">
                        <label htmlFor="password">Password</label>
                    </Col>
                    <Col md="8">
                        <input type="password" className="form-control" id="password" placeholder="Enter your password" name="password" onChange={onInputChanged} />
                    </Col>
                </Row>
                <Row className="m-2">
                    <Col md="4"></Col>                    
                    <Col md="8">
                        {formValue.errorMessage && <div className="errorMessage">{formValue.errorMessage}</div>}
                    </Col>
                </Row>
                <Row className="m-2">
                    <Col md="12">
                        <input className="btn btn-primary" type="submit" value="submit" />
                    </Col>
                </Row>
            </form>
        </div>
    );
}