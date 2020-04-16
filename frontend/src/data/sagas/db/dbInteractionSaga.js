import * as actions from '../../actions/dbActions'
import { put, call } from 'redux-saga/effects'
import { addMapPoint, removeMapPoint } from '../../api/db'

export function * dbAddPointSaga (sensor) {
  yield put(actions.dbAddPointStart(sensor))
  try {
    yield call(() => addMapPoint(sensor))
    yield put(actions.dbAddPointSuccess(sensor))
  } catch (error) {
    yield put(actions.dbAddPointFail(sensor, error))
  }
}

export function * dbRemovePointSaga (sensor) {
  yield put(actions.dbRemovePointStart(sensor))
  try {
    yield call(() => removeMapPoint(sensor))
    yield put(actions.dbRemovePointSuccess(sensor))
  } catch (error) {
    yield put(actions.dbRemovePointFail(sensor, error))
  }
}