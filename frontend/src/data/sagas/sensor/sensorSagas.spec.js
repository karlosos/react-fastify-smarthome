/* globals describe, test, expect */

import { takeLatest, put, call } from 'redux-saga/effects'
import { watchSensors } from './index'
import { loadSensorsSaga, changeSensorStatusSaga, refreshSensorsSaga } from './sensorSagas'
import sagaHelper from 'redux-saga-testing'

import { getSensors, changeSensorStatus } from '../../api/sensor'

import actionTypes from '@constants/actionTypes'
import * as actions from '../../actions/sensor'

describe('sensors watcher', () => {
  test('should yield two takeLatest effect creators and be done', () => {
    const gen = watchSensors()

    expect(gen.next().value)
      .toEqual(takeLatest(actionTypes.SENSORS_LOAD_ACTION, loadSensorsSaga))

    expect(gen.next().value)
      .toEqual(takeLatest(actionTypes.SENSOR_CHANGE_STATUS_ACTION, changeSensorStatusSaga))

    expect(gen.next().value)
      .toEqual(takeLatest(actionTypes.SENSORS_REFRESH_ACTION, refreshSensorsSaga))

    expect(gen.next().done)
      .toEqual(true)
  })
})

describe('loadSensorsSaga', () => {
  describe('should load sensors successfuly', () => {
    const it = sagaHelper(loadSensorsSaga())

    const testSensors = [{
      id: 52,
      type: 'testsens421',
      isOn: true
    },
    {
      id: 36,
      type: 'testsens352',
      isOn: true
    }]

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

describe('changeSensorStatusSaga', () => {
  const action = {
    sensorId: 71
  }

  describe('should change sensor\'s status successfuly', () => {
    const it = sagaHelper(changeSensorStatusSaga(action))

    it('should put changeSensorStatusStart action', result => {
      expect(result).toEqual(put(actions.changeSensorStatusStart()))
    })

    it('should make a successful request to API', result => {
      expect(result).toEqual(call(changeSensorStatus, action.sensorId))

      return 'OK'
    })

    it('should put changeSensorStatusSuccess action', result => {
      expect(result).toEqual(put(actions.changeSensorStatusSuccess('OK')))
    })

    it('should be done', result => {
      expect(result).toBeUndefined()
    })
  })

  describe('should throw an exception on unsuccessful sensor\'s status change', () => {
    const it = sagaHelper(changeSensorStatusSaga(action))

    it('should put changeSensorStatusStart action', result => {
      expect(result).toEqual(put(actions.changeSensorStatusStart()))
    })

    it('should make an unsuccessful request to API', result => {
      expect(result).toEqual(call(changeSensorStatus, action.sensorId))

      return new Error('test error')
    })

    it('should put fetchSensorsFail action', result => {
      expect(result).toEqual(put(actions.changeSensorStatusFail(new Error('test error'))))
    })

    it('should be done', result => {
      expect(result).toBeUndefined()
    })
  })
})

describe('refreshSensorsSaga', () => {
  describe('should refresh sensors successfuly', () => {
    const it = sagaHelper(refreshSensorsSaga())
    const testSensors = [{
      id: 52,
      type: 'testsens421',
      isOn: true
    },
    {
      id: 36,
      type: 'testsens352',
      isOn: true
    }]

    it('should put refreshSensorsStart action', result => {
      expect(result).toEqual(put(actions.refreshSensorsStart()))
    })

    it('should make a successful request to API', result => {
      expect(result).toEqual(call(getSensors))

      return testSensors
    })

    it('should put refreshSensorsSuccess action', result => {
      expect(result).toEqual(put(actions.refreshSensorsSuccess(testSensors)))
    })

    it('should be done', result => {
      expect(result).toBeUndefined()
    })
  })

  describe('should throw an exception on unsuccessful sensors load', () => {
    const it = sagaHelper(refreshSensorsSaga())

    it('should put fetchSensorsStart action', result => {
      expect(result).toEqual(put(actions.refreshSensorsStart()))
    })

    it('should make an unsuccessful request to API', result => {
      expect(result).toEqual(call(getSensors))

      return new Error('test error')
    })

    it('should put refreshSensorsFail action', result => {
      expect(result).toEqual(put(actions.refreshSensorsFail(new Error('test error'))))
    })

    it('should be done', result => {
      expect(result).toBeUndefined()
    })
  })
})
