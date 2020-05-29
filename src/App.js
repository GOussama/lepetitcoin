import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route , Switch } from 'react-router-dom';
import Inscription from './Inscription/Inscription';
import AnnoncesList from './Annonces/AnnoncesList/AnnoncesList'
import CreateAnnonce from './Annonces/CreateAnnonce/CreateAnnonce'
import Connexion from './connexion/Connexion';
import { NavigationWithHistory } from './navigation/Navigation';
import { useDispatch } from 'react-redux';
import { connection } from './reducer/userSlice';
import axios from 'axios';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const login = localStorage.getItem('login');
    if (login !== '' && login !== null) {
      axios.get('http://localhost:3000/users')
        .then(response => {
          const users = response.data;
          const foundUser = users.find(u => u.email === login);
          if (foundUser === undefined || foundUser === null) {
            return;
          }
          dispatch(connection({
            name: foundUser.name,
            firstname: foundUser.firstname,
            email: login,
            sex: foundUser.sex,
            dateOfBirth: foundUser.dateOfBirth,
          }));
        })
        .catch(error => {
          console.log('server not responding');
        });
    }
  });

  return (
    <div className="container">
      <Router>
        <NavigationWithHistory />
        <Switch>
          <Route path="/Inscription">
            <Inscription />
          </Route>
          <Route path="/Connexion">
            <Connexion />
          </Route>
          <Route exact path="/CreateAnnonce">
            <CreateAnnonce />
          </Route>
          <Route path="/">
            <AnnoncesList />
          </Route>
        </Switch>        
      </Router>
    </div>
  );
}

export default App;
