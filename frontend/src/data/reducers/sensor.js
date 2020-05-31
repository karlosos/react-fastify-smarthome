import actionTypes from '@constants/actionTypes'

const initialState = {
  sensors: [],
  HVACRooms: [],
  loadingSensors: true,
  loadingError: null,
  sensorError: null,
  refreshError: null,
  lightDetailsError: null,
  windowBlindsDetailsError: null,
  hvacRoomsDetailsError: null,
  hvacRoomsValidForm: true,
  updating: 0
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
    HVACRooms: action.sensors.HVACRooms,
    loadingSensors: false,
    refreshError: null
  }
}

const updateSensorsStart = (state, action) => {
  return {
    ...state
  }
}
const updateSensorsSuccess = (state, action) => {
  return {
    ...state,
    sensors: action.sensors,
    updating: state.updating + 1
  }
}
const updateSensorsFail = (state, action) => {
  return {
    ...state
  }
}

const fetchSensorsFail = (state, action) => {
  return {
    ...state,
    loadingError: action.error,
    loadingSensors: false
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
    HVACRooms: action.sensors.HVACRooms,
    refreshError: null,
    updating: 0
  }
}

const refreshSensorsFail = (state, action) => {
  return {
    ...state,
    refreshError: action.error,
    updating: 0
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
    windowBlindsDetailsError: null
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

const changeHvacRoomsDetailsStart = (state, action) => {
  return {
    ...state,
    hvacRoomsDetailsError: null
  }
}

const changeHvacRoomsDetailsSuccess = (state, action) => {
  return {
    ...state
  }
}

const changeHvacRoomsDetailsFail = (state, action) => {
  return {
    ...state,
    hvacRoomsDetailsError: action.error
  }
}

const validHvacFormSnackbar = (state, action) => {
  return {
    ...state,
    hvacRoomsValidForm: action.valid
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

    case actionTypes.SENSORS_UPDATE_START:
      return updateSensorsStart(state, action)
    case actionTypes.SENSORS_UPDATE_SUCCESS:
      return updateSensorsSuccess(state, action)
    case actionTypes.SENSORS_UPDATE_FAIL:
      return updateSensorsFail(state, action)

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
    case actionTypes.SENSOR_WINDOW_BLINDS_CHANGE_FAIL:
      return changeWindowBlindsSensorDetailsFail(state, action)

    case actionTypes.HVAC_ROOMS_CHANGE_START:
      return changeHvacRoomsDetailsStart(state, action)
    case actionTypes.HVAC_ROOMS_CHANGE_SUCCESS:
      return changeHvacRoomsDetailsSuccess(state, action)
    case actionTypes.HVAC_ROOMS_CHANGE_FAIL:
      return changeHvacRoomsDetailsFail(state, action)
    case actionTypes.HVAC_ROOMS_VALID_FORM:
      return validHvacFormSnackbar(state, action)

    default:
      return state
  }
}
