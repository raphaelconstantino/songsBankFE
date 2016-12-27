import React, { Component } from 'react';
import './css/bootstrap.min.css';
import './css/sb-admin.css';

import AppBar from 'material-ui/AppBar';
import Menu from './components/Menu';

class App extends Component {   

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  render() {
    return (

        <div>        
            <div>
                <AppBar title="My Songs Bank" iconClassNameRight="muidocs-icon-navigation-expand-more" onLeftIconButtonTouchTap={this.handleToggle}/>
            </div>    

            <div>

                <Menu open={this.state.open} handleToggle={this.handleToggle} />

                <div id="page-wrapper">


                    <div className="container-fluid">

                        {this.props.children}

                    </div>
               
                </div>
           
            </div>
        </div>    
    );
  }
}

export default App;
