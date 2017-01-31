import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import DashboardBox from './containers/dashboard/Dashboard';
import SongsBox from './containers/songs/Songs';
import GendersBox from './containers/genders/Genders';
import InstrumentsBox from './containers/instruments/Instruments';
import {Router, Route, browserHistory} from 'react-router';
import './index.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render(
  (
  <MuiThemeProvider>	
  	<Router history={browserHistory}>
	  	<Route path="/" component={App} >
		  	<Route path="/songs" component={SongsBox} />
		  	<Route path="/dashboard" component={DashboardBox}/>
		  	<Route path="/genders" component={GendersBox} />
		  	<Route path="/instruments" component={InstrumentsBox} />
		</Route>  	
	  </Router>
	</MuiThemeProvider>  
	),
  document.getElementById('root')
);
