import {
  GENDER_LIST_REQUEST, GENDER_LIST_SUCCESS, GENDER_LIST_FAILURE,
  GENDER_DELETE_REQUEST, GENDER_DELETE_SUCCESS, GENDER_DELETE_FAILURE,
  GENDER_INSERT_REQUEST, GENDER_INSERT_SUCCESS, GENDER_INSERT_FAILURE
} from '../actions/gendersActionCreator'

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
    case GENDER_LIST_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case GENDER_LIST_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        response: action.response,
        authenticated: action.authenticated || false,
        message : null
      })
    case GENDER_LIST_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      })
    // DELETE
    case GENDER_DELETE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case GENDER_DELETE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        response: action.response,
        authenticated: action.authenticated || false,
        message : {
          status : "success",
          text : "Gender deleted sucessfully"
        }        
      })  
    case GENDER_DELETE_FAILURE:
      return Object.assign({}, state, {
        isFetching: true,
        message : {
          status : "danger",
          text : "An error ocurred. Please try again and if the problem remains contact us."
        }
      })     
    // INSERT
    case GENDER_INSERT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case GENDER_INSERT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        response: action.response,
        authenticated: action.authenticated || false,
        message : {
          status : "success",
          text : "Gender inserted sucessfully"
        }
      })  
    case GENDER_INSERT_FAILURE:
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