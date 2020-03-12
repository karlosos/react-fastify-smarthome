import actionTypes from '@constants/actionTypes';

const initialState = {
  authors: [],
  author: undefined,
  fetchError: undefined,
  fetching: false,
  author: undefined,
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
