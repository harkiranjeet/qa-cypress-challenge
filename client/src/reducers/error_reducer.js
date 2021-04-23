import { GET_MEDIAN_FAILED } from '../actions';

export default function(initalState = null, action) {
  switch(action.type) {
    case GET_MEDIAN_FAILED:
      return action.payload;
    default:
      return initalState;
  }
}