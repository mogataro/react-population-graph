import * as actionTypes from '../utils/actionTypes';

const initialState = {
  prefectures: [],
  prefCodes: []
};

const prefectures = (state = initialState, action) => {
  if (action.type === actionTypes.Fetch_Prefectures) {
    return {
      ...state,
      prefectures: action.payload
    };
  } else if (action.type === actionTypes.Update_PrefCodes) {
    const array = state.prefCodes
    array.push(action.payload)
    return {
      ...state,
      prefCodes: array
    }
  } else {
    return state;
  }
};

export default prefectures;