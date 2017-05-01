// The middleware to call the API for quotes
import { CALL_HTTP_API } from '../middleware/httpApi'

// LIST
export const INSTRUMENT_LIST_REQUEST = 'INSTRUMENT_LIST_REQUEST'
export const INSTRUMENT_LIST_SUCCESS = 'INSTRUMENT_LIST_SUCCESS'
export const INSTRUMENT_LIST_FAILURE = 'INSTRUMENT_LIST_FAILURE'
// DELETE
export const INSTRUMENT_DELETE_REQUEST = 'INSTRUMENT_DELETE_REQUEST'
export const INSTRUMENT_DELETE_SUCCESS = 'INSTRUMENT_DELETE_SUCCESS'
export const INSTRUMENT_DELETE_FAILURE = 'INSTRUMENT_DELETE_FAILURE'
// DELETE
export const INSTRUMENT_INSERT_REQUEST = 'INSTRUMENT_INSERT_REQUEST'
export const INSTRUMENT_INSERT_SUCCESS = 'INSTRUMENT_INSERT_SUCCESS'
export const INSTRUMENT_INSERT_FAILURE = 'INSTRUMENT_INSERT_FAILURE'

export function fetchInstruments(oPreLoaded) {
  return {
    [CALL_HTTP_API]: {
      endpoint: 'v1/instrumments',
      preLoaded : oPreLoaded,
      method : "get",
      authenticated: true,
      types: [INSTRUMENT_LIST_REQUEST, INSTRUMENT_LIST_SUCCESS, INSTRUMENT_LIST_FAILURE]
    }
  }
}

export function deleteInstruments (url) {
    return {
    [CALL_HTTP_API]: {
      endpoint: url,
      method : "del",
      authenticated: true,
      types: [INSTRUMENT_DELETE_REQUEST, INSTRUMENT_DELETE_SUCCESS, INSTRUMENT_DELETE_FAILURE]
    }
  }
}

export function insertIntrument (url, oData) {
    return {
    [CALL_HTTP_API]: {
      endpoint: url,
      method : "post",
      oData,
      authenticated: true,
      types: [INSTRUMENT_INSERT_REQUEST, INSTRUMENT_INSERT_SUCCESS, INSTRUMENT_INSERT_FAILURE]
    }
  }
}
