import { combineReducers } from 'redux';
import getMedianReducer from './get_median_reducer';
import errorReducer from './error_reducer';

const rootReducer = combineReducers({
  median: getMedianReducer,
  error: errorReducer
});

export default rootReducer;
