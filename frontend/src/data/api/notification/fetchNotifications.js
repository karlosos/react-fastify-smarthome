import axios from 'axios'
import mockNotifications from './mockNotifications'
import { delay } from 'redux-saga/effects'

const updated = [...mockNotifications, {
  id: 6,
  timestamp: 1666666666,
  type: 'alert',
  sensorId: 6
}, {
  id: 7,
  timestamp: 1777777777,
  type: 'alert',
  sensorId: 6
}]

export function * fetchNotifications () {
  // const result = yield axios.get('/api/v1/notifications') // TODO: use it if endpoint is ready; return an array
  // return res.data
  yield delay(2000)
  return mockNotifications
}

// TODO: created only for the purpose of presenting feature functionality;
// when the gateway is ready, change in the function watchNotifications in frontend\src\data\sagas\notification\index.js from updateNotificationsSaga to fetchNotificationsSaga
export function * updateNotifications () {
  // const result = yield axios.get('/api/v1/notifications')
  yield delay(2000)
  return updated
}
