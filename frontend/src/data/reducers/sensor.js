import actionTypes from '@constants/actionTypes'

const initialState = {
  sensors: [],
  loadingSensors: false,
  loadingError: null,
  sensorError: null
}

const fetchSensorsStart = (state, action) => {
  return {
    ...state,
    loadingError: null,
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
    default:
      return state
  }
}
