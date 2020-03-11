import { takeLatest } from 'redux-saga/effects'

import { makeFetchAuthorsSaga } from './fetchAllSaga';
import { fetchAuthors } from '@data/api/author'
import actionTypes from '@constants/actionTypes';
import { fetchAuthorsSuccess, fetchAuthorsError } from '@data/actions/author';

export function * watchAuthors () {
  yield takeLatest(actionTypes.FETCH_AUTHORS_REQUEST, makeFetchAuthorsSaga(fetchAuthors, fetchAuthorsSuccess, fetchAuthorsError))
}
