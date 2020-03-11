import actionTypes from '@constants/actionTypes';

const initialState = {
  authors: [],
  author: undefined,
  fetchError: undefined,
  fetching: false,
  fetchingSingle: false,
  fetchSingleError: undefined
};

export default function author (state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.FETCH_AUTHORS_REQUEST:
      return { ...state, fetching: true, fetchError: undefined }
    case actionTypes.FETCH_AUTHORS_SUCCESS:
      return { ...state, fetching: false, authors: action.authors }
    case actionTypes.FETCH_AUTHORS_ERROR:
      return { ...state, fetching: false, fetchError: action.error }
    case actionTypes.FETCH_AUTHORS_CANCEL:
      return { ...state, fetching: false, fetchError: undefined }
    default:
      return state
  }
}
