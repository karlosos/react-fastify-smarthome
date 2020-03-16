import actionTypes from '../../../common/constants/actionTypes'

export function loadSensors () {
  return {
    type: actionTypes.SENSORS_LOAD_ACTION
  }
}

export function fetchSensorsStart () {
  return {
    type: actionTypes.SENSORS_FETCH_START
  }
}

export function fetchSensorsSuccess (sensors) {
  return {
    type: actionTypes.SENSORS_FETCH_SUCCESS,
    sensors
  }
}

export function fetchSensorsFail (error) {
  return {
    type: actionTypes.SENSORS_FETCH_FAIL,
    error
  }
}

export function changeSensorStatus (sensorId) {
  return {
    type: actionTypes.SENSOR_CHANGE_STATUS_ACTION,
    sensorId
  }
}

export function changeSensorStatusStart () {
  return {
    type: actionTypes.SENSOR_CHANGE_STATUS_START
  }
}

export function changeSensorStatusSuccess () {
  return {
    type: actionTypes.SENSOR_CHANGE_STATUS_SUCCESS
  }
}

export function changeSensorStatusFail (error) {
  return {
    type: actionTypes.SENSOR_CHANGE_STATUS_FAIL,
    error
  }
}
