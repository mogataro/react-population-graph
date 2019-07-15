import { combineReducers } from 'redux';
import calculator from './calculator';
import prefectures from './prefectures';

const reducer = combineReducers({
  calculator,
  prefectures
});
export default reducer;