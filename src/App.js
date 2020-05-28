import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route , Switch} from 'react-router-dom';
import Inscription from './inscription/Inscription';

function App() {
  return (
    <div className="container">      
      <Router>
        <Switch>
          <Route path="/Inscription">
            <Inscription/>
          </Route>
        </Switch>        
      </Router>
    </div>
  );
}

export default App;
