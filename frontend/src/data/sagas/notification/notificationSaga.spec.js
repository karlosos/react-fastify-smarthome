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
    id: 1,
    timestamp: 1500000100,
    type: 'aleRFIDSensorrt',
    sensorId: 55
  }]

  it('should call fetchNotifications', result => {
    expect(result).toEqual(call(fetchNotifications))
    return mockNotifications
  })
  it('should put fetchNotificationsSuccess action', result =>
    expect(result).toEqual(put(actions.fetchNotificationsSuccess(mockNotifications))))
  it('should be done', result =>
    expect(result).toBeUndefined())
})

describe('should throw an exception on unsuccessful fetchNotificationsSaga', () => {
  const it = sagaHelper(fetchNotificationsSaga())

  it('should call fetchNotifications', result => {
    expect(result).toEqual(call(fetchNotifications))
    return new Error('test error')
  })
  it('should put fetchNotificationsError action', result =>
    expect(result).toEqual(put(actions.fetchNotificationsError(new Error('test error')))))
  it('should be done', result =>
    expect(result).toBeUndefined())
})

describe('updateNotificationsSaga', () => {
  const it = sagaHelper(updateNotificationsSaga())

  const mockNotifications = [{
    id: 1,
    timestamp: 1500000100,
    type: 'aleRFIDSensorrt',
    sensorId: 55
  }]

  const mockNewNotifications = [
    {
      id: 1,
      timestamp: 1500000100,
      type: 'aleRFIDSensorrt',
      sensorId: 55
    },
    {
      id: 2,
      timestamp: 1500000099,
      type: 'doorbell',
      sensorId: 22
    }]

  const fakeStore = {
    notification: {
      notifications: mockNotifications
    }
  }

  it('should call delay', result =>
    expect(result).toEqual(delay(5000)))
  it('should select store', result => {
    expect(result).toEqual(select())
    return fakeStore
  })
  it('should call updateNotifications', result => {
    expect(result).toEqual(call(updateNotifications))
    return mockNewNotifications
  })
  it('should select store', result => {
    expect(result).toEqual(select())
    return fakeStore
  })
  it('should put updateNotificationsSuccess', result =>
    expect(result).toEqual(put(actions.updateNotificationsSuccess(mockNewNotifications))))
  it('should not be done', result =>
    expect(result).toBeDefined())
})

describe('should skip ongoing updating', () => {
  const it = sagaHelper(updateNotificationsSaga())

  const mockNotifications = [{
    id: 1,
    timestamp: 1500000100,
    type: 'aleRFIDSensorrt',
    sensorId: 55
  }]

  const mockChangedNotifications = [{
    id: 1,
    timestamp: 1500000100,
    type: 'aleRFIDSensorrt',
    sensorId: 55,
    isChecked: true
  }]

  const mockNewNotifications = [
    {
      id: 1,
      timestamp: 1500000100,
      type: 'aleRFIDSensorrt',
      sensorId: 55
    },
    {
      id: 2,
      timestamp: 1500000099,
      type: 'doorbell',
      sensorId: 22
    }]

  const fakeStore = {
    notification: {
      notifications: mockNotifications
    }
  }
  const fakeChangedStore = {
    notification: {
      notifications: mockChangedNotifications
    }
  }

  it('should call delay', result =>
    expect(result).toEqual(delay(5000)))
  it('should select store', result => {
    expect(result).toEqual(select())
    return fakeStore
  })
  it('should call updateNotifications', result => {
    expect(result).toEqual(call(updateNotifications))
    return mockNewNotifications
  })
  it('should select store', result => {
    expect(result).toEqual(select())
    return fakeChangedStore
  })
  it('should put updateNotificationsContinue', result =>
    expect(result).toEqual(put(actions.updateNotificationsContinue())))
  it('should not be done', result =>
    expect(result).toBeDefined())
})

describe('should throw an exception on unsuccessful updateNotificationsSaga', () => {
  const it = sagaHelper(updateNotificationsSaga())
  const fakeStore = {
    notification: {
      notifications: []
    }
  }

  it('should call delay', result =>
    expect(result).toEqual(delay(5000)))
  it('should select store', result => {
    expect(result).toEqual(select())
    return fakeStore
  })
  it('should call updateNotifications', result => {
    expect(result).toEqual(call(updateNotifications))
    return new Error('test error')
  })
  it('should put updateNotificationsFail action', result => {
    expect(result).toEqual(put(actions.updateNotificationsFail(new Error('test error'))))
  })
  it('should not be done', result =>
    expect(result).toBeDefined())
})

describe('checkNotificationsSaga', () => {
  const action = {
    id: 1
  }
  const it = sagaHelper(checkNotificationsSaga(action))

  const mockNotifications = [{
    id: 1,
    timestamp: 1500000100,
    type: 'aleRFIDSensorrt',
    sensorId: 55
  }]
  const checked = [{
    id: 1,
    timestamp: 1500000100,
    type: 'aleRFIDSensorrt',
    sensorId: 55,
    isChecked: true
  }]

  const fakeStore = {
    notification: {
      notifications: mockNotifications
    }
  }
  it('should select store', result => {
    expect(result).toEqual(select())
    return fakeStore
  })
  it('should put checkNotificationSuccess', (result) =>
    expect(result).toEqual(put(actions.checkNotificationSuccess(checked))))
  it('should be done', result =>
    expect(result).toBeUndefined())
})
