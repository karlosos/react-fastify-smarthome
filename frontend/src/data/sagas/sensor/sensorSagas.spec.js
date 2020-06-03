/* globals describe, test, expect */

import { takeLatest, put, call, delay, select } from 'redux-saga/effects'
import { watchSensors } from './index'
import {
  loadSensorsSaga,
  refreshSensorsSaga,
  changeLightSensorDetailsSaga,
  changeWindowBlindsSensorDetailsSaga,
  updateSensorsSaga,
  changeHvacRoomsDetailsSaga
} from './sensorSagas'
import sagaHelper from 'redux-saga-testing'

import {
  getSensors,
  refreshSensors,
  changeLightDetails,
  changeWindowBlindsDetails,
  changeHvacRoomsDetails
} from '../../api/sensor'

import actionTypes from '@constants/actionTypes'
import * as actions from '../../actions/sensor'

describe('sensors watcher', () => {
  test('should yield two takeLatest effect creators and be done', () => {
    const gen = watchSensors()

    expect(gen.next().value)
      .toEqual(takeLatest(actionTypes.SENSORS_LOAD_ACTION, loadSensorsSaga))

    expect(gen.next().value)
      .toEqual(takeLatest(actionTypes.SENSORS_REFRESH_ACTION, refreshSensorsSaga))

    expect(gen.next().value)
      .toEqual(takeLatest(actionTypes.SENSOR_LIGHT_CHANGE_ACTION, changeLightSensorDetailsSaga))

    expect(gen.next().value)
      .toEqual(takeLatest(actionTypes.SENSOR_WINDOW_BLINDS_CHANGE_ACTION, changeWindowBlindsSensorDetailsSaga))

    expect(gen.next().value)
      .toEqual(takeLatest(actionTypes.HVAC_ROOMS_CHANGE_ACTION, changeHvacRoomsDetailsSaga))

    expect(gen.next().value)
      .toEqual(takeLatest(actionTypes.SENSORS_UPDATE_ACTION, updateSensorsSaga))

    expect(gen.next().done)
      .toEqual(true)
  })
})

describe('loadSensorsSaga', () => {
  describe('should load sensors successfuly', () => {
    const it = sagaHelper(loadSensorsSaga())

    const testSensors = {
      temperatureSensors: [
        {
          id: 52,
          type: 'testsens421',
          isOn: true
        },
        {
          id: 36,
          type: 'testsens352',
          isOn: true
        }
      ],
      HVACRooms: []
    }

    it('should put fetchSensorsStart action', result => {
      expect(result).toEqual(put(actions.fetchSensorsStart()))
    })

    it('should make a successful request to API', result => {
      expect(result).toEqual(call(getSensors))

      return testSensors
    })

    it('should put fetchSensorsSuccess action', result => {
      expect(result).toEqual(put(actions.fetchSensorsSuccess(testSensors)))
    })

    it('should be done', result => {
      expect(result).toBeUndefined()
    })
  })

  describe('should throw an exception on unsuccessful sensors load', () => {
    const it = sagaHelper(loadSensorsSaga())

    it('should put fetchSensorsStart action', result => {
      expect(result).toEqual(put(actions.fetchSensorsStart()))
    })

    it('should make an unsuccessful request to API', result => {
      expect(result).toEqual(call(getSensors))

      return new Error('test error')
    })

    it('should put fetchSensorsFail action', result => {
      expect(result).toEqual(put(actions.fetchSensorsFail(new Error('test error'))))
    })

    it('should be done', result => {
      expect(result).toBeUndefined()
    })
  })
})

