import { put, call, select, delay } from 'redux-saga/effects'
import { fetchNotifications, updateNotifications } from '@data/api/notification'
import {
  fetchNotificationsSuccess,
  fetchNotificationsError,
  updateNotificationsSuccess,
  updateNotificationsFail,
  checkNotificationSuccess
} from '@data/actions/notification'

export function * fetchNotificationsSaga () {
  try {
    const result = yield call(fetchNotifications)
    const sortedNotifications = result.sort((a, b) => b.timestamp - a.timestamp)
    yield put(fetchNotificationsSuccess(sortedNotifications))
  } catch (error) {
    yield put(fetchNotificationsError(error))
  }
}

export function * updateNotificationsSaga () {
  yield delay(5000)
  while (true) {
    yield delay(5000)
    const store = yield select()
    const { notifications } = store.notification
    try {
      const result = yield call(updateNotifications)
      const newNotifications = result.filter(item => !notifications.some(notification => notification.id === item.id))
      const updatedNotifications = newNotifications.concat(notifications).sort((a, b) => b.timestamp - a.timestamp)
      yield put(updateNotificationsSuccess(updatedNotifications))
    } catch (error) {
      yield put(updateNotificationsFail(error))
    }
  }
}

export function * checkNotificationsSaga (action) {
  const store = yield select()
  const { notifications } = store.notification
  const checked = notifications.map(notification =>
    notification.id === action.id ? ({ ...notification, isChecked: true }) : notification
  )
  yield put(checkNotificationSuccess(checked))
}
