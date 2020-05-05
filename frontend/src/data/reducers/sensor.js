import actionTypes from '@constants/actionTypes'

const initialState = {
  sensors: [],
  loadingSensors: true,
  loadingError: null,
  sensorError: null,
  refreshError: null,
  lightDetailsError: null,
  windowBlindsDetailsError: null
}

const fetchSensorsStart = (state, action) => {
  return {
    ...state,
    loadingError: null,
    loadingSensors: true
  }
}

const fetchSensorsSuccess = (state, action) => {
  const sensors = {
    temperatureSensors: action.sensors.temperatureSensors,
    windowSensors: action.sensors.windowSensors,
    windowBlinds: action.sensors.windowBlinds,
    RFIDSensors: action.sensors.RFIDSensors,
    smokeSensors: action.sensors.smokeSensors,
    lights: action.sensors.lights
  }

  return {
    ...state,
    sensors,
    loadingSensors: false,
    refreshError: null
  }
}

const updateSensors = (state, action) => {
  return {
    ...state,
    sensors: action.sensors
  }
}

const fetchSensorsFail = (state, action) => {
  return {
    ...state,
    loadingError: action.error,
    loadingSensors: false
  }
}

const changeSensorStatusStart = (state, action) => {
  return {
    ...state,
    sensorError: null
  }
}

const changeSensorStatusSuccess = (state, action) => {
  return {
    ...state
  }
}

const changeSensorStatusFail = (state, action) => {
  return {
    ...state,
    sensorError: action.error
  }
}

const refreshSensorsStart = (state, action) => {
  return { ...state }
}

const refreshSensorsSuccess = (state, action) => {
  const sensors = {
    temperatureSensors: action.sensors.temperatureSensors,
    windowSensors: action.sensors.windowSensors,
    windowBlinds: action.sensors.windowBlinds,
    RFIDSensors: action.sensors.RFIDSensors,
    smokeSensors: action.sensors.smokeSensors,
    lights: action.sensors.lights
  }

  return {
    ...state,
    sensors,
    refreshError: null
  }
}

const refreshSensorsFail = (state, action) => {
  return {
    ...state,
    refreshError: action.error
  }
}

const changeLightSensorDetailsStart = (state, action) => {
  return {
    ...state,
    lightDetailsError: null
  }
}

const changeLightSensorDetailsSuccess = (state, action) => {
  return {
    ...state
  }
}

const changeLightSensorDetailsFail = (state, action) => {
  return {
    ...state,
    lightDetailsError: action.error
  }
}

const changeWindowBlindsSensorDetailsStart = (state, action) => {
  return {
    ...state,
    lightDetailsError: null
  }
}

const changeWindowBlindsSensorDetailsSuccess = (state, action) => {
  return {
    ...state
  }
}

const changeWindowBlindsSensorDetailsFail = (state, action) => {
  return {
    ...state,
    windowBlindsDetailsError: action.error
  }
}

export default function sensor (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SENSORS_FETCH_START:
      return fetchSensorsStart(state, action)
    case actionTypes.SENSORS_FETCH_SUCCESS:
      return fetchSensorsSuccess(state, action)
    case actionTypes.SENSORS_FETCH_FAIL:
      return fetchSensorsFail(state, action)

    case actionTypes.SENSOR_CHANGE_STATUS_START:
      return changeSensorStatusStart(state, action)
    case actionTypes.SENSOR_CHANGE_STATUS_SUCCESS:
      return changeSensorStatusSuccess(state, action)
    case actionTypes.SENSOR_CHANGE_STATUS_FAIL:
      return changeSensorStatusFail(state, action)

    case actionTypes.SENSORS_UPDATE_ACTION:
      return updateSensors(state, action)

    case actionTypes.SENSORS_REFRESH_START:
      return refreshSensorsStart(state, action)
    case actionTypes.SENSORS_REFRESH_SUCCESS:
      return refreshSensorsSuccess(state, action)
    case actionTypes.SENSORS_REFRESH_FAIL:
      return refreshSensorsFail(state, action)

    case actionTypes.SENSOR_LIGHT_CHANGE_START:
      return changeLightSensorDetailsStart(state, action)
    case actionTypes.SENSOR_LIGHT_CHANGE_SUCCESS:
      return changeLightSensorDetailsSuccess(state, action)
    case actionTypes.SENSOR_LIGHT_CHANGE_FAIL:
      return changeLightSensorDetailsFail(state, action)

    case actionTypes.SENSOR_WINDOW_BLINDS_CHANGE_START:
      return changeWindowBlindsSensorDetailsStart(state, action)
    case actionTypes.SENSOR_WINDOW_BLINDS_CHANGE_SUCCESS:
      return changeWindowBlindsSensorDetailsSuccess(state, action)
    case actionTypes.SENSOR_WINDOW_BLINDS_CHANGE_FAILS:
      return changeWindowBlindsSensorDetailsFail(state, action)

    default:
      return state
  }
}
