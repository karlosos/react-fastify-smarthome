import actionTypes from '@constants/actionTypes'

const initialState = {
  notifications: [],
  fetchError: undefined,
  fetching: false,
  isDrawerOpen: false,
  updating: false,
  updateError: undefined,
  checking: false,
  notificationContent: undefined,
  checkError: undefined
}

export default function notification (state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.NOTIFICATIONS_FETCH_REQUEST:
      return {
        ...state,
        fetching: true,
        fetchError: undefined
      }
    case actionTypes.NOTIFICATIONS_FETCH_SUCCESS:
      return {
        ...state,
        fetching: false,
        notifications: action.notifications
      }
    case actionTypes.NOTIFICATIONS_FETCH_FAIL:
      return {
        ...state,
        fetching: false,
        fetchError: action.error
      }
    case actionTypes.NOTIFICATION_DRAWER_OPEN:
      return {
        ...state,
        isDrawerOpen: true
      }
    case actionTypes.NOTIFICATION_DRAWER_CLOSE:
      return {
        ...state,
        isDrawerOpen: false
      }
    case actionTypes.NOTIFICATIONS_CHECK:
      return {
        ...state,
        notificationContent: undefined,
        checkError: undefined,
        checking: false
      }
    case actionTypes.NOTIFICATIONS_CHECK_START:
      return {
        ...state,
        notificationContent: action.notification,
        checking: true
      }
    case actionTypes.NOTIFICATIONS_CHECK_SUCCESS:
      return {
        ...state,
        notifications: action.notifications,
        checking: false,
        checkError: undefined
      }
    case actionTypes.NOTIFICATIONS_CHECK_FAIL:
      return {
        ...state,
        notifications: action.notifications,
        checking: false,
        checkError: action.error
      }
    case actionTypes.NOTIFICATIONS_UPDATE:
      return {
        ...state,
        updating: true,
        updateError: undefined
      }
    case actionTypes.NOTIFICATIONS_UPDATE_SUCCESS:
      return {
        ...state,
        updating: false,
        notifications: action.notifications
      }
    case actionTypes.NOTIFICATIONS_UPDATE_FAIL:
      return {
        ...state,
        updating: false,
        updateError: action.error
      }
    case actionTypes.NOTIFICATIONS_UPDATE_CONTINUE:
      return state
    default:
      return state
  }
}
