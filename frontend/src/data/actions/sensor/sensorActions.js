import actionTypes from '../../../common/constants/actionTypes'

export function loadSensors () {
  return {
    type: actionTypes.SENSORS_LOAD_ACTION
  }
}

export function updateSensors (sensors) {
  return {
    type: actionTypes.SENSORS_UPDATE_ACTION,
    sensors
  }
}

export function updateSensorsStart () {
  return {
    type: actionTypes.SENSORS_UPDATE_START
  }
}

export function updateSensorsSuccess (sensors) {
  return {
    type: actionTypes.SENSORS_UPDATE_SUCCESS,
    sensors
  }
}

export function updateSensorsFail (error) {
  return {
    type: actionTypes.SENSORS_UPDATE_FAIL,
    error
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

export function addSensorRequest (sensor) {
  return {
    type: actionTypes.ADD_SENSOR_REQUEST,
    sensor
  }
}

export function refreshSensors () {
  return {
    type: actionTypes.SENSORS_REFRESH_ACTION
  }
}

export function refreshSensorsStart () {
  return {
    type: actionTypes.SENSORS_REFRESH_START
  }
}

export function refreshSensorsSuccess (sensors) {
  return {
    type: actionTypes.SENSORS_REFRESH_SUCCESS,
    sensors
  }
}

export function refreshSensorsFail (error) {
  return {
    type: actionTypes.SENSORS_REFRESH_FAIL,
    error
  }
}

export function changeLightSensorDetails (lightSensorDetails) {
  return {
    type: actionTypes.SENSOR_LIGHT_CHANGE_ACTION,
    lightSensorDetails
  }
}

export function changeLightSensorDetailsStart () {
  return {
    type: actionTypes.SENSOR_LIGHT_CHANGE_START
  }
}

export function changeLightSensorDetailsSuccess () {
  return {
    type: actionTypes.SENSOR_LIGHT_CHANGE_SUCCESS
  }
}

export function changeLightSensorDetailsFail (error) {
  return {
    type: actionTypes.SENSOR_LIGHT_CHANGE_FAIL,
    error
  }
}

export function changeWindowBlindsSensorDetails (windowBlindsSensorDetails) {
  return {
    type: actionTypes.SENSOR_WINDOW_BLINDS_CHANGE_ACTION,
    windowBlindsSensorDetails
  }
}

export function changeWindowBlindsSensorDetailsStart () {
  return {
    type: actionTypes.SENSOR_WINDOW_BLINDS_CHANGE_START
  }
}

export function changeWindowBlindsSensorDetailsSuccess () {
  return {
    type: actionTypes.SENSOR_WINDOW_BLINDS_CHANGE_SUCCESS
  }
}

export function changeWindowBlindsSensorDetailsFail (error) {
  return {
    type: actionTypes.SENSOR_WINDOW_BLINDS_CHANGE_FAIL,
    error
  }
}

export function changeHvacRoomsDetails (hvacRoomsDetails) {
  return {
    type: actionTypes.HVAC_ROOMS_CHANGE_ACTION,
    hvacRoomsDetails
  }
}

export function changeHvacRoomsDetailsStart () {
  return {
    type: actionTypes.HVAC_ROOMS_CHANGE_START
  }
}

export function changeHvacRoomsDetailsSuccess () {
  return {
    type: actionTypes.HVAC_ROOMS_CHANGE_SUCCESS
  }
}

export function changeHvacRoomsDetailsFail (error) {
  return {
    type: actionTypes.HVAC_ROOMS_CHANGE_FAIL,
    error
  }
}

export function validHvacFormSnackbar (valid) {
  return {
    type: actionTypes.HVAC_ROOMS_VALID_FORM,
    valid
  }
}
