import React, { useState, useEffect } from "react";
import { selectValue, add } from '../../reducer/annoncesSlice';
import { useSelector, useDispatch } from 'react-redux';
import './AnnoncesList.css'
import { useHistory } from 'react-router-dom'

export default function AnnoncesList() {

  console.log("AnnoncesList")


  const annonces = useSelector(selectValue);
  const dispatch = useDispatch();

  const history = useHistory();
  useEffect(() => {
    const login = localStorage.getItem("login");
    if (login === '' || login === null || login === undefined)
      history.push("/Connexion");
  });

  const defaultValue = { title: '' };
  const [formValue, setFormValue] = useState(defaultValue);

  const onInputChanged = (e) => {
    const inputValue = e.target.value;
    const inputName = e.target.name;
    setFormValue({ ...formValue, [inputName]: inputValue })
  }
  
  const addAnnonce = annonce => {
    const { title } = formValue;
    dispatch(add({id: annonces.length, title}));
    setFormValue({title: ''});
  };

  return (
    <div>
      <div className="container annonces-list">
        {annonces.map(annonce => <div key={annonce.id}>
          <div className="card">
          <div className="card-body">
            <h5 className="card-title">{annonce.title}</h5>
            <p className="card-text">{annonce.description}</p>
            <p className="card-text">{annonce.prix}</p>
            <a href="#" className="btn btn-primary">Contacter</a>
          </div>
        </div>
        </div>)}
      </div>
    </div>
  );
}