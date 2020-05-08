/* globals describe, test, expect */

import reducer from '../sensor.js'
import actionTypes from '@constants/actionTypes'
import * as actions from '../../actions/sensor'

describe('sensor reducer', () => {
  const initialState = {
    sensors: [],
    loadingSensors: false,
    loadingError: null,
    sensorError: null
  }

  const testSensors = {
    temperatureSensors: [
      {
        id: 1,
        type: 'TEMPERATURE_SENSOR',
        value: 25
      }
    ],
    windowSensors: [
      {
        id: 2,
        type: 'windowSensor',
        status: 'closed'
      }
    ],
    windowBlinds: [
      {
        id: 3,
        type: 'windowBlind',
        position: 5
      }
    ],
    RFIDSensors: [
      {
        id: 4,
        type: 'RFIDSensor',
        lastTag: {
          id: 55,
          type: 'RFIDTag',
          timestamp: 11241524
        }
      }
    ],
    smokeSensors: [
      {
        id: 5,
        type: 'smokeSensor',
        isSmokeDetected: true
      }
    ]
  }

  test('should return the initial state', () => {
    expect(reducer(initialState, {})).toEqual(initialState)
  })

  test('should return the initial state when action is not handled by the reducer', () => {
    expect(reducer(initialState, actions.loadSensors())).toEqual(initialState)
  })

  test(`should handle ${actionTypes.SENSORS_FETCH_START}`, () => {
    expect(reducer(initialState, actions.fetchSensorsStart())).toEqual({
      ...initialState,
      loadingError: null,
      loadingSensors: true
    })
  })

  test(`should handle ${actionTypes.SENSORS_FETCH_SUCCESS}`, () => {
    expect(reducer(initialState, actions.fetchSensorsSuccess(testSensors))).toEqual({
      ...initialState,
      sensors: testSensors,
      loadingSensors: false,
      refreshError: null
    })
  })

  test(`should handle ${actionTypes.SENSORS_FETCH_FAIL}`, () => {
    const testError = 'Error'

    expect(reducer(initialState, actions.fetchSensorsFail(testError))).toEqual({
      ...initialState,
      loadingError: testError,
      loadingSensors: false
    })
  })

  test(`should handle ${actionTypes.SENSOR_CHANGE_STATUS_START}`, () => {
    expect(reducer(initialState, actions.changeSensorStatusStart())).toEqual({
      ...initialState,
      sensorError: null
    })
  })

  // add payload to this test, once its added in the reducer!
  test(`should handle ${actionTypes.SENSOR_CHANGE_STATUS_SUCCESS}`, () => {
    expect(reducer(initialState, actions.changeSensorStatusSuccess())).toEqual({
      ...initialState
    })
  })

  test(`should handle ${actionTypes.SENSOR_CHANGE_STATUS_FAIL}`, () => {
    const testError = 'Error'
    expect(reducer(initialState, actions.changeSensorStatusFail(testError))).toEqual({
      ...initialState,
      sensorError: testError
    })
  })

  test(`should handle ${actionTypes.SENSORS_REFRESH_START}`, () => {
    expect(reducer(initialState, actions.refreshSensorsStart())).toEqual({
      ...initialState
    })
  })

  test(`should handle ${actionTypes.SENSORS_REFRESH_SUCCESS}`, () => {
    expect(reducer(initialState, actions.refreshSensorsSuccess(testSensors))).toEqual({
      ...initialState,
      sensors: testSensors,
      refreshError: null
    })
  })

  test(`should handle ${actionTypes.SENSORS_REFRESH_FAIL}`, () => {
    const testError = 'Error'
    expect(reducer(initialState, actions.refreshSensorsFail(testError))).toEqual({
      ...initialState,
      refreshError: testError
    })
  })

  test(`should handle ${actionTypes.SENSOR_LIGHT_CHANGE_START}`, () => {
    expect(reducer(initialState, actions.changeLightSensorDetailsStart())).toEqual({
      ...initialState,
      lightDetailsError: null
    })
  })

  test(`should handle ${actionTypes.SENSOR_LIGHT_CHANGE_SUCCESS}`, () => {
    expect(reducer(initialState, actions.changeLightSensorDetailsSuccess())).toEqual({
      ...initialState
    })
  })

  test(`should handle ${actionTypes.SENSOR_LIGHT_CHANGE_FAIL}`, () => {
    const testError = 'Error'
    expect(reducer(initialState, actions.changeLightSensorDetailsFail(testError))).toEqual({
      ...initialState,
      lightDetailsError: testError
    })
  })

  test(`should handle ${actionTypes.SENSOR_WINDOW_BLINDS_CHANGE_START}`, () => {
    expect(reducer(initialState, actions.changeWindowBlindsSensorDetailsStart())).toEqual({
      ...initialState,
      windowBlindsDetailsError: null
    })
  })

  test(`should handle ${actionTypes.SENSOR_WINDOW_BLINDS_CHANGE_SUCCESS}`, () => {
    expect(reducer(initialState, actions.changeWindowBlindsSensorDetailsSuccess())).toEqual({
      ...initialState
    })
  })

  test(`should handle ${actionTypes.SENSOR_WINDOW_BLINDS_CHANGE_FAIL}`, () => {
    const testError = 'Error'
    expect(reducer(initialState, actions.changeWindowBlindsSensorDetailsFail(testError))).toEqual({
      ...initialState,
      windowBlindsDetailsError: testError
    })
  })
})
