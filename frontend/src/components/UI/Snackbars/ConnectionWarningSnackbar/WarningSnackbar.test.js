import React from 'react'
import { cleanup, render, waitForElement } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/jest-dom/matchers'
import { create } from 'react-test-renderer'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import WarningSnackbar from './index'
import { SnackbarProvider } from 'notistack'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../../../i18n'

const axiosMock = new MockAdapter(axios)

const pingEndpointMock = () => axios.get('/health-check', {
  timeout: 5000
})

let isOnlineGetter

describe.only('WarningSnackbar component', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    isOnlineGetter = jest.spyOn(window.navigator, 'onLine', 'get')
  })

  afterEach(async () => {
    jest.clearAllTimers()
    jest.useRealTimers()
    await cleanup()
  })

  it('Matches the snapshot', () => {
    const snackbar = create(
      <SnackbarProvider>
        <I18nextProvider i18n={i18n}>
          <WarningSnackbar pingEndpoint={pingEndpointMock} />
        </I18nextProvider>
      </SnackbarProvider>)
    expect(snackbar.toJSON()).toMatchSnapshot()
  })

  it('should ping the health-check endpoint after 10 second and still be hidden', async (done) => {
    const callMock = jest
      .fn()
      .mockReturnValue([200, {}])
      .mockName('serverEndpoint')
    axiosMock.onGet('/health-check')
      .reply(callMock)
    const { container } = render(
      <SnackbarProvider>
        <I18nextProvider i18n={i18n}>
          <WarningSnackbar pingEndpoint={pingEndpointMock} />
        </I18nextProvider>
      </SnackbarProvider>
    )
    jest.advanceTimersByTime(20100)

    await waitForElement(() => container)
    expect(callMock).toHaveBeenCalledTimes(3)
    expect(container.firstChild).toBeNull()
    done()
  })

  it('should open the snackbar when the HTTP code is 408', async () => {
    const callMock = jest.fn()
      .mockReturnValueOnce([200, {}])
      .mockReturnValueOnce([408, {}])
      .mockName('serverEndpoint')
    axiosMock
      .onGet('/health-check')
      .reply(callMock)
    const { getByText } = render(
      <SnackbarProvider>
        <WarningSnackbar pingEndpoint={pingEndpointMock} />
      </SnackbarProvider>
    )
    jest.advanceTimersByTime(11000)
    await waitForElement(() => getByText('Hey, something isn\'t quite right! Check your connection.'))
    expect(callMock).toHaveBeenCalledTimes(2)
  })

  it('should open the snackbar when there is a network error', async () => {
    isOnlineGetter.mockReturnValue(false)
    axiosMock.onGet('/health-check')
    const { getByText } = render(
      <SnackbarProvider>
        <WarningSnackbar pingEndpoint={pingEndpointMock} />
      </SnackbarProvider>
    )
    await waitForElement(() => getByText('Hey, something isn\'t quite right! Check your connection.'))
  })
})
