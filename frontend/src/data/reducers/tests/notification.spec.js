/* globals describe, test, expect */

import reducer from '../notification'
import actionTypes from '@constants/actionTypes'
import * as actions from '@data/actions/notification'

describe('notification reducer', () => {
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

  const testError = 'Error'

  const mockNotifications = [
    {
      id: 5,
      timestamp: 1517902808,
      type: 'aleRFIDSensorrt',
      sensorId: 55,
      isChecked: true
    },
    {
      id: 2,
      timestamp: 1598162038,
      type: 'doorbell',
      sensorId: 22,
      isChecked: false
    },
    {
      id: 4,
      timestamp: 153989218,
      type: 'windowSensor',
      sensorId: 44,
      isChecked: false
    },
    {
      id: 3,
      timestamp: 1578075628,
      type: 'hvac',
      sensorId: 33,
      isChecked: false
    },
    {
      id: 1,
      timestamp: 1558248448,
      type: 'alert',
      sensorId: 11,
      isChecked: false
    }
  ]

  test('should return the initial state', () => {
    expect(reducer(initialState, {})).toEqual(initialState)
  })

  test(`should handle ${actionTypes.NOTIFICATIONS_FETCH_REQUEST}`, () => {
    expect(reducer(initialState, actions.fetchNotificationsRequest())).toEqual({
      ...initialState,
      fetching: true,
      fetchError: undefined
    })
  })

  test(`should handle ${actionTypes.NOTIFICATIONS_FETCH_SUCCESS}`, () => {
    expect(reducer(initialState, actions.fetchNotificationsSuccess(mockNotifications))).toEqual({
      ...initialState,
      fetching: false,
      notifications: mockNotifications
    })
  })

  test(`should handle ${actionTypes.NOTIFICATIONS_FETCH_FAIL}`, () => {
    expect(reducer(initialState, actions.fetchNotificationsError(testError))).toEqual({
      ...initialState,
      fetching: false,
      fetchError: testError
    })
  })

  test(`should handle ${actionTypes.NOTIFICATION_DRAWER_OPEN}`, () => {
    expect(reducer(initialState, actions.openNotificationDrawer())).toEqual({
      ...initialState,
      isDrawerOpen: true
    })
  })

  test(`should handle ${actionTypes.NOTIFICATION_DRAWER_CLOSE}`, () => {
    expect(reducer(initialState, actions.closeNotificationDrawer())).toEqual({
      ...initialState,
      isDrawerOpen: false
    })
  })

  test(`should handle ${actionTypes.NOTIFICATIONS_CHECK}`, () => {
    expect(reducer(initialState, actions.checkNotifications(3))).toEqual({
      ...initialState,
      notificationContent: undefined,
      checkError: undefined,
      checking: false
    })
  })

  test(`should handle ${actionTypes.NOTIFICATIONS_CHECK_START}`, () => {
    expect(reducer(initialState, actions.checkNotificationsStart(mockNotifications[0]))).toEqual({
      ...initialState,
      notificationContent: mockNotifications[0],
      checking: true
    })
  })

  test(`should handle ${actionTypes.NOTIFICATIONS_CHECK_SUCCESS}`, () => {
    expect(reducer(initialState, actions.checkNotificationsSuccess(mockNotifications))).toEqual({
      ...initialState,
      notifications: mockNotifications,
      checking: false,
      checkError: undefined
    })
  })

  test(`should handle ${actionTypes.NOTIFICATIONS_CHECK_FAIL}`, () => {
    expect(reducer(initialState, actions.checkNotificationsFail(mockNotifications, testError))).toEqual({
      ...initialState,
      notifications: mockNotifications,
      checking: false,
      checkError: testError
    })
  })

  test(`should handle ${actionTypes.NOTIFICATIONS_UPDATE}`, () => {
    expect(reducer(initialState, actions.updateNotifications())).toEqual({
      ...initialState,
      updating: true,
      updateError: undefined
    })
  })

  test(`should handle ${actionTypes.NOTIFICATIONS_UPDATE_SUCCESS}`, () => {
    expect(reducer(initialState, actions.updateNotificationsSuccess(mockNotifications))).toEqual({
      ...initialState,
      updating: false,
      notifications: mockNotifications
    })
  })

  test(`should handle ${actionTypes.NOTIFICATIONS_UPDATE_FAIL}`, () => {
    expect(reducer(initialState, actions.updateNotificationsFail(testError))).toEqual({
      ...initialState,
      updating: false,
      updateError: testError
    })
  })
})
