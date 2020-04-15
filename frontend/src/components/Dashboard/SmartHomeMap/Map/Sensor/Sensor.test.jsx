import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/jest-dom/matchers'
import Sensor from './Sensor'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

const styleMock = {
  top: '20px', left: '50px'
}

const mockedSensorState = {
  sensors: [],
  loadingSensors: false,
  loadingError: null,
  sensorError: null
}

const mockedMapState = {
  listItemPressed: false,
  pressedItemId: undefined,
  waitingForSensorLocation: false,
  sensorColor: undefined,
  sensorData: undefined
}

const mockedDbInteractionState = {
  _id: 0,
  type: 'None',
  mapPosition: undefined,
  addingPoint: false,
  dbError: undefined
}

describe('Sensor component test suite', () => {
  const initialState = { sensor: mockedSensorState, mapListCommunication: mockedMapState, dbInteraction: mockedDbInteractionState }
  const mockStore = configureStore()
  const store = mockStore(initialState)

  test('should have styles', () => {
    expect(render(
      <Provider store={store}>
        <Sensor position={styleMock} />
      </Provider>
    ).getByTestId('sensor-id')).toHaveStyle(styleMock)
  })
})
