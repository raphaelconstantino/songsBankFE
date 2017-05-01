// The middleware to call the API for quotes
import { CALL_HTTP_API } from '../middleware/httpApi'

// LIST
export const GENDER_LIST_REQUEST = 'GENDER_LIST_REQUEST'
export const GENDER_LIST_SUCCESS = 'GENDER_LIST_SUCCESS'
export const GENDER_LIST_FAILURE = 'GENDER_LIST_FAILURE'
// DELETE
export const GENDER_DELETE_REQUEST = 'GENDER_DELETE_REQUEST'
export const GENDER_DELETE_SUCCESS = 'GENDER_DELETE_SUCCESS'
export const GENDER_DELETE_FAILURE = 'GENDER_DELETE_FAILURE'
// DELETE
export const GENDER_INSERT_REQUEST = 'GENDER_INSERT_REQUEST'
export const GENDER_INSERT_SUCCESS = 'GENDER_INSERT_SUCCESS'
export const GENDER_INSERT_FAILURE = 'GENDER_INSERT_FAILURE'

export function fetchGenders(oPreLoaded) {
  return {
    [CALL_HTTP_API]: {
      endpoint: 'v1/genders',
      preLoaded : oPreLoaded,
      method : "get",
      authenticated: true,
      types: [GENDER_LIST_REQUEST, GENDER_LIST_SUCCESS, GENDER_LIST_FAILURE]
    }
  }
}

export function deleteGenders (url) {
    return {
    [CALL_HTTP_API]: {
      endpoint: url,
      method : "del",
      authenticated: true,
      types: [GENDER_DELETE_REQUEST, GENDER_DELETE_SUCCESS, GENDER_DELETE_FAILURE]
    }
  }
}

export function insertGender (url, oData) {
    return {
    [CALL_HTTP_API]: {
      endpoint: url,
      method : "post",
      oData,
      authenticated: true,
      types: [GENDER_INSERT_REQUEST, GENDER_INSERT_SUCCESS, GENDER_INSERT_FAILURE]
    }
  }
}
