import {NameSpace} from './../name-space.js';

const getFirms = (state) => {
  return state[NameSpace.FIRMS].firms;
}

const getCurrentFirmPopup = (state) => {
  return state[NameSpace.FIRMS].currentFirmPopup;
}

const getIsLoadingFirm = (state) => {
  return state[NameSpace.FIRMS].isLoadingFirm;
}

export {
  getFirms,
  getCurrentFirmPopup,
  getIsLoadingFirm
};
