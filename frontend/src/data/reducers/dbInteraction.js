import actionTypes from '@constants/actionTypes'

const initialState = {
  _id: 0,
  type: 'None',
  mapPosition: undefined,
  addingPoint: false,
  addError: undefined,
  removeError: undefined
}

const addPointStart = (state, action) => {
  return {
    ...state,
    _id: action._id,
    type: action.sensorType,
    mapPosition: action.mapPosition,
    addingPoint: true,
    addError: undefined
  }
}

const addPointSucces = (state, action) => {
  return {
    ...state,
    _id: action._id,
    type: action.sensorType,
    mapPosition: action.mapPosition,
    addingPoint: false,
    addError: undefined
  }
}

const addPointFail = (state, action) => {
  return {
    ...state,
    _id: action._id,
    type: 'None',
    mapPosition: undefined,
    addingPoint: false,
    addError: action.error
  }
}

const removePointStart = (state, action) => {
  return {
    ...state,
    _id: action._id,
    type: undefined,
    mapPosition: undefined,
    addingPoint: false,
    removeError: undefined
  }
}

const removePointSuccess = (state, action) => {
  return {
    ...state,
    _id: action._id,
    type: undefined,
    mapPosition: undefined,
    addingPoint: false,
    removeError: undefined
  }
}

const removePointFail = (state, action) => {
  return {
    ...state,
    _id: action._id,
    type: 'None',
    mapPosition: undefined,
    addingPoint: false,
    removeError: action.error
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
    case actionTypes.DB_REMOVE_POINT_START:
      return removePointStart(state, action)
    case actionTypes.DB_REMOVE_POINT_SUCCESS:
      return removePointSuccess(state, action)
    case actionTypes.DB_REMOVE_POINT_FAIL:
      return removePointFail(state, action)
    default:
      return state
  }
}
