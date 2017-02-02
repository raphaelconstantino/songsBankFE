import React, { Component } from 'react';
import './css/bootstrap.min.css';
import './css/app.css';
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

                <div>  
                  <Menu open={this.state.open} handleToggle={this.handleToggle} />
                </div>  

                <div id="page-wrapper">


                    <div className="container-fluid pull-right app-container col-12 col-sm-12 col-md-10 col-lg-10">

                        {this.props.children}

                    </div>
               
                </div>
           
            </div>
        </div>    
    );
  }
}

export default App;
