import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SongsBox from './songs/Songs';
import GendersBox from './genders/Genders';
import InstrumentsBox from './instruments/Instruments';
import {Router, Route, browserHistory} from 'react-router';
import './index.css';

ReactDOM.render(
  (<Router history={browserHistory}>
  	<Route path="/" component={App} >
	  	<Route path="/songs" component={SongsBox} />
	  	<Route path="/dashboard" />
	  	<Route path="/genders" component={GendersBox} />
	  	<Route path="/instruments" component={InstrumentsBox} />
	</Route>  	
  </Router>),
  document.getElementById('root')
);
