import axios from 'axios'
import { delay } from 'redux-saga/effects'
import mockSensors from './mockSensors'

export function * getSensors () {
  // const res = yield axios.get('/api/v1/sensors')
  // return res.data

  yield delay(1000) // mock async, should be removed once real async requests are made

  return mockSensors
}

export function * changeSensorStatus (sensorId) {
  // const res = yield axios.put(`/on-off/endpoint/${sensorId}`)
  // return res.data

  yield delay(1000) // mock async, should be removed once real async requests are made
  console.log('mock response')
  return 'mock response'
}
