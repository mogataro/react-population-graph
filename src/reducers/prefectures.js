import * as actionTypes from '../utils/actionTypes';

const initialState = {
  prefectures: ['ccc']
};

const prefectures = (state = initialState, action) => {
  if (action.type === actionTypes.Fetch_Prefectures) {
    console.log('bbb')
    console.log(action.payload)
    return {
      prefectures: action.payload
    };
  } else {
    return state;
  }
};

export default prefectures;