describe('refreshSensorsSaga', () => {
  describe('should refresh sensors successfuly', () => {
    const it = sagaHelper(refreshSensorsSaga())
    const testSensors = {
      temperatureSensors: [
        {
          id: 52,
          type: 'testsens421',
          isOn: true
        },
        {
          id: 36,
          type: 'testsens352',
          isOn: true
        }
      ],
      HVACRooms: []
    }

    const fakeStore = {
      sensor: {
        updating: 0
      }
    }

    it('should put refreshSensorsStart action', result => {
      expect(result).toEqual(put(actions.refreshSensorsStart()))
    })

    it('should call delay', result =>
      expect(result).toEqual(delay(5000)))

    it('should make a successful request to API', result => {
      expect(result).toEqual(call(refreshSensors))

      return testSensors
    })

    it('should select store', result => {
      expect(result).toEqual(select())
      return fakeStore
    })

    it('should put refreshSensorsSuccess action', result => {
      expect(result).toEqual(put(actions.refreshSensorsSuccess(testSensors)))
    })

    it('should call delay', result =>
      expect(result).toEqual(delay(5000)))

    it('should not be done', result => {
      expect(result).toBeDefined()
    })
  })

  describe('should skip ongoing refresh action and start again', () => {
    const it = sagaHelper(refreshSensorsSaga())
    const testSensors = {
      temperatureSensors: [],
      HVACRooms: []
    }

    const fakeStore = {
      sensor: {
        updating: 1
      }
    }

    it('should put refreshSensorsStart action', result => {
      expect(result).toEqual(put(actions.refreshSensorsStart()))
    })

    it('should call delay', result =>
      expect(result).toEqual(delay(5000)))

    it('should make a successful request to API', result => {
      expect(result).toEqual(call(refreshSensors))

      return testSensors
    })

    it('should select store', result => {
      expect(result).toEqual(select())
      return fakeStore
    })

    it('should call delay', result =>
      expect(result).toEqual(delay(5000)))

    it('should make a successful request to API', result => {
      expect(result).toEqual(call(refreshSensors))

      return testSensors
    })

    it('should not be done', result => {
      expect(result).toBeDefined()
    })
  })

  describe('should throw an exception on unsuccessful sensors load', () => {
    const it = sagaHelper(refreshSensorsSaga())

    it('should put fetchSensorsStart action', result => {
      expect(result).toEqual(put(actions.refreshSensorsStart()))
    })

    it('should call delay', result =>
      expect(result).toEqual(delay(5000)))

    it('should make an unsuccessful request to API', result => {
      expect(result).toEqual(call(refreshSensors))

      return new Error('test error')
    })

    it('should put refreshSensorsFail action', result => {
      expect(result).toEqual(put(actions.refreshSensorsFail(new Error('test error'))))
    })

    it('should call delay', result =>
      expect(result).toEqual(delay(5000)))

    it('should not be done', result => {
      expect(result).toBeDefined()
    })
  })
})

describe('changeLightSensorDetailsSaga', () => {
  describe('should change light sensor\'s details successfuly', () => {
    const action = {
      lightSensorDetails: {
        id: 5,
        type: 'RGBLight',
        hue: 5,
        saturation: 5,
        value: 5
      }
    }

    const it = sagaHelper(changeLightSensorDetailsSaga(action))

    it('should put changeLightSensorDetailsStart action', result => {
      expect(result).toEqual(put(actions.changeLightSensorDetailsStart()))
    })

    it('should make a successful request to API', result => {
      expect(result).toEqual(call(changeLightDetails, action.lightSensorDetails))
    })

    it('should put changeLightSensorDetailsSuccess action', result => {
      expect(result).toEqual(put(actions.changeLightSensorDetailsSuccess()))
    })

    it('should be done', result => {
      expect(result).toBeUndefined()
    })
  })

  describe('should throw an exception on unsuccessful light sensor\'s detail change', () => {
    const action = {
      lightSensorDetails: {
        id: 5,
        type: 'RGBLight',
        hue: 5,
        saturation: 5,
        value: 5
      }
    }

    const it = sagaHelper(changeLightSensorDetailsSaga(action))

    it('should put changeLightSensorDetailsStart action', result => {
      expect(result).toEqual(put(actions.changeLightSensorDetailsStart()))
    })

    it('should make an unsuccessful request to API', result => {
      expect(result).toEqual(call(changeLightDetails, action.lightSensorDetails))

      return new Error('test error')
    })

    it('should put changeLightSensorDetailsFail action', result => {
      expect(result).toEqual(put(actions.changeLightSensorDetailsFail(new Error('test error'))))
    })

    it('should be done', result => {
      expect(result).toBeUndefined()
    })
  })
})

