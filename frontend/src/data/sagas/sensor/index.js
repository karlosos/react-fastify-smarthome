import { takeLatest } from 'redux-saga/effects'
import { loadSensorsSaga, changeSensorStatusSaga, refreshSensorsSaga } from './sensorSagas'
import actionTypes from '@constants/actionTypes'

export function * watchSensors () {
  yield takeLatest(actionTypes.SENSORS_LOAD_ACTION, loadSensorsSaga)
  yield takeLatest(actionTypes.SENSOR_CHANGE_STATUS_ACTION, changeSensorStatusSaga)
  yield takeLatest(actionTypes.SENSORS_REFRESH_ACTION, refreshSensorsSaga)
}
