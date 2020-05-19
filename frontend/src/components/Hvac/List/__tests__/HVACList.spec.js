import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import HVACList from '../HVACList.jsx'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../../../i18n'

import { Provider } from 'react-redux'

import configureStore from 'redux-mock-store'
const mockStore = configureStore([])

describe('<HVACList />', () => {
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

  it('should render <HVACList />', () => {
    const { queryByTestId } = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <HVACList />
        </I18nextProvider>
      </Provider>
    )

    expect(queryByTestId('HVACList')).toBeTruthy()
  })

  it('should render empty state when no HVACRooms', () => {
    initialStore = {
      sensor: {
        sensors: {
          temperatureSensors: [{ id: 2 }],
          windowSensors: [{ id: 3 }, { id: 4 }]
        },
        HVACRooms: []
      }
    }
    store = mockStore(initialStore)
    const { queryByTestId } = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <HVACList />
        </I18nextProvider>
      </Provider>
    )

    expect(queryByTestId('emptyState')).toBeTruthy()
  })

  it('should render <HVACList /> with one item', () => {
    const { queryByTestId } = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <HVACList />
        </I18nextProvider>
      </Provider>
    )

    expect(queryByTestId('HVACList').childElementCount).toBe(1)
    expect(queryByTestId('show-more-button')).toBeFalsy()
  })

  it('should render show more button when more than 10 elements in HVACRooms list', () => {
    const createRoom = (id) => {
      return ({
        id: id,
        type: 'HVACRoom',
        heatingTemperature: 200,
        coolingTemperature: 300,
        hysteresis: 5,
        temperatureSensorId: 2,
        windowSensorIds: [3, 4]
      })
    }

    const numberOfElements = 15
    initialStore = {
      sensor: {
        sensors: {
          temperatureSensors: [{ id: 2 }],
          windowSensors: [{ id: 3 }, { id: 4 }]
        },
        HVACRooms: [...Array(numberOfElements).keys()].map(i => createRoom(i))
      }
    }
    store = mockStore(initialStore)

    const { queryByTestId } = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <HVACList />
        </I18nextProvider>
      </Provider>
    )

    // 11 because 10 rules and 1 button
    expect(queryByTestId('HVACList').childElementCount).toBe(11)
    expect(queryByTestId('show-more-button')).toBeTruthy()
  })

  it('should load more items on show more button clicked and hide button', () => {
    const createRoom = (id) => {
      return ({
        id: id,
        type: 'HVACRoom',
        heatingTemperature: 200,
        coolingTemperature: 300,
        hysteresis: 5,
        temperatureSensorId: 2,
        windowSensorIds: [3, 4]
      })
    }

    const numberOfElements = 15
    initialStore = {
      sensor: {
        sensors: {
          temperatureSensors: [{ id: 2 }],
          windowSensors: [{ id: 3 }, { id: 4 }]
        },
        HVACRooms: [...Array(numberOfElements).keys()].map(i => createRoom(i))
      }
    }
    store = mockStore(initialStore)

    const { queryByTestId } = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <HVACList />
        </I18nextProvider>
      </Provider>
    )

    // 11 because 10 rules and 1 button
    expect(queryByTestId('HVACList').childElementCount).toBe(11)
    expect(queryByTestId('show-more-button')).toBeTruthy()

    fireEvent.click(queryByTestId('show-more-button'))
    expect(queryByTestId('HVACList').childElementCount).toBe(numberOfElements)
    expect(queryByTestId('show-more-button')).toBeFalsy()
  })

  it('should render <HVACList /> with rules referencing to not existing temperature sensor', () => {
    const initialStore = {
      sensor: {
        sensors: {
          temperatureSensors: [{ id: 999 }],
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
    store = mockStore(initialStore)

    const { queryByTestId } = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <HVACList />
        </I18nextProvider>
      </Provider>
    )

    expect(queryByTestId('HVACList').childElementCount).toBe(1)
    expect(queryByTestId('show-more-button')).toBeFalsy()
  })

  it('should render <HVACList /> with rules referencing to not existing window sensor', () => {
    const initialStore = {
      sensor: {
        sensors: {
          temperatureSensors: [{ id: 2 }],
          windowSensors: [{ id: 999 }, { id: 998 }]
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
    store = mockStore(initialStore)

    const { queryByTestId } = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <HVACList />
        </I18nextProvider>
      </Provider>
    )

    expect(queryByTestId('HVACList').childElementCount).toBe(1)
    expect(queryByTestId('show-more-button')).toBeFalsy()
  })

  it('should render <HVACList /> with rules referencing to empty temperature sensor list', () => {
    const initialStore = {
      sensor: {
        sensors: {
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
    store = mockStore(initialStore)

    const { queryByTestId } = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <HVACList />
        </I18nextProvider>
      </Provider>
    )

    expect(queryByTestId('HVACList').childElementCount).toBe(1)
    expect(queryByTestId('show-more-button')).toBeFalsy()
  })

  it('should render <HVACList /> with rules referencing to empty window sensors list', () => {
    const initialStore = {
      sensor: {
        sensors: {
          temperatureSensors: [{ id: 2 }]
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
    store = mockStore(initialStore)

    const { queryByTestId } = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <HVACList />
        </I18nextProvider>
      </Provider>
    )

    expect(queryByTestId('HVACList').childElementCount).toBe(1)
    expect(queryByTestId('show-more-button')).toBeFalsy()
  })
})
