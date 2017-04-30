import HttpService from '../util/HttpService';

export const CALL_INSTRUMENTS_API = Symbol('Call API');

export default store => next => action => {

  const callAPI = action[CALL_INSTRUMENTS_API]

  // So the middleware doesn't get applied to every single action
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { endpoint, types, authenticated, method, preLoaded, oData } = callAPI;

  const [ requestType, successType, errorType ] = types;

  if (preLoaded) 
  {
      next({
        preLoaded,
        authenticated,
        type: successType
      })
  }

  // Request Type
  next({type: requestType});

  // Passing the authenticated boolean back in our data will let us distinguish between normal and secret quotes
  return HttpService[method](endpoint, oData || null).then(
    response =>
      next({
        response,
        authenticated,
        type: successType
      }),
    error => next({
      error: error.message || 'There was an error.',
      type: errorType
    })
  )
}