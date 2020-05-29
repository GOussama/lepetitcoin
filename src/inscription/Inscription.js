import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Inscription.css';
import { Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addUser } from '../reducer/userSlice'
import axios from 'axios';

export default function Inscription() {

    const dispatch = useDispatch();
    const history = useHistory();

    const defaultValue = {
        name: '',
        firstname: '',
        sex: '',
        dateOfBirth: '',
        email: '',
        password: ''
    }
    const [formValue, setFormValue] = useState(defaultValue);

    const defaultError = {
        name: [],
        firstname: [],
        sex: [],
        dateOfBirth: [],
        email: [],
        password: []
    }
    const [formError, setFormError] = useState(defaultError);

    useEffect(() => {
        const login = localStorage.getItem("login");
        if (login !== '' && login !== null && login !== undefined)
            history.push("/");
    });

    const onInputChanged = (e) => {
        const inputValue = e.target.value;
        const inputName = e.target.name;
        setFormValue({ ...formValue, [inputName]: inputValue })

        const validators = validation[inputName];
        handleValidation(inputName, inputValue, validators);
    }

    const handleValidation = (name, value, validators) => {
        let isValid = false;
        validators.forEach(validator => {
            const result = validator(value, name);
            const errorList = formError[name];
            if (!result.isValid) {
                if (!errorList.includes(result.errorMessage))
                    setFormError(prevState => ({ ...prevState, [name]: [...errorList, result.errorMessage] }))
                isValid = false;
            } else {
                if (errorList.includes(result.errorMessage))
                    setFormError(prevState => ({ ...formError, [name]: errorList.filter(e => e !== result.errorMessage) }))
                isValid = true;
            }
        });
        return isValid;
    };

    const validateAllInput = () => {
        let isFormValid = true;
        Object.keys(formValue).forEach(key => {
            if (!handleValidation(key, formValue[key], validation[key]))
                isFormValid = false;
        });
        return isFormValid;
    };

    const isRequired = (value, name) => {
        return {
            isValid: value !== '',
            errorMessage: `${name} is empty`
        };
    };

    const isEmail = (value, name) => {
        return {
            isValid: value === '' || /\S+@\S+\.\S+/.test(value),
            errorMessage: `invalid ${name}`
        }
    };

    const isAged13 = (value, name) => {
        const dateOfBirth = +new Date(value);
        const age = ((Date.now() - dateOfBirth) / (31557600000));
        return {
            isValid: age >= 13,
            errorMessage: `You are under 13`
        }
    };

    const isStrongPassword = (value, name) => {
        return {
            isValid: value.length >= 8,
            errorMessage: 'use at least 8 characters'
        };
    };

    const defaultValidation = {
        name: [isRequired],
        firstname: [isRequired],
        sex: [isRequired],
        dateOfBirth: [isAged13, isRequired],
        email: [isEmail, isRequired],
        password: [isStrongPassword, isRequired]
    };
    const [validation, setValidation] = useState(defaultValidation);

    const submitForm = (e) => {
        e.preventDefault();

        if (validateAllInput()) {
            const {name, firstname, email, sex, dateOfBirth} = formValue;
            localStorage.setItem('login', email);
            
            axios.post('http://localhost:3000/users', formValue)
            .then(res => console.log(res))
            .catch(error => console.error(error));

            dispatch(addUser({ name, firstname, email, sex, dateOfBirth }));            
            history.push('/');
        }
    };

    return (
        <div className="mt-4">
            <div className="mb-4">
                <span className="mb-5">S'inscrire ou </span><a href="/Connexion">s'identifier</a>
            </div> 
            <div className="m-3">
                <div>Résumé de vos informations :</div>
                <div>Nom : {formValue.name}</div>
                <div>Prénom : {formValue.firstname}</div>
                <div>Email : {formValue.email}</div>
                <div>Sex : {formValue.sex}</div>
                <div>Date de naissance : {formValue.dateOfBirth}</div>
            </div>

            <form onSubmit={submitForm}>
                <div className="m-2">
                    <input className="btn btn-primary" type="submit" value="Valider" />
                </div>
                <hr/>
                <Row>
                    <Col>
                        <div className="form-group">
                            <label htmlFor="name">Nom</label>
                            <input type="text" className="form-control invalid" id="name" placeholder="nom" name="name" onChange={onInputChanged} />
                            <span className="errorMessage">{formError.name !== '' && formError.name}</span>
                        </div>
                    </Col>
                    <Col>
                        <div className="form-group">
                            <label htmlFor="firstname">Prénom</label>
                            <input type="text" className="form-control" id="firstname" placeholder="prénom" name="firstname" onChange={onInputChanged} />
                            <span className="errorMessage">{formError.firstname !== '' && formError.firstname}</span>
                        </div>
                    </Col>
                    <Col>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" placeholder="Enter your email" name="email" onChange={onInputChanged} />
                            <span className="errorMessage">{formError.email.length > 0 && formError.email[formError.email.length - 1] !== '' && formError.email[formError.email.length - 1]}</span>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="form-group">
                            <label htmlFor="sex">Sex</label>
                            <select className="form-control" id="sex" name="sex" onChange={e => onInputChanged(e, [isRequired])}>
                                <option value="">Select your sex</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            <span className="errorMessage">{formError.sex !== '' && formError.sex}</span>
                        </div>
                    </Col>
                    <Col>
                        <div className="form-group">
                            <label htmlFor="dateOfBirth">Date de naissance</label>
                            <input type="date" className="form-control" id="dateOfBirth" placeholder="Date de naissance" name="dateOfBirth" onChange={onInputChanged} />
                            <span className="errorMessage">{formError.dateOfBirth.length > 0 && formError.dateOfBirth[formError.dateOfBirth.length - 1] !== '' && formError.dateOfBirth[formError.dateOfBirth.length - 1]}</span>
                        </div>
                    </Col>
                    <Col>
                        <div className="form-group">
                            <label htmlFor="password">Mot de passe</label>
                            <input type="password" className="form-control" id="password" placeholder="Mot de passed" name="password" onChange={onInputChanged} />
                            <span className="errorMessage">{formError.password.length > 0 && formError.password[formError.password.length - 1] !== '' && formError.password[formError.password.length - 1]}</span>
                        </div>
                    </Col>
                </Row>
            </form>
        </div>
    );
}