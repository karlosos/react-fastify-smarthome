import axios from 'axios'
import { delay } from 'redux-saga/effects'

export function * getSensors () {
  const res = yield axios.get('/api/v1/dashboard')

  return res.data
}

export function * changeSensorStatus (sensorId) {
  // const res = yield axios.put(`/on-off/endpoint/${sensorId}`)
  // return res.data

  yield delay(1000) // mock async, should be removed once real async requests are made
  return 'mock response'
}
