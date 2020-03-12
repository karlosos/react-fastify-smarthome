import sagaHelper from 'redux-saga-testing';
import { call, put, select, race, take } from 'redux-saga/effects';

import actionTypes from '@constants/actionTypes.js';
import { makeFetchAuthorsSaga } from './fetchAllSaga';

describe('Testing author saga', () => {
  describe('Successful fetch data from api', () => {
    const apiCall = () => []
    const callNextSagaYield = sagaHelper(makeFetchAuthorsSaga(
      apiCall,
      res => res,
      err => err
    )())


    callNextSagaYield('should start race between api call and cancelation action', (result) => {
      expect(result).toEqual(race({
        authors: call(apiCall),
        cancel: take(actionTypes.FETCH_AUTHORS_CANCEL)
      }))

      return {
        authors: [1, 2],
        cancel: undefined
      }
    })

    callNextSagaYield('then should put obtained authors to store', (result) => {
      expect(result).toEqual(put([1, 2]))
    })

    callNextSagaYield('should do nothing', (result) => {
      expect(result).toBeUndefined()
    })
  })

  // TO DO: cancel, error
});
