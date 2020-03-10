import { combineReducers } from 'redux';

// This is the place for future reducers to combine them all
import home from '../../data/reducers/homeReducer.js';
import author from '@data/reducers/author.js';

export default combineReducers({
  home,
  author
})
