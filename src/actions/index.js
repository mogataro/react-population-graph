import * as actionTypes from '../utils/actionTypes';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;
const RESAS_ENDPOINT = 'https://opendata.resas-portal.go.jp/api';

export const onNumClick = (number) => ({
  type: actionTypes.INPUT_NUMBER,
  number,
});
export const onPlusClick = () => ({
  type: actionTypes.PLUS,
});
export const onMinusClick = () => ({
  type: actionTypes.MINUS,
});
export const onClearClick = () => ({
  type: actionTypes.CLEAR,
  resultValue: 0,
});



export const fetchPrefectures = () => async (dispatch) => {
  const { data } = await axios.get(RESAS_ENDPOINT + '/v1/prefectures', {
    headers: {
      'X-API-KEY': API_KEY
    }
  })
  dispatch({
    type: actionTypes.Fetch_Prefectures,
    payload: data.result
  })
}

export const updatePrefCodes = (newPrefCodes) => ({
  type: actionTypes.Update_PrefCodes,
  payload: newPrefCodes
})