/* globals describe, test, expect */

import reducer from '../sensor.js'
import actionTypes from '@constants/actionTypes'
import * as actions from '../../actions/sensor'

describe('sensor reducer', () => {
  const initialState = {
    sensors: [],
    HVACRooms: [],
    loadingSensors: false,
    loadingError: null,
    sensorError: null,
    refreshError: null,
    lightDetailsError: null,
    windowBlindsDetailsError: null,
    hvacRoomsDetailsError: null,
    hvacRoomsValidForm: true,
    updating: 0
  }

  const dashboardSensors = {
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
    ],
    lights: [
      {
        value: 100,
        type: 'LED_CONTROLLER',
        saturation: 100,
        hue: 0,
        id: 7
      }
    ]
  }

  const HVACRooms = [
    {
      id: 6,
      windowSensorIds: [],
      type: 'HVACRoom',
      temperatureSensorId: 61,
      coolingTemperature: 130,
      cooling: true,
      heating: false,
      heatingTemperature: 120,
      hysteresis: 10
    }
  ]

  const testSensors = {
    ...dashboardSensors,
    HVACRooms
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
      sensors: dashboardSensors,
      HVACRooms: testSensors.HVACRooms,
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

  test(`should handle ${actionTypes.SENSORS_REFRESH_START}`, () => {
    expect(reducer(initialState, actions.refreshSensorsStart())).toEqual({
      ...initialState
    })
  })

  test(`should handle ${actionTypes.SENSORS_REFRESH_SUCCESS}`, () => {
    expect(reducer(initialState, actions.refreshSensorsSuccess(testSensors))).toEqual({
      ...initialState,
      sensors: dashboardSensors,
      HVACRooms: testSensors.HVACRooms,
      loadingSensors: false,
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

  test(`should handle ${actionTypes.HVAC_ROOMS_CHANGE_START}`, () => {
    expect(reducer(initialState, actions.changeHvacRoomsDetailsStart())).toEqual({
      ...initialState,
      hvacRoomsDetailsError: null
    })
  })

  test(`should handle ${actionTypes.HVAC_ROOMS_CHANGE_SUCCESS}`, () => {
    expect(reducer(initialState, actions.changeHvacRoomsDetailsSuccess())).toEqual({
      ...initialState
    })
  })

  test(`should handle ${actionTypes.HVAC_ROOMS_CHANGE_FAIL}`, () => {
    const testError = 'Error'
    expect(reducer(initialState, actions.changeHvacRoomsDetailsFail(testError))).toEqual({
      ...initialState,
      hvacRoomsDetailsError: testError
    })
  })

  test(`should handle ${actionTypes.HVAC_ROOMS_VALID_FORM}`, () => {
    const testValid = false
    expect(reducer(initialState, actions.validHvacFormSnackbar(testValid))).toEqual({
      ...initialState,
      hvacRoomsValidForm: testValid
    })
  })
})
