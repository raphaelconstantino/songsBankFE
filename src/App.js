import React, { Component } from 'react';
import './css/bootstrap.min.css';
import AppBar from 'material-ui/AppBar';
import Menu from './components/Menu';

class App extends Component {   

  constructor(props) {
    super(props);
    this.state = {open: true};
  }

  handleToggle = () => this.setState({open: true});

  render() {
    return (

        <div>        
            <div>
                <AppBar />
            </div>    

            <div>

                <div className="col-lg-2">  
                  <Menu open={this.state.open} handleToggle={this.handleToggle} />
                </div>  

                <div id="page-wrapper">


                    <div className="container-fluid col-lg-10 pull-right">

                        {this.props.children}

                    </div>
               
                </div>
           
            </div>
        </div>    
    );
  }
}

export default App;
