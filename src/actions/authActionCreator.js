// The middleware to call the API for quotes
import { CALL_AUTH_API } from '../middleware/authApi'
import * as constants from '../util/constants';

// LOGIN
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
// LOGOUT
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

// LOGIN Function
export function loginUser(creds) {
  return {
    [CALL_AUTH_API]: {
      endpoint: 'authenticate',
      types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
      creds
    }
  }
}

// LOGOUT Function
export function logoutUser() {
  return dispatch => {
    dispatch({type : LOGOUT_REQUEST});
    localStorage.removeItem(constants.TOKEN)
    dispatch({type : LOGOUT_SUCCESS});
  }
}