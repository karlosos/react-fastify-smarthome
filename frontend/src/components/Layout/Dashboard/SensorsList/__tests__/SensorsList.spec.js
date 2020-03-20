import React from 'react'
import { render } from '@testing-library/react'
import SensorsList from '../SensorsList'
import mockSensors from '../../../data/api/sensor/mockSensors'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
const mockStore = configureStore([])

describe('<SensorsList />', () => {
  let store

  beforeEach(() => {
    store = mockStore({
      sensor: {
        sensors: mockSensors,
        loadingSensors: false
      }
    })
  })

  test('should render <SensorsList>', () => {
    const { queryByTestId } = render(
      <Provider store={store}>
        <SensorsList />
      </Provider>

    )
    expect(queryByTestId('sensors-list')).toBeTruthy()
  })

  test('should render <SensorsList> with no elements', () => {
    store = mockStore({
      sensor: {
        sensors: [],
        loadingSensors: false
      }
    })
    const { queryByTestId } = render(
      <Provider store={store}>
        <SensorsList />
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
              type: 'temperatureSensor placed',
              value: 21
            },
            {
              id: 9,
              type: 'temperatureSensor notPlaced',
              value: 22,
              mapPosition: {
                x: 0,
                y: 0
              }
            },
            {
              id: 10,
              type: 'temperatureSensor notPlaced2',
              value: 22,
              mapPosition: {
                x: 0,
                y: 0
              }
            }]
        }
      },
      loadingSensors: false
    })

    const { queryByTestId } = render(
      <Provider store={store}>
        <SensorsList />
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
