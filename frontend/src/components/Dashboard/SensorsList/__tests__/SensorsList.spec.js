import React from 'react'
import { render } from '@testing-library/react'
import SensorsList from '../SensorsList'
import mockSensors from '../../../../data/api/sensor/mockSensors'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { I18nextProvider } from 'react-i18next'
import { SnackbarProvider } from 'notistack'
import i18n from '../../../../i18n'

const mockStore = configureStore([])

describe('<SensorsList />', () => {
  let store

  beforeEach(() => {
    store = mockStore({
      sensor: {
        sensors: mockSensors,
        loadingSensors: false
      },
      mapListCommunication: {
        pressedItemId: 3
      },
      dbInteraction: {
        _id: 1,
        removeError: false
      }
    })
  })

  test('should render <SensorsList>', () => {
    const { queryByTestId } = render(
      <Provider store={store}>
        <SnackbarProvider>
          <I18nextProvider i18n={i18n}>
            <SensorsList />
          </I18nextProvider>
        </SnackbarProvider>
      </Provider>
    )
    expect(queryByTestId('sensors-list')).toBeTruthy()
    expect(queryByTestId('connected-sensors-list').childElementCount).toBe(7)
    expect(queryByTestId('not-connected-sensors-list').childElementCount).toBe(7)
  })

  test('should render <SensorsList> with no elements', () => {
    store = mockStore({
      sensor: {
        sensors: [],
        loadingSensors: false
      },
      mapListCommunication: {
        pressedItemId: 3
      },
      dbInteraction: {
        _id: 1,
        removeError: false
      }
    })
    const { queryByTestId } = render(
      <Provider store={store}>
        <SnackbarProvider>
          <SensorsList />
        </SnackbarProvider>
      </Provider>

    )
    expect(queryByTestId('sensors-list')).toBeTruthy()
  })

  test('should divide sensors into sections', () => {
    store = mockStore({
      sensor: {
        sensors: {
          temperatureSensors: [
            {
              id: 1,
              type: 'temperatureSensor',
              value: 21
            },
            {
              id: 9,
              type: 'temperatureSensor',
              value: 22,
              mapPosition: {
                x: 0,
                y: 0
              }
            },
            {
              id: 10,
              type: 'temperatureSensor',
              value: 22,
              mapPosition: {
                x: 0,
                y: 0
              }
            }]
        }
      },
      mapListCommunication: {
        pressedItemId: 3
      },
      dbInteraction: {
        _id: 1,
        removeError: false
      },
      loadingSensors: false
    })

    const { queryByTestId } = render(
      <Provider store={store}>
        <SnackbarProvider>
          <SensorsList />
        </SnackbarProvider>
      </Provider>

    )
    expect(queryByTestId('sensors-list')).toBeTruthy()
    expect(queryByTestId('connected-sensors-list')).toBeTruthy()
    expect(queryByTestId('not-connected-sensors-list')).toBeTruthy()
    // 2 sensors + header = 3 children
    expect(queryByTestId('connected-sensors-list').childElementCount).toBe(3)
    // 1 sensor + header = 2 children
    expect(queryByTestId('not-connected-sensors-list').childElementCount).toBe(2)
  })
})
