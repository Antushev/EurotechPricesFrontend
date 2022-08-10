import {NameSpace} from '../name-space.js';

const getScreenActive = (state) => {
  return state[NameSpace.APP_STATE].currentPageApp;
};

export {getScreenActive};
