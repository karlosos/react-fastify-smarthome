import { takeLatest } from 'redux-saga/effects'
import { dbAddPointSaga } from './dbInteractionSaga'
import actionTypes from '@constants/actionTypes'

export function * watchDB () {
  yield takeLatest(actionTypes.DB_ADD_POINT, dbAddPointSaga)
}
