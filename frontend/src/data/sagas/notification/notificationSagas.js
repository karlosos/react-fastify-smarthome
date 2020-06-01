import { put, call, select, delay } from 'redux-saga/effects'
import { fetchNotifications, checkNotifications } from '@data/api/notification'
import {
  fetchNotificationsSuccess,
  fetchNotificationsError,
  updateNotificationsSuccess,
  updateNotificationsFail,
  checkNotificationsSuccess,
  checkNotificationsStart,
  checkNotificationsFail
} from '@data/actions/notification'

const sortNotifications = notifications => notifications.sort((a, b) => b.timestamp - a.timestamp)

export function * fetchNotificationsSaga () {
  try {
    const result = yield call(fetchNotifications)
    yield put(fetchNotificationsSuccess(sortNotifications(result)))
  } catch (error) {
    yield put(fetchNotificationsError(error))
  }
}

export function * updateNotificationsSaga () {
  while (true) {
    yield delay(5000)
    try {
      const result = yield call(fetchNotifications)
      const { checking } = (yield select()).notification
      !checking && (yield put(updateNotificationsSuccess(sortNotifications(result))))
    } catch (error) {
      yield put(updateNotificationsFail(error))
    }
  }
}

export function * checkNotificationsSaga (action) {
  const store = yield select()
  const { notifications } = store.notification
  const checked = notifications.filter(n => n.id === action.id)[0]
  yield put(checkNotificationsStart(checked))
  try {
    yield call(checkNotifications, checked)
    notifications[notifications.indexOf(checked)].isChecked = true
    yield put(checkNotificationsSuccess(notifications))
  } catch (error) {
    yield put(checkNotificationsFail(notifications, error))
  }
}
