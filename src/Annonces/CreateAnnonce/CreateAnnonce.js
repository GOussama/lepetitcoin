import React, { useState } from "react";
import { selectValue, add } from '../../reducer/annoncesSlice';
import { useSelector, useDispatch } from 'react-redux';

export default function CreateAnnonce() {

  console.log("CreateAnnonce")

  const annonces = useSelector(selectValue);
  const dispatch = useDispatch();

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
      <div className="form-group">
        <label htmlFor="title">Title :</label>
        <input type="text" className="form-control" id="title" value={formValue.title} name="title" onChange={onInputChanged}/>
      </div>
      <div className="form-group">
        <label htmlFor="description">Description :</label>
        <input type="text" className="form-control" id="title" value={formValue.description} name="description" onChange={onInputChanged}/>
      </div>
      <button className="btn btn-primary" onClick={addAnnonce}>Ajouter</button>
    </div>
  );
}