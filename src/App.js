import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route , Switch} from 'react-router-dom';
import Inscription from './Inscription/Inscription';
import AnnoncesList from './Annonces/AnnoncesList/AnnoncesList'
import Connexion from './connexion/Connexion';


function App() {
  return (
    <div className="container">      
      <Router>
        <Switch>
          <Route path="/Inscription">
            <Inscription/>
          </Route>
          <Route path="/">
            <AnnoncesList />
          </Route>
          <Route path="/Connexion">
            <Connexion/>
          </Route>
        </Switch>        
      </Router>
    </div>
  );
}

export default App;
