import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route , Switch } from 'react-router-dom';
import Inscription from './inscription/Inscription';
import AnnoncesList from './Annonces/AnnoncesList/AnnoncesList'
import Connexion from './connexion/Connexion';
import { NavigationWithHistory } from './navigation/Navigation';
import { useDispatch } from 'react-redux';
import { connection } from './reducer/userSlice';

function App() {
  
  const dispatch = useDispatch();

  useEffect(() => {
    const login = localStorage.getItem('login');
    if (login !== '' && login !== null) {
      dispatch(connection({
        name: 'randomName',
        firstname: 'randomFirstName',
        email: login,
        sex: 'male',
        dateOfBirth: '2020/02/02'
      }));
    }
  });

  return (
    <div className="container">
      <Router>
        <NavigationWithHistory/>
        <Switch>
          <Route path="/Inscription">
            <Inscription/>
          </Route>
          <Route path="/Connexion">
            <Connexion />
          </Route>
          <Route path="/"><AnnoncesList /></Route>
        </Switch>        
      </Router>
    </div>
  );
}

export default App;
