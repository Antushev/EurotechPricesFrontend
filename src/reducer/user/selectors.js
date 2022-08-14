import {NameSpace} from '../name-space.js';

const getUser = (state) => {
  return state[NameSpace.USER].user;
}

const getAuthorizationStatus = (state) => {
  return state[NameSpace.USER].authorizationStatus;
}

const getIsErrorLogin = (state) => {
  return state[NameSpace.USER].isErrorLogin;
}

export {getUser, getAuthorizationStatus, getIsErrorLogin};
