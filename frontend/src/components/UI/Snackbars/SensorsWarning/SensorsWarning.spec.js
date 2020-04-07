import React from 'react'
import { create } from 'react-test-renderer'
import { render, screen } from '@testing-library/react'
import SensorsWarning from './index'
import { SnackbarProvider } from 'notistack'

import { Provider } from 'react-redux'

import configureStore from 'redux-mock-store'

jest.mock('notistack', () => ({
  ...jest.requireActual('notistack')
}))

describe('<SensorsWarning />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders SensorsWarning component', () => {
    const initialState = { sensor: { } }
    const mockStore = configureStore()
    const store = mockStore(initialState)

    const root = create(
      <Provider store={store}>
        <SnackbarProvider>
          <SensorsWarning />
        </SnackbarProvider>
      </Provider>
    )
    expect(root.toJSON()).toMatchSnapshot()
  })

  it('should show a snackbar if refreshError is not null', () => {
    const initialState = { sensor: { refreshError: 'error' } }
    const mockStore = configureStore()
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <SnackbarProvider>
          <SensorsWarning />
        </SnackbarProvider>
      </Provider>
    )

    expect(screen.getByText('Odświeżenie stanu czujników nie powiodło się.')).not.toEqual(null)
  })

  it('should not show a new snackbar if one is already open', () => {
    const notistack = require('notistack')

    const enqueueSnackbar = jest.fn()
    jest.spyOn(notistack, 'useSnackbar').mockImplementation(() => { return { enqueueSnackbar } })

    const setKey = jest.fn()
    const useStateMock = () => ['testKey', setKey]
    jest.spyOn(React, 'useState').mockImplementation(useStateMock)

    const initialState = { sensor: { refreshError: 'error' } }
    const mockStore = configureStore()
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <SnackbarProvider>
          <SensorsWarning />
        </SnackbarProvider>
      </Provider>
    )

    expect(enqueueSnackbar).toHaveBeenCalledTimes(0)
    expect(setKey).toHaveBeenCalledTimes(0)
  })

  it('should close a snackbar if snackbar is open and refreshError is set to null', () => {
    const notistack = require('notistack')

    const closeSnackbar = jest.fn()
    jest.spyOn(notistack, 'useSnackbar').mockImplementation(() => { return { closeSnackbar } })

    const setKey = jest.fn()
    const useStateMock = () => ['testKey', setKey]
    jest.spyOn(React, 'useState').mockImplementation(useStateMock)

    const initialState = { sensor: { refreshError: null } }
    const mockStore = configureStore()
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <SnackbarProvider>
          <SensorsWarning />
        </SnackbarProvider>
      </Provider>
    )

    expect(closeSnackbar).toHaveBeenCalledTimes(1)
    expect(setKey).toHaveBeenCalledTimes(1)
  })
})
