import React, { Component } from 'react';
import './css/bootstrap.min.css';
import './css/sb-admin.css';
import Nav from './nav/Nav';

class App extends Component {   

  render() {
    return (
        <div id="wrapper">
      
            <Nav />

            <div id="page-wrapper">

                <div className="container-fluid">
                   
                    {this.props.children}

                </div>
           
            </div>
       
        </div>
    );
  }
}

export default App;
