import { takeLatest } from 'redux-saga/effects'
import actionTypes from '@constants/actionTypes'
import {
  fetchNotificationsSaga, checkNotificationsSaga
} from './notificationSagas'

export function * watchNotifications () {
  yield takeLatest(actionTypes.NOTIFICATIONS_FETCH_REQUEST, fetchNotificationsSaga)
  yield takeLatest(actionTypes.NOTIFICATIONS_UPDATE, fetchNotificationsSaga)
  yield takeLatest(actionTypes.NOTIFICATIONS_CHECK, checkNotificationsSaga)
}
