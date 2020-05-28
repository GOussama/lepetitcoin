import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route , Switch} from 'react-router-dom';
import Inscription from './Inscription/Inscription';
import AnnoncesList from './Annonces/AnnoncesList/AnnoncesList'

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
        </Switch>        
      </Router>
    </div>
  );
}

export default App;
