import { put, call, select, delay } from 'redux-saga/effects'
import { fetchNotifications, checkNotifications } from '@data/api/notification'
import {
  fetchNotificationsSuccess,
  fetchNotificationsError,
  updateNotificationsSuccess,
  updateNotificationsFail,
  checkNotificationsSuccess,
  updateNotificationsContinue,
  checkNotificationsStart,
  checkNotificationsFail
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
  while (true) {
    yield delay(5000)
    const store = yield select()
    const notificationsBefore = store.notification.notifications
    try {
      const result = yield call(fetchNotifications)
      const newNotifications = result.filter(item => !notificationsBefore.some(notification => notification.id === item.id))
      const updatedNotifications = newNotifications.concat(notificationsBefore).sort((a, b) => b.timestamp - a.timestamp)
      const store = yield select()
      const notificationsAfter = store.notification.notifications
      const isStoreChanged = notificationsBefore.some((notification, i) => notification.isChecked !== notificationsAfter[i].isChecked)
      if (!isStoreChanged) {
        yield put(updateNotificationsSuccess(updatedNotifications))
      } else { yield put(updateNotificationsContinue()) }
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
    console.log('index')
    console.log(notifications.indexOf(checked))
    notifications[notifications.indexOf(checked)].isChecked = true
    yield put(checkNotificationsSuccess(notifications))
  } catch (error) {
    yield put(checkNotificationsFail(notifications, error))
  }
}
