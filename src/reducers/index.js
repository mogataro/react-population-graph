import { combineReducers } from 'redux';
import calculator from './calculator';
import graphs from './graphs';

const reducer = combineReducers({
  calculator,
  graphs
});
export default reducer;