describe('changeWindowBlindsSensorDetailsSaga', () => {
  describe('should change window blinds sensor\'s details successfuly', () => {
    const action = {
      windowBlindsSensorDetails: {
        id: 5,
        type: 'windowBlind',
        position: 50
      }
    }

    const it = sagaHelper(changeWindowBlindsSensorDetailsSaga(action))

    it('should put changeWindowBlindsSensorDetailsStart action', result => {
      expect(result).toEqual(put(actions.changeWindowBlindsSensorDetailsStart()))
    })

    it('should make a successful request to API', result => {
      expect(result).toEqual(call(changeWindowBlindsDetails, action.windowBlindsSensorDetails))
    })

    it('should put changeWindowBlindsSensorDetailsSuccess action', result => {
      expect(result).toEqual(put(actions.changeWindowBlindsSensorDetailsSuccess()))
    })

    it('should be done', result => {
      expect(result).toBeUndefined()
    })
  })

  describe('should throw an exception on unsuccessful window blinds sensor\'s detail change', () => {
    const action = {
      windowBlindsSensorDetails: {
        id: 5,
        type: 'windowBlind',
        position: 5
      }
    }

    const it = sagaHelper(changeWindowBlindsSensorDetailsSaga(action))

    it('should put changeWindowBlindsSensorDetailsStart action', result => {
      expect(result).toEqual(put(actions.changeWindowBlindsSensorDetailsStart()))
    })

    it('should make an unsuccessful request to API', result => {
      expect(result).toEqual(call(changeWindowBlindsDetails, action.windowBlindsSensorDetails))

      return new Error('test error')
    })

    it('should put changeWindowBlindsSensorDetailsFail action', result => {
      expect(result).toEqual(put(actions.changeWindowBlindsSensorDetailsFail(new Error('test error'))))
    })

    it('should be done', result => {
      expect(result).toBeUndefined()
    })
  })
})

describe('changeHvacRoomsDetailsSaga', () => {
  describe('should change hvac room details successfuly', () => {
    const action = {
      hvacRoomsDetails: {
        id: 1,
        heatingTemperature: 15,
        coolingTemperature: 30,
        hysteresis: 20,
        temperatureSensorId: 2,
        windowSensorIds: [3, 4],
        type: 'HVACRoom'
      }
    }

    const expected = {
      ...action.hvacRoomsDetails,
      heatingTemperature: 150,
      coolingTemperature: 300,
      hysteresis: 200
    }

    const it = sagaHelper(changeHvacRoomsDetailsSaga(action))

    it('should put changeHvacRoomsDetailsSaga action', result => {
      expect(result).toEqual(put(actions.changeHvacRoomsDetailsStart()))
    })

    it('should make a successful request to API', result => {
      expect(result).toEqual(call(changeHvacRoomsDetails, expected))
    })

    it('should put changeHvacRoomsDetailsSuccess action', result => {
      expect(result).toEqual(put(actions.changeHvacRoomsDetailsSuccess()))
    })

    it('should be done', result => {
      expect(result).toBeUndefined()
    })
  })

  describe('should throw an exception on unsuccessful hvac room detail change', () => {
    const action = {
      hvacRoomsDetails: {
        id: 1,
        name: 'Rule',
        heatingTemperature: 15,
        coolingTemperature: 30,
        hysteresis: 20,
        temperatureSensorId: 2,
        windowSensorIds: [3, 4],
        type: 'HVACRoom'
      }
    }

    const expected = {
      ...action.hvacRoomsDetails,
      heatingTemperature: 150,
      coolingTemperature: 300,
      hysteresis: 200
    }

    const it = sagaHelper(changeHvacRoomsDetailsSaga(action))

    it('should put changeHvacRoomsDetailsStart action', result => {
      expect(result).toEqual(put(actions.changeHvacRoomsDetailsStart()))
    })

    it('should make an unsuccessful request to API', result => {
      expect(result).toEqual(call(changeHvacRoomsDetails, expected))

      return new Error('test error')
    })

    it('should put changeHvacRoomsDetailsFail action', result => {
      expect(result).toEqual(put(actions.changeHvacRoomsDetailsFail(new Error('test error'))))
    })

    it('should be done', result => {
      expect(result).toBeUndefined()
    })
  })
})

describe('updateSensorsSaga', () => {
  describe('should update sensor successfuly', () => {
    const action = {
      sensors: {
        temperatureSensors: [
          {
            id: 52,
            type: 'testsens421',
            isOn: true
          }
        ]
      }
    }

    const it = sagaHelper(updateSensorsSaga(action))

    it('should put updateSensorsStart action', result => {
      expect(result).toEqual(put(actions.updateSensorsStart()))
    })

    it('should put updateSensorsSuccess action', result => {
      expect(result).toEqual(put(actions.updateSensorsSuccess(action.sensors)))
    })

    it('should be done', result => {
      expect(result).toBeUndefined()
    })
  })
})
