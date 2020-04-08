import * as actions from '../../actions/dbActions'
import { put, call } from 'redux-saga/effects'
import { addMapPoint } from '../../api/db'

export function * dbAddPointSaga (sensor) {
  yield put(actions.dbAddPointStart(sensor))
  try {
    yield call(() => addMapPoint(sensor))
    yield put(actions.dbAddPointSuccess(sensor))
  } catch (error) {
    yield put(actions.dbAddPointFail(sensor, error))
  }
}
