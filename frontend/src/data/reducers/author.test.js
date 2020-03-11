import author from './author';
import actionTypes from '@constants/actionTypes';

describe('author reducer test suite', () => {
  const initialStateAuthor = {
    authors: [],
    author: undefined,
    fetchError: undefined,
    fetching: false,
    fetchingSingle: false,
    fetchSingleError: undefined
  };

  describe('initial state', () => {
    it('should return initial state when no action is given', () => {
      expect(author()).toEqual(initialStateAuthor);
    });
  });

  describe('handling incoming actions', () => {
    it('fetch authors request should set loading and reset error on request action', () => {
      expect(author({
        ...initialStateAuthor,
        fetchError: new Error('fake error'),
      }, {
        type: actionTypes.FETCH_AUTHORS_REQUEST,
      })).toEqual({
        ...initialStateAuthor,
        fetching: true,
        fetchError: undefined
      });
    });
  
    it('fetch authors cancel should reset loading and reset error on cancel action', () => {
      expect(author({
        ...initialStateAuthor,
        fetchError: new Error('fake error'),
        fetching: true,
      }, {
        type: actionTypes.FETCH_AUTHORS_CANCEL,
      })).toEqual({
        ...initialStateAuthor,
        fetching: false,
        fetchError: undefined
      });
    });
  
    it('fetch authors success should set authors and reset loading', () => {
      expect(author({
        ...initialStateAuthor,
        fetching: true,
      }, {
        type: actionTypes.FETCH_AUTHORS_SUCCESS,
        authors: { authors: [{ name: 'Fake' }] },
      })).toEqual({
        ...initialStateAuthor,
        fetching: false,
        authors: { authors: [{ name: 'Fake' }] },
      });
    });
  
    it('fetch authors error should set error and reset loading', () => {
      expect(author({
        ...initialStateAuthor,
        fetching: true,
      }, {
        type: actionTypes.FETCH_AUTHORS_ERROR,
        error: new Error('fake error'),
      })).toEqual({
        ...initialStateAuthor,
        fetching: false,
        fetchError: new Error('fake error')
      });
    });
  });
});
