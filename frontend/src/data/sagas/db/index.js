import { takeLatest } from 'redux-saga/effects'
import { dbAddPointSaga, dbRemovePointSaga } from './dbInteractionSaga'
import actionTypes from '@constants/actionTypes'

export function * watchDB () {
  yield takeLatest(actionTypes.DB_ADD_POINT, dbAddPointSaga)
  yield takeLatest(actionTypes.DB_REMOVE_POINT, dbRemovePointSaga)
}
