import { takeLatest } from 'redux-saga/effects'

import { makeFetchAuthorSaga } from './fetchOne';
import { fetchAuthor } from '@data/api/author'
import actionTypes from '@constants/actionTypes';

export function * watchAuthor () {
  yield takeLatest(actionTypes.FETCH_AUTHOR_REQUEST, makeFetchAuthorSaga(fetchAuthor))
}
