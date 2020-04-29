import { takeLatest, put, call, delay, select } from 'redux-saga/effects'
import { watchNotifications } from './index'
import { fetchNotificationsSaga, updateNotificationsSaga, checkNotificationsSaga } from './notificationSagas'
import sagaHelper from 'redux-saga-testing'
import { fetchNotifications, checkNotifications } from '../../api/notification'
import actionTypes from '../../../common/constants/actionTypes'
import * as actions from '../../actions/notification'

describe('notifications watcher', () => {
  test('should yield three takeLatest effect creators and be done', () => {
    const gen = watchNotifications()

    expect(gen.next().value)
      .toEqual(takeLatest(actionTypes.NOTIFICATIONS_FETCH_REQUEST, fetchNotificationsSaga))

    expect(gen.next().value)
      .toEqual(takeLatest(actionTypes.NOTIFICATIONS_UPDATE, fetchNotificationsSaga))

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
    type: 'RFIDSensor',
    sensorId: 55,
    isChecked: false
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
    type: 'RFIDSensor',
    sensorId: 55,
    isChecked: false
  }]

  const mockNewNotifications = [
    {
      id: 1,
      timestamp: 1500000100,
      type: 'RFIDSensor',
      sensorId: 55,
      isChecked: false
    },
    {
      id: 2,
      timestamp: 1500000099,
      type: 'doorbell',
      sensorId: 22,
      isChecked: true
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
    expect(result).toEqual(call(fetchNotifications))
    return mockNewNotifications
  })
  it('should put updateNotificationsSuccess', result =>
    expect(result).toEqual(put(actions.updateNotificationsSuccess(mockNewNotifications))))
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
  it('should call fetchNotifications', result => {
    expect(result).toEqual(call(fetchNotifications))
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

  const mockNotifications = [
    {
      id: 1,
      timestamp: 1500000100,
      type: 'RFIDSensor',
      sensorId: 55,
      isChecked: false
    },
    {
      id: 2,
      timestamp: 1500000099,
      type: 'doorbell',
      sensorId: 22,
      isChecked: true
    }]

  const mockNewNotifications = [
    {
      id: 1,
      timestamp: 1500000100,
      type: 'RFIDSensor',
      sensorId: 55,
      isChecked: true
    },
    {
      id: 2,
      timestamp: 1500000099,
      type: 'doorbell',
      sensorId: 22,
      isChecked: true
    }]

  const checked = {
    id: 1,
    timestamp: 1500000100,
    type: 'RFIDSensor',
    sensorId: 55,
    isChecked: false
  }

  const fakeStore = {
    notification: {
      notifications: mockNotifications
    }
  }
  it('should select store', result => {
    expect(result).toEqual(select())
    return fakeStore
  })
  it('should put checkNotificationStart', result => {
    expect(result).toEqual(put(actions.checkNotificationsStart(checked)))
  })
  it('should call checkNotifications', async result => {
    expect(result).toEqual(call(checkNotifications, checked))
    return result
  })
  it('should put checkNotificationsSuccess', result =>
    expect(result).toEqual(put(actions.checkNotificationsSuccess(mockNewNotifications))))
  it('should be done', result =>
    expect(result).toBeUndefined())
})

describe('should throw an exception on unsuccessful checkNotificationsSaga', () => {
  const action = {
    id: 1
  }
  const it = sagaHelper(checkNotificationsSaga(action))
  const mockNotifications = [
    {
      id: 1,
      timestamp: 1500000100,
      type: 'RFIDSensor',
      sensorId: 55,
      isChecked: false
    }]

  const fakeStore = {
    notification: {
      notifications: mockNotifications
    }
  }

  const checked = {
    id: 1,
    timestamp: 1500000100,
    type: 'RFIDSensor',
    sensorId: 55,
    isChecked: false
  }

  it('should select store', result => {
    expect(result).toEqual(select())
    return fakeStore
  })
  it('should call checkNotificationStart action', result => {
    expect(result).toEqual(put(actions.checkNotificationsStart(checked)))
  })
  it('should call checkNotifications', result => {
    expect(result).toEqual(call(checkNotifications, checked))
    return new Error('test error')
  })
  it('should put checkNotificationFail action', result => {
    expect(result).toEqual(put(actions.checkNotificationsFail(mockNotifications, new Error('test error'))))
  })
  it('should not be done', result =>
    expect(result).toBeUndefined())
})
