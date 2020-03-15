import actionTypes from '../../../common/constants/actionTypes'

export function loadDashboard () {
  return {
    type: actionTypes.DASHBOARD_LOAD_ACTION
  }
}

export function fetchSensorsStart () {
  return {
    type: actionTypes.DASHBOARD_FETCH_SENSORS_START
  }
}

export function fetchSensorsSuccess (sensors) {
  return {
    type: actionTypes.DASHBOARD_FETCH_SENSORS_SUCCESS,
    sensors
  }
}

export function fetchSensorsFail (error) {
  return {
    type: actionTypes.DASHBOARD_FETCH_SENSORS_FAIL,
    error
  }
}

export function fetchMapStart () {
  return {
    type: actionTypes.DASHBOARD_FETCH_MAP_START
  }
}

export function fetchMapSuccess (map) {
  return {
    type: actionTypes.DASHBOARD_FETCH_MAP_SUCCESS,
    map
  }
}

export function fetchMapFail (error) {
  return {
    type: actionTypes.DASHBOARD_FETCH_MAP_FAIL,
    error
  }
}

export function changeSensorStatus (sensorId) {
  return {
    type: actionTypes.DASHBOARD_SENSOR_CHANGE_STATUS_ACTION,
    sensorId
  }
}

export function changeSensorStatusStart () {
  return {
    type: actionTypes.DASHBOARD_SENSOR_CHANGE_STATUS_START
  }
}

export function changeSensorStatusSuccess () {
  return {
    type: actionTypes.DASHBOARD_SENSOR_CHANGE_STATUS_SUCCESS
  }
}

export function changeSensorStatusFail (error) {
  return {
    type: actionTypes.DASHBOARD_SENSOR_CHANGE_STATUS_FAIL,
    error
  }
}
