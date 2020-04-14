import actionTypes from '@constants/actionTypes'

const initialState = {
  listItemPressed: false,
  mapPointPressed: false,
  pressedItemId: undefined,
  waitingForSensorLocation: false,
  sensorColor: undefined,
  sensorBorderColor: undefined,
  sensorData: undefined
}

const listClicked = (state, action) => {
  return {
    ...state,
    listItemPressed: true,
    mapPointPressed: false,
    waitingForSensorLocation: true,
    pressedItemId: action.id,
    sensorColor: action.sensorColor,
    sensorBorderColor: undefined,
    sensorData: action.sensorData
  }
}

const mapClicked = (state, action) => {
  return {
    ...state,
    listItemPressed: false,
    mapPointPressed: false,
    waitingForSensorLocation: false,
    pressedItemId: undefined,
    sensorColor: undefined,
    sensorBorderColor: undefined,
    sensorData: action.sensorData
  }
}

const pointClicked = (state, action) => {
  return {
    ...state,
    listItemPressed: false,
    mapPointPressed: true,
    waitingForSensorLocation: false,
    pressedItemId: action.id,
    sensorBorderColor: action.sensorBorderColor
  }
}

export default function mapListCommunication (state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.LIST_CLICKED:
      return listClicked(state, action)
    case actionTypes.MAP_CLICKED:
      return mapClicked(state, action)
    case actionTypes.POINT_CLICKED:
      return pointClicked(state, action)
    default:
      return state
  }
}
