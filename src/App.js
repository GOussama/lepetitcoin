import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route , Switch} from 'react-router-dom';
import Inscription from './Inscription/Inscription';
import AnnoncesList from './Annonces/AnnoncesList/AnnoncesList'
import Connexion from './connexion/Connexion';
import { NavigationWithHistory } from './navigation/Navigation';


function App({count}) {
  return (
    <div className="container">
      <Router>
        <NavigationWithHistory/>
        <Switch>
          <Route path="/Inscription">
            <Inscription/>
          </Route>
          <Route path="/">
            <AnnoncesList count={count} />
          </Route>
          <Route path="/Connexion">
            <Connexion />
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
