import {
  call,
  race,
  take,
  put
} from 'redux-saga/effects';
import actionTypes from '@constants/actionTypes.js';

/**
 * Factory function that returns saga for handling fetch all authors request actions.
 * 
 * @param getAuthors        Function for calling API to obtain all authors.
 * @param makeSuccessAction Function for creating successful fetch actions for all authors.
 * @param makeErrorAction   Function for creating error fetch actions for all authors.
 * @returns Saga for handling fetch all authors request actions.
 */
export function makeFetchAuthorsSaga (getAuthors, makeSuccessAction, makeErrorAction) {
  return function* fetchAuthorsSaga () {
    try {
      const result = yield race({
        authors: call(getAuthors),
        cancel: take(actionTypes.FETCH_AUTHORS_CANCEL)
      })
      if (result.authors instanceof Error) {
        throw result.authors
      }
      if (!result.cancel) {
        yield put(makeSuccessAction(result.authors))
      }
    } catch (error) {
      yield put(makeErrorAction(error))
    }
  }
}
