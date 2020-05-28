import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { addAnnonce } from "../../store/action";
import { Provider, connect } from "react-redux";

const mapStateToProps = (state) => {
  const annonces = state;
  console.log("state from mapStateToProps : ", state);

  return annonces;
};

class AnnoncesList extends React.PureComponent {
  constructor(props) {
    super(props);
    console.log("props from consctruc : ", this.props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.addAnnonce({id:3,title:"third"});
  }

  render() {
  
    console.log("props : ", this.props);
    return (
      <div className="row">
        <div className="col-md-12">
        <h1>List des annonces est {this.props.annonces.length}</h1>
          <button onClick={this.handleClick}>Activate Lasers</button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, { addAnnonce })(AnnoncesList);
