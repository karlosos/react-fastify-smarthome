import actionTypes from '@constants/actionTypes'

const initialState = {
  sensors: [],
  loadingSensors: true,
  loadingError: null,
  sensorError: null,
  refreshError: null
}

const fetchSensorsStart = (state, action) => {
  return {
    ...state,
    loadingError: null,
    loadingSensors: true
  }
}

const fetchSensorsSuccess = (state, action) => {
  delete action.sensors.HVACStatus
  delete action.sensors.HVACRooms
  delete action.sensors.lights

  return {
    ...state,
    sensors: action.sensors,
    loadingSensors: false
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
  return {
    ...state
  }
}

const refreshSensorsSuccess = (state, action) => {
  delete action.sensors.HVACStatus // not sure what to do with these
  delete action.sensors.HVACRooms // not sure what to do with these
  delete action.sensors.lights // not sure what to do with these

  // for (const type in action.sensors) { // adding random id to the sensors. not needed hence its commented out for now.
  //   action.sensors[type].forEach((sensor) => {
  //     if (sensor.id === null) {
  //       sensor.id = Math.floor(Math.random() * (100))
  //     }
  //   })
  // }

  return {
    ...state,
    sensors: action.sensors,
    refreshError: null
  }
}

const refreshSensorsFail = (state, action) => {
  console.log('refreshSensorsFail')
  return {
    ...state,
    refreshError: action.error
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
    default:
      return state
  }
}
