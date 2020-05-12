import React from 'react'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import Hvac from '../Hvac.jsx'
import { SnackbarProvider } from 'notistack'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../../i18n'

import { Provider } from 'react-redux'

import configureStore from 'redux-mock-store'
const mockStore = configureStore([])

describe('<Hvac />', () => {
  let initialStore = {
    sensor: {
      sensors: {
        temperatureSensors: [{ id: 2 }],
        windowSensors: [{ id: 3 }, { id: 4 }]
      },
      HVACRooms: [
        {
          id: 1,
          type: 'HVACRoom',
          heatingTemperature: 200,
          coolingTemperature: 300,
          hysteresis: 5,
          temperatureSensorId: 2,
          windowSensorIds: [3, 4]
        }
      ]
    }
  }

  let store

  beforeEach(() => {
    store = mockStore(initialStore)
  })

  afterEach(() => {
    jest.clearAllMocks()

    cleanup()
    initialStore = {
      sensor: {
        sensors: {
          temperatureSensors: [{ id: 2 }],
          windowSensors: [{ id: 3 }, { id: 4 }]
        },
        HVACRooms: [
          {
            id: 1,
            type: 'HVACRoom',
            heatingTemperature: 200,
            coolingTemperature: 300,
            hysteresis: 5,
            temperatureSensorId: 2,
            windowSensorIds: [3, 4]
          }
        ]
      }
    }
  })

  it('should render <Hvac/>', () => {
    const { queryByTestId } = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <SnackbarProvider>
            <Hvac />
          </SnackbarProvider>
        </I18nextProvider>
      </Provider>
    )

    expect(queryByTestId('hvac')).toBeTruthy()
  })

  it('should show Hvac content step by step and call invalid form action', () => {
    const { queryByTestId, queryByText, queryAllByText } = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <SnackbarProvider>
            <Hvac />
          </SnackbarProvider>
        </I18nextProvider>
      </Provider>
    )

    const step0 = ['hvac-id', 'hvac-name']
    const step1 = ['hvac-temperatureSensorId', 'hvac-windowSensorIds']
    const step2 = ['hvac-heating', 'hvac-cooling', 'hvac-hysteresis']

    step0.forEach(data => expect(queryByTestId(data)).toBeTruthy())
    step1.forEach(data => expect(queryByTestId(data)).toBeFalsy())
    step2.forEach(data => expect(queryByTestId(data)).toBeFalsy())

    fireEvent.click(queryByText('Next'))

    step1.forEach(data => expect(queryByTestId(data)).toBeTruthy())

    fireEvent.click(queryAllByText('Next')[1])

    step2.forEach(data => expect(queryByTestId(data)).toBeTruthy())

    fireEvent.click(queryAllByText('Finish')[2])

    expect(screen.getByText('All steps completed')).toBeTruthy()

    const expectedAction = { type: 'HVAC_ROOMS_VALID_FORM', valid: false }
    fireEvent.click(queryByText('Add'))
    const lastAction = store.getActions().length - 1

    expect(store.getActions()[lastAction]).toEqual(expectedAction)
  })

  it('should set required values and confirm the Hvac form', () => {
    const { queryByTestId, queryByText, getByRole } = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <SnackbarProvider>
            <Hvac />
          </SnackbarProvider>
        </I18nextProvider>
      </Provider>
    )

    const selectButton = id => queryByTestId(id).parentNode.querySelector('[role=button]')

    const selectId = selectButton('hvac-id')
    fireEvent.mouseDown(selectId)
    act(() => {
      const option = getByRole('option')
      expect(option.getAttribute('data-value')).toBe('1')
      fireEvent.mouseDown(option)
      option.click()
    })
    fireEvent.click(screen.queryByText('Next'))

    const selectTemperatureSensor = selectButton('hvac-temperatureSensorId')
    fireEvent.mouseDown(selectTemperatureSensor)
    act(() => {
      const option = getByRole('option')
      expect(option.getAttribute('data-value')).toBe('2')
      fireEvent.mouseDown(option)
      option.click()
    })

    fireEvent.click(screen.queryAllByText('Next')[1])
    fireEvent.click(screen.queryAllByText('Finish')[2])
    fireEvent.click(queryByText('Add'))

    const expectedActions = {
      valid: {
        type: 'HVAC_ROOMS_VALID_FORM',
        valid: true
      },
      add: {
        type: 'HVAC_ROOMS_CHANGE_ACTION',
        hvacRoomsDetails: {
          name: '',
          id: 1,
          heatingTemperature: 200,
          coolingTemperature: 300,
          hysteresis: 5,
          temperatureSensorId: 2,
          windowSensorIds: []
        }
      }
    }
    const getActions = store.getActions()
    const actions = {
      valid: getActions[getActions.length - 2],
      add: getActions[getActions.length - 1]
    }

    expect(actions.valid).toEqual(expectedActions.valid)
    expect(actions.add).toEqual(expectedActions.add)
  })
})
