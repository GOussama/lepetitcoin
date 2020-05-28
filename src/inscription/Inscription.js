import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Inscription.css';

export default function Inscription() {
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
            //Call callback function of App.js

            //Add localStorage
            localStorage.setItem('isAuthenticated', true);
            localStorage.setItem('login', formValue.email);

            //Add redirection
            history.push('/');
        }
    };

    return (
        <div>
            <h3>Register a new user</h3>
            <div className="m-3">
                <div>Summary of your info :</div>
                <div>Name : {formValue.name}</div>
                <div>Firstname : {formValue.firstname}</div>
                <div>Email : {formValue.email}</div>
                <div>Sex : {formValue.sex}</div>
                <div>DateOfBirth : {formValue.dateOfBirth}</div>
            </div>

            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control invalid" id="name" placeholder="Enter your name" name="name" onChange={onInputChanged} />
                    <span className="errorMessage">{formError.name !== '' && formError.name}</span>
                </div>
                <div className="form-group">
                    <label htmlFor="firstname">Firstname</label>
                    <input type="text" className="form-control" id="firstname" placeholder="Enter your firstname" name="firstname" onChange={onInputChanged} />
                    <span className="errorMessage">{formError.firstname !== '' && formError.firstname}</span>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter your email" name="email" onChange={onInputChanged} />
                    <span className="errorMessage">{formError.email.length > 0 && formError.email[formError.email.length - 1] !== '' && formError.email[formError.email.length - 1]}</span>
                </div>
                <div className="form-group">
                    <label htmlFor="sex">Sex</label>
                    <select className="form-control" id="sex" name="sex" onChange={e => onInputChanged(e, [isRequired])}>
                        <option value="">Select your sex</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <span className="errorMessage">{formError.sex !== '' && formError.sex}</span>
                </div>
                <div className="form-group">
                    <label htmlFor="dateOfBirth">Date of birth</label>
                    <input type="date" className="form-control" id="dateOfBirth" placeholder="Enter your date of birth" name="dateOfBirth" onChange={onInputChanged} />
                    <span className="errorMessage">{formError.dateOfBirth.length > 0 && formError.dateOfBirth[formError.dateOfBirth.length - 1] !== '' && formError.dateOfBirth[formError.dateOfBirth.length - 1]}</span>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Enter your password" name="password" onChange={onInputChanged} />
                    <span className="errorMessage">{formError.password.length > 0 && formError.password[formError.password.length - 1] !== '' && formError.password[formError.password.length - 1]}</span>
                </div>

                <div className="m-2">
                    <input className="btn btn-default" type="submit" value="submit" />
                </div>
            </form>
        </div>
    );
}