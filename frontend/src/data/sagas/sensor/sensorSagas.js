import * as actions from '../../actions/sensor'
import { put, call } from 'redux-saga/effects'
import { getSensors, changeSensorStatus } from '../../api/sensor'

export function * loadSensorsSaga () {
  yield put(actions.fetchSensorsStart())
  try {
    const sensors = yield call(getSensors) // exchange with real async inside getSensors
    yield put(actions.fetchSensorsSuccess(sensors))
  } catch (error) {
    yield put(actions.fetchSensorsFail(error))
  }
}

export function * changeSensorStatusSaga (action) {
  yield put(actions.changeSensorStatusStart())
  try {
    const response = yield call(changeSensorStatus, action.sensorId) // exchange with real async inside changeSensorStatus
    yield put(actions.changeSensorStatusSuccess(response))
  } catch (error) {
    yield put(actions.changeSensorStatusFail(error))
  }
}
