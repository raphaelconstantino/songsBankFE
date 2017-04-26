import * as constants from '../util/constants';

export const CALL_AUTH_API = Symbol('Call AUTH API');

export default store => next => action => {

  const callAuthAPI = action[CALL_AUTH_API]

  // So the middleware doesn't get applied to every single action
  if (typeof callAuthAPI === 'undefined') {
    return next(action);
  }

  let { endpoint, types, creds } = callAuthAPI;

  const [ requestType, successType, errorType ] = types;

  // Request Type
  next({
      type : requestType,
      creds
    });


 let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `login=${creds.username}&password=${creds.password}`
  }

  return fetch(endpoint, config)
    .then(response => response.json().then(obj => ({ obj, response })))
    .then(({ obj, response }) =>  {
        if (!response.ok) {
            next({
                type : errorType, 
                message : 'Invalid Email/Password'
            })
        } else {
            // If login was successful, set the token in local storage
            localStorage.setItem(constants.TOKEN, obj[constants.TOKEN])
            // Dispatch the success action
            next({
                type : successType, response
            })
        }
    })
    .catch(err => console.log("Error: ", err))
}