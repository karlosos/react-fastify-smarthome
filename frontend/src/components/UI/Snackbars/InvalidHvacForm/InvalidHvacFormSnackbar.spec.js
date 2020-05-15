import React from 'react'
import { Provider } from 'react-redux'
import { create } from 'react-test-renderer'
import { render, screen } from '@testing-library/react'
import configureStore from 'redux-mock-store'
import { I18nextProvider } from 'react-i18next'
import { SnackbarProvider } from 'notistack'
import i18n from '../../../../i18n'
import InvalidHvacFormSnackbar from './index'

jest.mock('notistack', () => ({
  ...jest.requireActual('notistack')
}))

describe('showing <InvalidHvacFormSnackbar />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('should show a snackbar if hvacRoomsValidForm is false', () => {
    const initialState = { sensor: { hvacRoomsValidForm: false } }
    const mockStore = configureStore()
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <SnackbarProvider>
          <I18nextProvider i18n={i18n}>
            <InvalidHvacFormSnackbar />
          </I18nextProvider>
        </SnackbarProvider>
      </Provider>
    )
    expect(screen.getByText('INVALID FORM. Fill out the required fields.')).not.toEqual(null)
  })

  it('should close a snackbar if snackbar is open and hvacRoomsValidForm is set to true, should not open a new one', () => {
    const notistack = require('notistack')

    const closeSnackbar = jest.fn()
    const enqueueSnackbar = jest.fn()
    jest.spyOn(notistack, 'useSnackbar').mockImplementation(() => { return { enqueueSnackbar, closeSnackbar } })

    const initialState = { sensor: { hvacRoomsValidForm: true } }
    const mockStore = configureStore()
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <SnackbarProvider>
          <InvalidHvacFormSnackbar />
        </SnackbarProvider>
      </Provider>
    )

    expect(closeSnackbar).toHaveBeenCalledTimes(1)
    expect(enqueueSnackbar).not.toHaveBeenCalled()
  })

  it('renders InvalidHvacFormSnackbar component', () => {
    const initialState = { sensor: { } }
    const mockStore = configureStore()
    const store = mockStore(initialState)

    const root = create(
      <Provider store={store}>
        <SnackbarProvider>
          <InvalidHvacFormSnackbar />
        </SnackbarProvider>
      </Provider>
    )
    expect(root.toJSON()).toMatchSnapshot()
  })
})
