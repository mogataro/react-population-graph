import * as actionTypes from '../utils/actionTypes';

const initialState = {
  selected: Array(47).fill(false),
  prefectures: [],
  series: []
};

const graphs = (state = initialState, action) => {
  let result = {...state}
  switch (action.type) {
    case actionTypes.Fetch_Prefectures:
      result = {
        ...state,
        prefectures: action.payload
      }
      break
    case actionTypes.Update_Selected:
      const index = action.payload
      let new_selected = state.selected.slice()
      new_selected[index] = !new_selected[index];
      result = {
        ...state,
        selected: new_selected
      }
      break
  }
  return result
  // if (action.type === actionTypes.Fetch_Prefectures) {
  //   return {
  //     ...state,
  //     prefectures: action.payload
  //   };
  // } else {
  //   return state;
  // }
};

export default graphs;