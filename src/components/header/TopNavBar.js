import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import Notifications from './Notifications.js';
import User from './User.js';
import FormSearch from '../FormSearch.js';
import NavBarToggle from './NavBarToggle.js';
import Logout from '../../containers/auth/Logout';
import { logoutUser } from '../../actions/authActionCreator';

export default class TopNavBar extends Component {
	
  static propTypes = {
    title : PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    url : PropTypes.string.isRequired,
  }    
    
    render () {
        const { dispatch } = this.props
		return (
            <nav className="navbar navbar-transparent navbar-absolute">
                
                <div className="container-fluid">
                    <div className="navbar-header">
                        <NavBarToggle />
                        <Link className="navbar-brand" to={this.props.url}>{this.props.title}</Link>
                    </div>

                    <div className="collapse navbar-collapse">
                        
                        <ul className="nav navbar-nav navbar-right">
                            <Notifications />                           
                            <User />
                            <Logout onLogoutClick={() => dispatch(logoutUser())} />
            
                        </ul>
                        
                        <FormSearch />

                    </div>
                </div>

            </nav>
		);
	}
}