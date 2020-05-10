import { takeLatest } from 'redux-saga/effects'
import {
  loadSensorsSaga,
  changeSensorStatusSaga,
  refreshSensorsSaga,
  changeLightSensorDetailsSaga,
  changeWindowBlindsSensorDetailsSaga,
  changeHvacRoomsDetailsSaga
} from './sensorSagas'
import actionTypes from '@constants/actionTypes'

export function * watchSensors () {
  yield takeLatest(actionTypes.SENSORS_LOAD_ACTION, loadSensorsSaga)
  yield takeLatest(actionTypes.SENSOR_CHANGE_STATUS_ACTION, changeSensorStatusSaga)
  yield takeLatest(actionTypes.SENSORS_REFRESH_ACTION, refreshSensorsSaga)
  yield takeLatest(actionTypes.SENSOR_LIGHT_CHANGE_ACTION, changeLightSensorDetailsSaga)
  yield takeLatest(actionTypes.SENSOR_WINDOW_BLINDS_CHANGE_ACTION, changeWindowBlindsSensorDetailsSaga)
  yield takeLatest(actionTypes.HVAC_ROOMS_CHANGE_ACTION, changeHvacRoomsDetailsSaga)
}
