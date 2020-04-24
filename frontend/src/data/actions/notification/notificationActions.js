import actionTypes from '../../../common/constants/actionTypes'

export const fetchNotificationsRequest = () => ({
  type: actionTypes.NOTIFICATIONS_FETCH_REQUEST
})

export const fetchNotificationsSuccess = notifications => ({
  type: actionTypes.NOTIFICATIONS_FETCH_SUCCESS,
  notifications
})

export const fetchNotificationsError = error => ({
  type: actionTypes.NOTIFICATIONS_FETCH_FAIL,
  error
})

export const openNotificationDrawer = () => ({
  type: actionTypes.NOTIFICATION_DRAWER_OPEN
})

export const closeNotificationDrawer = () => ({
  type: actionTypes.NOTIFICATION_DRAWER_CLOSE
})

export const checkNotification = id => ({
  type: actionTypes.NOTIFICATIONS_CHECK,
  id
})

export const checkNotificationSuccess = notifications => ({
  type: actionTypes.NOTIFICATIONS_CHECK_SUCCESS,
  notifications
})

export const updateNotifications = () => ({
  type: actionTypes.NOTIFICATIONS_UPDATE
})

export const updateNotificationsSuccess = notifications => ({
  type: actionTypes.NOTIFICATIONS_UPDATE_SUCCESS,
  notifications
})

export const updateNotificationsFail = error => ({
  type: actionTypes.NOTIFICATIONS_UPDATE_FAIL,
  error
})

export const updateNotificationsContinue = () => ({
  type: actionTypes.NOTIFICATIONS_UPDATE_CONTINUE
})
