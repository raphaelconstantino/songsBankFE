import {
  INSTRUMENT_LIST_REQUEST, INSTRUMENT_LIST_SUCCESS, INSTRUMENT_LIST_FAILURE,
  INSTRUMENT_DELETE_REQUEST, INSTRUMENT_DELETE_SUCCESS, INSTRUMENT_DELETE_FAILURE
} from '../actions/instrumentsActionCreator'

let initState = {
    isFetching: false,
    response: [],
    authenticated: false
  }

// The list reducer
export default function list(state = initState, action) {
  
  switch (action.type) {
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
    case INSTRUMENT_DELETE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case INSTRUMENT_DELETE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        response: action.response,
        authenticated: action.authenticated || false
      })  
    case INSTRUMENT_DELETE_FAILURE:
      return Object.assign({}, state, {
        isFetching: true
      })        
    default:
      return state
    }
}