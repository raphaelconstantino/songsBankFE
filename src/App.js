import React, { Component } from 'react';
import './css/bootstrap.min.css';
import './css/material-dashboard.css';
import './css/app.css';
import Menu from './components/Menu';

class App extends Component {   

  constructor(props) {
    super(props);
    this.state = {open: true};
  }

  handleToggle = () => this.setState({open: true});

  closeMenu (e) {
    let bodyClass = document.querySelector('html').classList;
    
    bodyClass.remove("nav-open");
  }

  render() {
    return (

        <div className="wrapper">           

          <Menu open={this.state.open} handleToggle={this.handleToggle} pathName={this.props.location.pathname} />

          <div className="transparent-layer" onClick={this.closeMenu}></div>

          {this.props.children}
           
        </div>    
    );
  }
}

export default App;
