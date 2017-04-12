import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import DashboardBox from './containers/dashboard/Dashboard';
import SongsBox from './containers/songs/Songs';
import SongDetailBox from './containers/songs/SongDetail';
import InsertSongBox from './containers/songs/InsertSong';
import GendersBox from './containers/genders/Genders';
import InstrumentsBox from './containers/instruments/Instruments';
import Login from './containers/auth/Login';
import Logout from './containers/auth/Logout';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import './index.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

function verififyAuth(nextState,replace) {
  if(localStorage.getItem('auth-token') === null)
	{
    replace('/login?msg=You need to login');
  }
}

ReactDOM.render(
  (
  <MuiThemeProvider>	
  	<Router history={browserHistory}>
	  	<Route path="/login" component={Login} />
			<Route path="/logout" component={Logout}/>
			<Route path="/" component={App} onEnter={verififyAuth}>
		  	<IndexRoute component={DashboardBox} onEnter={verififyAuth}/>
				<Route path="/songs" component={SongsBox} onEnter={verififyAuth}/>
				<Route path="/songDetail" component={SongDetailBox} onEnter={verififyAuth}/>
				<Route path="/insertSong" component={InsertSongBox} onEnter={verififyAuth}/>
		  	<Route path="/dashboard" component={DashboardBox} onEnter={verififyAuth}/>
		  	<Route path="/genders" component={GendersBox} onEnter={verififyAuth}/>
		  	<Route path="/instruments" component={InstrumentsBox} onEnter={verififyAuth}/>
		</Route>  	
	  </Router>
	</MuiThemeProvider>  
	),
  document.getElementById('root')
);
