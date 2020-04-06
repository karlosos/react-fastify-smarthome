import actionTypes from '@constants/actionTypes'

const initialState = {
  listItemPressed: false,
  pressedItemId: undefined,
  waitingForSensorLocation: false,
  sensorColor: undefined,
  sensorData: undefined
}

export default function mapListCommunication (state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.LIST_CLICKED:
      return {
        ...state,
        listItemPressed: true,
        waitingForSensorLocation: true,
        pressedItemId: action.id,
        sensorColor: action.sensorColor,
        sensorData: action.sensorData
      }
    case actionTypes.MAP_CLICKED:
      return {
        ...state,
        listItemPressed: false,
        waitingForSensorLocation: false,
        pressedItemId: undefined,
        sensorColor: undefined,
        sensorData: action.sensorData
      }
    default:
      return state
  }
}
