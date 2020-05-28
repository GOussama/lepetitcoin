import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

export default class AnnoncesList extends React.PureComponent {
  constructor(props) {
    super(props);
 }

 render() {
    return (
      <div className="row">
          <div className="col-md-4">
             <h1>List des annonces</h1>
          </div>
      </div>
    )}

}