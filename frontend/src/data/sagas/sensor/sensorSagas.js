import * as actions from '../../actions/sensor'
import { put, call } from 'redux-saga/effects'
import { getSensors, changeSensorStatus, refreshSensors, changeLightDetails, changeWindowBlindsDetails, changeHvacRoomsDetails } from '../../api/sensor'

export function * loadSensorsSaga () {
  yield put(actions.fetchSensorsStart())
  try {
    const sensors = yield call(getSensors)
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

export function * refreshSensorsSaga () {
  yield put(actions.refreshSensorsStart())
  try {
    const sensors = yield call(refreshSensors)
    yield put(actions.refreshSensorsSuccess(sensors))
  } catch (error) {
    yield put(actions.refreshSensorsFail(error))
  }
}

export function * changeLightSensorDetailsSaga (action) {
  yield put(actions.changeLightSensorDetailsStart())
  try {
    yield call(changeLightDetails, action.lightSensorDetails)
    yield put(actions.changeLightSensorDetailsSuccess())
  } catch (error) {
    yield put(actions.changeLightSensorDetailsFail(error))
  }
}

export function * changeWindowBlindsSensorDetailsSaga (action) {
  yield put(actions.changeWindowBlindsSensorDetailsStart())
  try {
    yield call(changeWindowBlindsDetails, action.windowBlindsSensorDetails)
    yield put(actions.changeWindowBlindsSensorDetailsSuccess())
  } catch (error) {
    yield put(actions.changeWindowBlindsSensorDetailsFail(error))
  }
}

export function * changeHvacRoomsDetailsSaga (action) {
  yield put(actions.changeHvacRoomsDetailsStart())
  const { name, id, heatingTemperature, coolingTemperature, hysteresis, temperatureSensorId, windowSensorIds, type } =
    action.hvacRoomsDetails
  try {
    yield call(changeHvacRoomsDetails, {
      id,
      heatingTemperature,
      coolingTemperature,
      hysteresis,
      temperatureSensorId,
      windowSensorIds,
      type
    })
    yield put(actions.changeHvacRoomsDetailsSuccess())
  } catch (error) {
    yield put(actions.changeHvacRoomsDetailsFail(error))
  }
}
