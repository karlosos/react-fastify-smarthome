import actionTypes from '@constants/actionTypes'

const initialState = {
  sensors: [],
  map: null,
  loadingSensors: false,
  loadingMap: false,
  error: null,
  sensorError: null
}

const fetchSensorsStart = (state, action) => {
  return {
    ...state,
    loadingSensors: true
  }
}

const fetchSensorsSuccess = (state, action) => {
  return {
    ...state,
    sensors: action.sensors,
    loadingSensors: false
  }
}

const fetchSensorsFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loadingSensors: false
  }
}

const fetchMapStart = (state, action) => {
  return {
    ...state,
    loadingMap: true
  }
}

const fetchMapSuccess = (state, action) => {
  return {
    ...state,
    map: action.map,
    loadingMap: false
  }
}

const fetchMapFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loadingMap: false
  }
}

const changeSensorStatusStart = (state, action) => {
  return {
    ...state
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

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.DASHBOARD_FETCH_SENSORS_START:
      return fetchSensorsStart(state, action)
    case actionTypes.DASHBOARD_FETCH_SENSORS_SUCCESS:
      return fetchSensorsSuccess(state, action)
    case actionTypes.DASHBOARD_FETCH_SENSORS_FAIL:
      return fetchSensorsFail(state, action)
    case actionTypes.DASHBOARD_FETCH_MAP_START:
      return fetchMapStart(state, action)
    case actionTypes.DASHBOARD_FETCH_MAP_SUCCESS:
      return fetchMapSuccess(state, action)
    case actionTypes.DASHBOARD_FETCH_MAP_FAIL:
      return fetchMapFail(state, action)
    case actionTypes.DASHBOARD_SENSOR_CHANGE_STATUS_START:
      return changeSensorStatusStart(state, action)
    case actionTypes.DASHBOARD_SENSOR_CHANGE_STATUS_SUCCESS:
      return changeSensorStatusSuccess(state, action)
    case actionTypes.DASHBOARD_SENSOR_CHANGE_STATUS_FAIL:
      return changeSensorStatusFail(state, action)
    default:
      return state
  }
}
