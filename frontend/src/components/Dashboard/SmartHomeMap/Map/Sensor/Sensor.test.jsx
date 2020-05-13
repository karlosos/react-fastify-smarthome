import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/jest-dom/matchers'
import Sensor from './Sensor'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

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

const mockedProps = {
  sensorSize: {
    width: 10,
    height: 10
  },
  sensorColor: 'black',
  sensorBorderColor: 'white',
  position: {
    top: '10px',
    left: '50px'
  },
  clicked: true
}

const mockSensorData = {
  type: 'windowSensor',
  id: 5,
  status: 'open'
}

describe('Sensor component test suite', () => {
  const initialState = { sensor: mockedSensorState, mapListCommunication: mockedMapState, dbInteraction: mockedDbInteractionState }
  const mockStore = configureStore()
  const store = mockStore(initialState)

  test('should be rendered', () => {
    expect(render(
      <Provider store={store}>
        <Sensor
          sensorSize={mockedProps.sensorSize}
          sensorColor={mockedProps.sensorColor}
          sensorborderColor={mockedProps.sensorBorderColor}
          position={mockedProps.position}
          clicked={mockedProps.clicked}
          sensorData={mockSensorData}
        />
      </Provider>
    ).getByTestId('sensor-id')).toBeTruthy()
  })
})
