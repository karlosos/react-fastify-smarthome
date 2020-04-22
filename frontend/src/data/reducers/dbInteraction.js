import actionTypes from '@constants/actionTypes'

const initialState = {
  _id: 0,
  type: 'None',
  mapPosition: undefined,
  addingPoint: false,
  addError: undefined,
  removeError: undefined,
  addErrorPoints: [],
  removeErrorPoints: []
}

const addPointStart = (state, action) => {
  return {
    ...state,
    _id: action._id,
    type: action.sensorType,
    mapPosition: action.mapPosition,
    addingPoint: true,
    addError: undefined,
    addErrorPoints: Array.from(new Set([...state.addErrorPoints, action._id]))
  }
}

const addPointSuccess = (state, action) => {
  return {
    ...state,
    _id: action._id,
    type: action.sensorType,
    mapPosition: action.mapPosition,
    addingPoint: false,
    addError: undefined,
    addErrorPoints: [...state.addErrorPoints.filter(p => p !== action._id)]
  }
}

const addPointFail = (state, action) => {
  return {
    ...state,
    _id: action._id,
    type: 'None',
    mapPosition: undefined,
    addingPoint: false,
    addError: action.error,
    addErrorPoints: [...state.addErrorPoints]
  }
}

const updateAddErrorPoints = (state, action) => {
  return {
    ...state,
    addErrorPoints: [...state.addErrorPoints.filter(p => p !== action._id)]
  }
}

const removePointStart = (state, action) => {
  return {
    ...state,
    _id: action._id,
    type: undefined,
    mapPosition: undefined,
    addingPoint: false,
    removeError: undefined,
    removeErrorPoints: Array.from(new Set([...state.removeErrorPoints, action._id]))
  }
}

const removePointSuccess = (state, action) => {
  return {
    ...state,
    _id: action._id,
    type: undefined,
    mapPosition: undefined,
    addingPoint: false,
    removeError: undefined,
    removeErrorPoints: [...state.removeErrorPoints.filter(p => p !== action._id)]
  }
}

const removePointFail = (state, action) => {
  return {
    ...state,
    _id: action._id,
    type: 'None',
    mapPosition: undefined,
    addingPoint: false,
    removeError: action.error,
    removeErrorPoints: [...state.removeErrorPoints]
  }
}

const updateRemoveErrorPoints = (state, action) => {
  return {
    ...state,
    removeErrorPoints: [...state.removeErrorPoints.filter(p => p !== action._id)]
  }
}

export default function dbInteraction (state = initialState, action) {
  switch (action.type) {
    case actionTypes.DB_ADD_POINT_START:
      return addPointStart(state, action)
    case actionTypes.DB_ADD_POINT_SUCCESS:
      return addPointSuccess(state, action)
    case actionTypes.DB_ADD_POINT_FAIL:
      return addPointFail(state, action)
    case actionTypes.DB_UPDATE_ADD_ERROR_POINTS:
      return updateAddErrorPoints(state, action)
    case actionTypes.DB_REMOVE_POINT_START:
      return removePointStart(state, action)
    case actionTypes.DB_REMOVE_POINT_SUCCESS:
      return removePointSuccess(state, action)
    case actionTypes.DB_REMOVE_POINT_FAIL:
      return removePointFail(state, action)
    case actionTypes.DB_UPDATE_REMOVE_ERROR_POINTS:
      return updateRemoveErrorPoints(state, action)
    default:
      return state
  }
}
