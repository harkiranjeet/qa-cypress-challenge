import axios from 'axios';

export const GET_MEDIAN = 'GET_MEDIAN';
export const GET_MEDIAN_FAILED = 'GET_MEDIAN_FAILED';

export function getMedian(n) {
  var request = axios.get(`/api/${n}`);

  return function(dispatch) {
    request.then(
      result => {
        if (result.data.error) { // Check if there's an error
          dispatch({
            type: GET_MEDIAN_FAILED,
            payload: result.data.error // Payload contains error message
          });
        } else {
          dispatch({
            type: GET_MEDIAN,
            payload: result.data.median // Payload contains median array
          });
        }
      }
    );
  }
}