import {combineReducers} from 'redux';
import {reducer as appState} from './app-state/app-state.js';
import {reducer as data} from './data/data.js';
import {reducer as user} from './user/user.js';
import {NameSpace} from './name-space.js';

export default combineReducers({
  [NameSpace.APP_STATE]: appState,
  [NameSpace.DATA]: data,
  [NameSpace.USER]: user
});
