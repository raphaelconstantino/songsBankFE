import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Menu from './components/Menu';
import Login from './containers/Login';
import { loginUser } from './actions/authActionCreator';
import './css/bootstrap.min.css';
import './css/material-dashboard.css';
import './css/app.css';

class App extends Component {   

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    auth : PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string
  }

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
    const { dispatch, isAuthenticated, errorMessage, auth, instruments } = this.props
    return (
      <div>

          {!isAuthenticated &&
            <Login
              auth={auth}
              errorMessage={errorMessage}
              onLoginClick={ creds => dispatch(loginUser(creds)) }
            />
          }

          {isAuthenticated &&
            <div className="wrapper">           

              <Menu dispatch={dispatch} open={this.state.open} handleToggle={this.handleToggle} pathName={this.props.location.pathname} />

              <div className="transparent-layer" onClick={this.closeMenu}></div>

              {React.cloneElement(this.props.children, { dispatch, instruments })}
              
            </div>
          }

      </div>        
    );
  }
}

// These props come from the application's
// state when it is started
function mapStateToProps(state) {

  const { auth, instruments } = state;
  const { isAuthenticated, errorMessage } = auth;

  return {
    instruments,
    auth,
    isAuthenticated,
    errorMessage
  }
}

export default connect(mapStateToProps)(App)
