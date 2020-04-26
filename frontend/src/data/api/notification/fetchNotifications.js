import axios from 'axios'
import mockNotifications from './mockNotifications'
import { delay } from 'redux-saga/effects'

// TODO: Remove; created only for the purpose of presenting feature functionality;
let i = 0
const multiply = []
for (i; i < 26; i++) {
  multiply.push({
    id: i,
    timestamp: i * 19113 + 1600000000,
    type: 'alert',
    sensorId: i
  })
}

// TODO: Remove; created only for the purpose of presenting feature functionality;
const updated = [...multiply, {
  id: 1200,
  timestamp: 1666666666,
  type: 'alert',
  sensorId: 6
}, {
  id: 1300,
  timestamp: 1777777777,
  type: 'alert',
  sensorId: 6
}]

export function * fetchNotifications () {
  // const result = yield axios.get('/api/v1/notifications') // TODO: use it if endpoint is ready; return an array
  // return res.data
  yield delay(2000)
  return multiply
}

// TODO: created only for the purpose of presenting feature functionality;
// when the gateway is ready, change in the function watchNotifications in frontend\src\data\sagas\notification\index.js from updateNotificationsSaga to fetchNotificationsSaga
export function * updateNotifications () {
  // const result = yield axios.get('/api/v1/notifications')
  yield delay(2000)
  return updated
}
