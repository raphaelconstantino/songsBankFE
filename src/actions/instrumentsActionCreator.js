// The middleware to call the API for quotes
import { CALL_INSTRUMENTS_API } from '../middleware/instrumentsApi'

// LIST
export const INSTRUMENT_LIST_REQUEST = 'INSTRUMENT_LIST_REQUEST'
export const INSTRUMENT_LIST_SUCCESS = 'INSTRUMENT_LIST_SUCCESS'
export const INSTRUMENT_LIST_FAILURE = 'INSTRUMENT_LIST_FAILURE'

export function fetchInstruments() {
  return {
    [CALL_INSTRUMENTS_API]: {
      endpoint: 'v1/instrumments',
      authenticated: true,
      types: [INSTRUMENT_LIST_REQUEST, INSTRUMENT_LIST_SUCCESS, INSTRUMENT_LIST_FAILURE]
    }
  }
}