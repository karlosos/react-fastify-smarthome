import actionTypes from '@constants/actionTypes'

const initialState = {
  _id: 0,
  type: 'None',
  mapPosition: undefined,
  addingPoint: false,
  dbError: undefined
}

const addPointStart = (state, action) => {
  return {
    ...state,
    _id: action.id,
    type: action.sensorType,
    mapPosition: action.mapPosition,
    addingPoint: true,
    dbError: undefined
  }
}

const addPointSucces = (state, action) => {
  return {
    ...state,
    _id: action._id,
    type: action.sensorType,
    mapPosition: action.mapPosition,
    addingPoint: false,
    dbError: undefined
  }
}

const addPointFail = (state, action) => {
  return {
    ...state,
    _id: action._id,
    type: 'None',
    mapPosition: undefined,
    addingPoint: false,
    dbError: action.error
  }
}

export default function dbInteraction (state = initialState, action) {
  switch (action.type) {
    case actionTypes.DB_ADD_POINT_START:
      return addPointStart(state, action)
    case actionTypes.DB_ADD_POINT_SUCCESS:
      return addPointSucces(state, action)
    case actionTypes.DB_ADD_POINT_FAIL:
      return addPointFail(state, action)
    default:
      return state
  }
}
