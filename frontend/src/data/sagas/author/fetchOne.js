import {
  call,
  race,
  take,
  put
} from 'redux-saga/effects';
import actionTypes from '@constants/actionTypes.js';
import { fetchAuthorSuccess, fetchAuthorError } from '@data/actions/author';

/**
 * Factory function that returns saga for handling fetch one author request actions.
 * 
 * @param getAuthor Function for calling API to obtain one author by id.
 * @returns Saga for handling fetch one author request actions.
 */
export function makeFetchAuthorSaga (getAuthor) {
  return function* fetchAuthorSaga (action) {
    try {
      const result = yield race({
        author: call(getAuthor, action.id),
        cancel: take(actionTypes.FETCH_AUTHOR_CANCEL)
      })
      if (result.author instanceof Error) {
        throw result.author
      }
      if (!result.cancel) {
        yield put(fetchAuthorSuccess(result.author))
      }
    } catch (error) {
      yield put(fetchAuthorError(error))
    }
  }
}
