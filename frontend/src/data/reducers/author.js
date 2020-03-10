import actionTypes from '@constants/actionTypes';

const initialState = {
  author: undefined,
  fetchingSingle: false,
  fetchSingleError: undefined
};

export default function author (state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_AUTHOR_REQUEST:
      return { ...state, fetchingSingle: true, fetchSingleError: undefined }
    case actionTypes.FETCH_AUTHOR_SUCCESS:
      return { ...state, fetchingSingle: false, author: action.author }
    case actionTypes.FETCH_AUTHOR_ERROR:
      return { ...state, fetchingSingle: false, fetchingSingleError: action.error }
    case actionTypes.FETCH_AUTHOR_CANCEL:
      return { ...state, fetchingSingleError: false, fetchSingleError: undefined }
    default:
      return state
  }
}
