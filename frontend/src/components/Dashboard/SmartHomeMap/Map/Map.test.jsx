import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import HomeMap from './Map'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../../../i18n'
import { SnackbarProvider } from 'notistack'

jest.mock('./helpers', () => {
  return {
    fromCoordinateToPercentMapper: () => 0,
    fromPercentToCoordinateMapper: () => 0,
    isFieldOccupied: () => false,
    validPointData: () => true
  }
})

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
  addError: undefined,
  removeSuccess: false,
  addErrorPoints: []
}

describe('Map component tests', () => {
  const initialState = { sensor: mockedSensorState, mapListCommunication: mockedMapState, dbInteraction: mockedDbInteractionState }
  const mockStore = configureStore()
  const store = mockStore(initialState)

  describe('map render', () => {
    test('should render', () => {
      expect(render(
        <Provider store={store}>
          <SnackbarProvider>
            <I18nextProvider i18n={i18n}>
              <HomeMap />
            </I18nextProvider>
          </SnackbarProvider>
        </Provider>)).not.toBeNull()
    })
  })
  describe('image tests', () => {
    test('image should appear in document', () => {
      expect(render(
        <Provider store={store}>
          <SnackbarProvider>
            <I18nextProvider i18n={i18n}>
              <HomeMap />
            </I18nextProvider>
          </SnackbarProvider>
        </Provider>).getByTestId('image-id')).toBeInTheDocument()
    })
  })
  describe('map state tests', () => {
    test('should add sensor to state', () => {
      const { queryByTestId, queryAllByTestId } = render(
        <Provider store={store}>
          <SnackbarProvider>
            <I18nextProvider i18n={i18n}>
              <HomeMap />
            </I18nextProvider>
          </SnackbarProvider>
        </Provider>)
      const sensorsAmount = queryAllByTestId('sensor-id').length

      fireEvent.click(queryByTestId('image-id'), {
        nativeEvent: {
          offsetX: 1000,
          offsetY: 1000
        }
      })

      expect(queryAllByTestId('sensor-id').length).toBe(sensorsAmount)
    })
  })
})
