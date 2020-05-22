import * as actions from '../../actions/sensor'
import { put, call } from 'redux-saga/effects'
import {
  getSensors,
  changeSensorStatus,
  refreshSensors,
  changeLightDetails,
  changeWindowBlindsDetails,
  changeHvacRoomsDetails
} from '../../api/sensor'

const formatValue = value => (value / 10).toFixed(1)

const changeHvacTemperatureValueFormat = rooms => rooms.map(room => ({
  ...room,
  hysteresis: formatValue(room.hysteresis),
  heatingTemperature: formatValue(room.heatingTemperature),
  coolingTemperature: formatValue(room.coolingTemperature)
}))

const changeSensorTemperatureValueFormat = sensors => sensors.map(sensor => ({
  ...sensor,
  value: formatValue(sensor.value)
}))

export function * loadSensorsSaga () {
  yield put(actions.fetchSensorsStart())
  try {
    const sensors = yield call(getSensors)
    sensors.HVACRooms = changeHvacTemperatureValueFormat(sensors.HVACRooms)
    sensors.temperatureSensors = changeSensorTemperatureValueFormat(sensors.temperatureSensors)
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
    sensors.HVACRooms = changeHvacTemperatureValueFormat(sensors.HVACRooms)
    sensors.temperatureSensors = changeSensorTemperatureValueFormat(sensors.temperatureSensors)
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
  try {
    const hvacRoomsDetails = {
      ...action.hvacRoomsDetails,
      hysteresis: action.hvacRoomsDetails.hysteresis * 10,
      coolingTemperature: action.hvacRoomsDetails.coolingTemperature * 10,
      heatingTemperature: action.hvacRoomsDetails.heatingTemperature * 10
    }
    yield call(changeHvacRoomsDetails, hvacRoomsDetails)
    yield put(actions.changeHvacRoomsDetailsSuccess())
  } catch (error) {
    yield put(actions.changeHvacRoomsDetailsFail(error))
  }
}
