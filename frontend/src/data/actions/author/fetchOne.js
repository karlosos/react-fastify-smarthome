import actionTypes from '@constants/actionTypes'

/**
 * Returns action that requests for fetching one author.
 *
 * @param { string | number } id Id of an author to fetch.
 * @returns Action for author reducer.
 */
export function fetchAuthorRequest (id) {
  return {
    type: actionTypes.FETCH_AUTHOR_REQUEST,
    id
  }
}

/**
 * Returns action that contains successfully fetched author.
 *
 * @param authors Fetched author.
 * @returns Action for author reducer containing fetched author.
 */
export function fetchAuthorSuccess (author) {
  return {
    type: actionTypes.FETCH_AUTHOR_SUCCESS,
    author
  }
}

/**
 * Returns action that contains error occured during fetching.
 *
 * @param error Error that occured during fetching author.
 * @returns Action with error for author reducers.
 */
export function fetchAuthorError (error) {
  return {
    type: actionTypes.FETCH_AUTHOR_ERROR,
    error
  }
}

/**
 * Returns action that cancels pending author fetching.
 *
 * @returns Action for author reducer.
 */
export function fetchAuthorCancel () {
  return {
    type: actionTypes.FETCH_AUTHOR_CANCEL
  }
}
