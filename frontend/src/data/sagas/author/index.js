import { takeLatest } from 'redux-saga/effects'

import { makeFetchAuthorsSaga } from './fetchAllSaga';
import { makeFetchAuthorSaga } from './fetchOne';
import { fetchAuthors, fetchAuthor } from '@data/api/author'
import actionTypes from '@constants/actionTypes';
import { fetchAuthorsSuccess, fetchAuthorsError } from '@data/actions/author';

export function * watchAuthors () {
  yield takeLatest(actionTypes.FETCH_AUTHORS_REQUEST, makeFetchAuthorsSaga(fetchAuthors, fetchAuthorsSuccess, fetchAuthorsError))
}

export function * watchAuthor () {
  yield takeLatest(actionTypes.FETCH_AUTHOR_REQUEST, makeFetchAuthorSaga(fetchAuthor))
}
