import { takeLatest, put, call, delay, select } from 'redux-saga/effects'
import { watchNotifications } from './index'
import { fetchNotificationsSaga, updateNotificationsSaga, checkNotificationsSaga } from './notificationSagas'
import sagaHelper from 'redux-saga-testing'

import { fetchNotifications, updateNotifications } from '../../api/notification'
import actionTypes from '../../../common/constants/actionTypes'
import * as actions from '../../actions/notification'

describe('notifications watcher', () => {
  test('should yield three takeLatest effect creators and be done', () => {
    const gen = watchNotifications()

    expect(gen.next().value)
      .toEqual(takeLatest(actionTypes.NOTIFICATIONS_FETCH_REQUEST, fetchNotificationsSaga))

    expect(gen.next().value)
      .toEqual(takeLatest(actionTypes.NOTIFICATIONS_UPDATE, updateNotificationsSaga))

    expect(gen.next().value)
      .toEqual(takeLatest(actionTypes.NOTIFICATIONS_CHECK, checkNotificationsSaga))

    expect(gen.next().done)
      .toEqual(true)
  })
})

describe('fetchNotificationsSaga', () => {
  const it = sagaHelper(fetchNotificationsSaga())
  const mockNotifications = [{
    id: 5,
    timestamp: 1517902808,
    type: 'aleRFIDSensorrt',
    sensorId: 55
  },
  {
    id: 2,
    timestamp: 1598162038,
    type: 'doorbell',
    sensorId: 22
  }]

  it('should call fetchNotifications', result => {
    expect(result).toEqual(call(fetchNotifications))
    return mockNotifications
  })
  it('should put fetchNotificationsSuccess action', result => {
    expect(result).toEqual(put(actions.fetchNotificationsSuccess(mockNotifications)))
  })
  it('should be done', result => {
    expect(result).toBeUndefined()
  })
})

describe('should throw an exception on unsuccessful fetchNotificationsSaga', () => {
  const it = sagaHelper(fetchNotificationsSaga())

  it('should call fetchNotifications', result => {
    expect(result).toEqual(call(fetchNotifications))
    return new Error('test error')
  })
  it('should put fetchNotificationsError action', result => {
    expect(result).toEqual(put(actions.fetchNotificationsError(new Error('test error'))))
  })
  it('should be done', result => {
    expect(result).toBeUndefined()
  })
})

describe('updateNotificationsSaga', () => {
  const it = sagaHelper(updateNotificationsSaga())

  const mockNotifications = [{
    id: 5,
    timestamp: 1517902808,
    type: 'aleRFIDSensorrt',
    sensorId: 55
  },
  {
    id: 2,
    timestamp: 1598162038,
    type: 'doorbell',
    sensorId: 22
  }]

  const fakeStore = {
    notifications: mockNotifications
  }

  it('should call delay', () => {
  })
  it('should call delay', () => {
  })
  it('should select', () => {
  })
})

describe('checkNotificationsSaga', () => {
  const it = sagaHelper(checkNotificationsSaga())

  const mockNotifications = [{
    id: 5,
    timestamp: 1517902808,
    type: 'aleRFIDSensorrt',
    sensorId: 55
  },
  {
    id: 2,
    timestamp: 1598162038,
    type: 'doorbell',
    sensorId: 22
  }]

  const fakeStore = {
    notifications: mockNotifications
  }

  it('should select', () => {
  })
})
