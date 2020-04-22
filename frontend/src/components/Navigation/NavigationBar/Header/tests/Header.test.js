import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import Header from '../Header.jsx'
import i18n from '../../../../../i18n'
import { SnackbarProvider } from 'notistack'

jest.mock('notistack', () => ({
  ...jest.requireActual('notistack')
}))

const mockStore = configureStore([])

describe('<Header />', () => {
  let initialStore = {
    notification: {
      notifications: [{
        id: 7,
        timestamp: 1777777777,
        type: 'alert',
        sensorId: 6
      },
      {
        id: 6,
        timestamp: 1666666666,
        type: 'alert',
        sensorId: 6
      }],
      isDrawerOpen: false
    }
  }

  let store
  let initialRoute

  beforeEach(async () => {
    initialRoute = ['/']
    store = mockStore(initialStore)
  })

  afterEach(() => {
    cleanup()
    initialStore = {
      notification: {
        notifications: [{
          id: 7,
          timestamp: 1777777777,
          type: 'alert',
          sensorId: 6
        },
        {
          id: 6,
          timestamp: 1666666666,
          type: 'alert',
          sensorId: 6
        }],
        isDrawerOpen: false
      }
    }
    jest.clearAllMocks()
  })

  it('renders header component', () => {
    const notistack = require('notistack')

    const closeSnackbar = jest.fn()
    jest.spyOn(notistack, 'useSnackbar').mockImplementation(() => { return { closeSnackbar } })

    const { queryByTestId } = render(
      <Provider store={store}>
        <SnackbarProvider>
          <MemoryRouter initialEntries={initialRoute}>
            <I18nextProvider i18n={i18n}>
              <Header />
            </I18nextProvider>
          </MemoryRouter>
        </SnackbarProvider>
      </Provider>
    )
    expect(queryByTestId('header-id')).toBeTruthy()
  })

  it('checks if the dashboard is in the tabs', () => {
    const notistack = require('notistack')

    const closeSnackbar = jest.fn()
    jest.spyOn(notistack, 'useSnackbar').mockImplementation(() => { return { closeSnackbar } })

    const { queryByTestId } = render(
      <Provider store={store}>
        <SnackbarProvider>
          <MemoryRouter initialEntries={initialRoute}>
            <I18nextProvider i18n={i18n}>
              <Header />
            </I18nextProvider>
          </MemoryRouter>
        </SnackbarProvider>
      </Provider>
    )
    expect(queryByTestId('dashboard-tab-id')).toBeTruthy()
  })

  it('should open notification drawer', async () => {
    const { queryByTestId } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={initialRoute}>
          <I18nextProvider i18n={i18n}>
            <Header />
          </I18nextProvider>
        </MemoryRouter>
      </Provider>
    )

    expect(queryByTestId('drawer-list')).toBeFalsy()

    const openDrawer = queryByTestId('drawer-open')
    fireEvent.click(openDrawer)
    const expectedAction = { type: 'NOTIFICATION_DRAWER_OPEN' }
    const lastAction = store.getActions().length - 1

    expect(store.getActions()[lastAction]).toEqual(expectedAction)
  })
})
