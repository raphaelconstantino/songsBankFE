// React
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
// Redux
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import auth from './reducers/auth';
import instruments from './reducers/instruments';
import genders from './reducers/genders';
import authApi from './middleware/authApi';
import httpApi from './middleware/httpApi';
// Containers
import DashboardBox from './containers/Dashboard';
import SongsBox from './containers/Songs';
import SongDetailBox from './containers/SongDetail';
import InsertSongBox from './containers/InsertSong';
import GendersBox from './containers/Genders';
import InstrumentsBox from './containers/Instruments';
// Ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './index.css';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Combine APP reducers
const listApp = combineReducers({
  auth,
  instruments,
  genders
})

let createStoreWithMiddleware = applyMiddleware(thunkMiddleware, authApi, httpApi)(createStore);
let store = createStoreWithMiddleware(listApp);

ReactDOM.render(
  (
  <MuiThemeProvider>	
		<Provider store={store}> 
			<Router history={browserHistory}>
				<Route path="/" component={App}>
					<IndexRoute component={DashboardBox} />
					<Route path="/songs" component={SongsBox} />
					<Route path="/songDetail" component={SongDetailBox} />
					<Route path="/insertSong" component={InsertSongBox} />
					<Route path="/dashboard" component={DashboardBox} />
					<Route path="/genders" component={GendersBox} />
					<Route path="/instruments" component={InstrumentsBox} />
			</Route>  	
			</Router>
		</Provider>	
	</MuiThemeProvider>  
	),
  document.getElementById('root')
);
