import { GET_MEDIAN } from '../actions';
import { GET_MEDIAN_FAILED } from '../actions';

export default function(initialState = [], action) {
  switch(action.type) {
    case GET_MEDIAN:
      return action.payload;
    case GET_MEDIAN_FAILED:
      return [];
    default:
      return initialState;
  }
}
