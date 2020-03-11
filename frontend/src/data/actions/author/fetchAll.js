import actionTypes from '@constants/actionTypes';

/**
 * Returns action that requests for fetching all authors.
 * 
 * @returns Action for author reducer.
 */
export function fetchAuthorsRequest () {
  return {
    type: actionTypes.FETCH_AUTHORS_REQUEST
  }
}

/**
 * Returns action that contains successfully fetched authors.
 * 
 * @param authors List of fetched authors.
 * @returns Action for author reducer containing fetched authors.
 */
export function fetchAuthorsSuccess (authors) {
  return {
    type: actionTypes.FETCH_AUTHORS_SUCCESS,
    authors
  }
}

/**
 * Returns action that contains error occured during fetching.
 * 
 * @param error Error that occured during fetching authors.
 * @returns Action with error for author reducers.
 */
export function fetchAuthorsError (error) {
  return {
    type: actionTypes.FETCH_AUTHORS_ERROR,
    error
  }
}

/**
 * Returns action that cancels pending author fetching.
 * 
 * @returns Action for author reducer.
 */
export function fetchAuthorsCancel () {
  return {
    type: actionTypes.FETCH_AUTHORS_CANCEL
  }
}
