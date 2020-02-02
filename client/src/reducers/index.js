import { combineReducers } from 'redux';
import LogReducer from './LogReducer';
import techReducer from './techReducer';

export default combineReducers({
  log: LogReducer,
  tech: techReducer
});
