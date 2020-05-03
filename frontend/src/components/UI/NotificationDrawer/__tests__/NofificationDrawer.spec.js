import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import configureStore from 'redux-mock-store'
import i18n from '../../../../i18n'
import NotificationDrawer from '../index'
import { notificationFilter } from '@components/Notifications/notificationFilter'

const mockStore = configureStore([])

describe('<NotificationDrawer />', () => {
  let initialStore = {
    notification: {
      notifications: [{
        id: 1,
        timestamp: 1777777777,
        type: 'alert',
        sensorId: 1
      },
      {
        id: 2,
        timestamp: 1666666666,
        type: 'alert',
        sensorId: 1
      }],
      fetching: false,
      isDrawerOpen: true,
      updating: false,
      fetchError: false,
      updateError: false
    },
    sensor: {
      sensors: {
        temperatureSensors: [
          {
            id: 1,
            type: 'temperatureSensor',
            value: 21
          }]
      }
    }
  }
  let store
  let initialRoute

  beforeEach(() => {
    initialRoute = ['/']
    store = mockStore(initialStore)
  })

  afterEach(() => {
    cleanup()
    initialStore = {
      notification: {
        notifications: [{
          id: 1,
          timestamp: 1777777777,
          type: 'alert',
          sensorId: 1
        },
        {
          id: 2,
          timestamp: 1666666666,
          type: 'alert',
          sensorId: 1
        }],
        fetching: false,
        isDrawerOpen: true,
        updating: false,
        fetchError: false,
        updateError: false
      },
      sensor: {
        sensors: {
          temperatureSensors: [
            {
              id: 1,
              type: 'temperatureSensor',
              value: 21
            }]
        }
      }
    }
  })

  test('should render <NotificationDrawer>', () => {
    const { checkedNotifications, uncheckedNotifications } = notificationFilter(store.getState().notification.notifications)
    const { queryByTestId, queryAllByTestId } = render(
      <Provider store={store}>
        <MemoryRouter initialRoute={initialRoute}>
          <I18nextProvider i18n={i18n}>
            <NotificationDrawer checkedNotifications={checkedNotifications} uncheckedNotifications={uncheckedNotifications} />
          </I18nextProvider>
        </MemoryRouter>
      </Provider>
    )

    expect(queryByTestId('notification-list')).toBeTruthy()
    expect(queryAllByTestId('drawer-item').length).toBe(2)
  })
  test('should render no-new-notifications', () => {
    initialStore.notification = {
      ...initialStore.notification,
      notifications: []
    }
    const { checkedNotifications, uncheckedNotifications } = notificationFilter(store.getState().notification.notifications)

    const { queryByTestId } = render(
      <Provider store={store}>
        <MemoryRouter initialRoute={initialRoute}>
          <I18nextProvider i18n={i18n}>
            <NotificationDrawer checkedNotifications={checkedNotifications} uncheckedNotifications={uncheckedNotifications} />
          </I18nextProvider>
        </MemoryRouter>
      </Provider>
    )

    expect(queryByTestId('no-new-notifications')).toBeTruthy()
  })
  test('should render something-went-wrong', () => {
    initialStore.notification = {
      ...initialStore.notification,
      fetchError: true,
      updateError: true
    }

    const { checkedNotifications, uncheckedNotifications } = notificationFilter(store.getState().notification.notifications)

    const { queryByTestId } = render(
      <Provider store={store}>
        <MemoryRouter initialRoute={initialRoute}>
          <I18nextProvider i18n={i18n}>
            <NotificationDrawer checkedNotifications={checkedNotifications} uncheckedNotifications={uncheckedNotifications} />
          </I18nextProvider>
        </MemoryRouter>
      </Provider>
    )
    expect(queryByTestId('something-went-wrong')).toBeTruthy()
  })

  test('should remove one notification from list', () => {
    const { checkedNotifications, uncheckedNotifications } = notificationFilter(store.getState().notification.notifications)

    const { queryAllByRole } = render(
      <Provider store={store}>
        <MemoryRouter initialRoute={initialRoute}>
          <I18nextProvider i18n={i18n}>
            <NotificationDrawer checkedNotifications={checkedNotifications} uncheckedNotifications={uncheckedNotifications} />
          </I18nextProvider>
        </MemoryRouter>
      </Provider>
    )
    const checkIcons = queryAllByRole('check-notification')

    expect(checkIcons.length).toBe(2)

    const expectedAction = { type: 'NOTIFICATIONS_CHECK', id: 1 }
    fireEvent.click(checkIcons[0])
    const lastAction = store.getActions().length - 1

    expect(store.getActions()[lastAction]).toEqual(expectedAction)
  })
})
