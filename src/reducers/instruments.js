import {
  INSTRUMENT_LIST_REQUEST, INSTRUMENT_LIST_SUCCESS, INSTRUMENT_LIST_FAILURE,
  INSTRUMENT_DELETE_REQUEST, INSTRUMENT_DELETE_SUCCESS, INSTRUMENT_DELETE_FAILURE,
  INSTRUMENT_INSERT_REQUEST, INSTRUMENT_INSERT_SUCCESS, INSTRUMENT_INSERT_FAILURE
} from '../actions/instrumentsActionCreator'

let initState = {
    isFetching: false,
    response: [],
    authenticated: false,
    message : null
  }

// The list reducer
export default function list(state = initState, action) {
  
  switch (action.type) {
    //FETCH
    case INSTRUMENT_LIST_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case INSTRUMENT_LIST_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        response: action.response,
        authenticated: action.authenticated || false
      })
    case INSTRUMENT_LIST_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      })
    // DELETE
    case INSTRUMENT_DELETE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case INSTRUMENT_DELETE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        response: action.response,
        authenticated: action.authenticated || false,
        message : {
          status : "success",
          text : "Instrument deleted sucessfully"
        }        
      })  
    case INSTRUMENT_DELETE_FAILURE:
      return Object.assign({}, state, {
        isFetching: true,
        message : {
          status : "danger",
          text : "An error ocurred. Please try again and if the problem remains contact us."
        }
      })     
    // INSERT
    case INSTRUMENT_INSERT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case INSTRUMENT_INSERT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        response: action.response,
        authenticated: action.authenticated || false,
        message : {
          status : "success",
          text : "Instrument inserted sucessfully"
        }
      })  
    case INSTRUMENT_INSERT_FAILURE:
      return Object.assign({}, state, {
        isFetching: true,
        message : {
          status : "danger",
          text : "An error ocurred. Please try again and if the problem remains contact us."
        }        
      })              
    default:
      return state
    }
}