import {AuthorizationStatus} from '../../utils/const.js';

const initialState = {
  user: {},
  authorizationStatus: AuthorizationStatus.AUTH,
  isErrorLogin: false
}

const ActionType = {
  SET_AUTHORIZATION_USER: 'SET_AUTHORIZATION_USER',
  SET_AUTHORIZATION_STATUS: 'SET_AUTHORIZATION_STATUS',
  SET_IS_ERROR_LOGIN: 'SET_IS_ERROR_LOGIN'
}

const ActionCreator = {
  setAuthorizationUser(user) {
    return {
      type: ActionType.SET_AUTHORIZATION_USER,
      payload: user
    }
  },

  setAuthorizationStatus(authorizationStatus) {
    return {
      type: ActionType.SET_AUTHORIZATION_STATUS,
      payload: authorizationStatus
    }
  },

  setIsErrorLogin(isErrorLogin) {
    return {
      type: ActionType.SET_IS_ERROR_LOGIN,
      payload: isErrorLogin
    }
  }
}

const Operation = {
  getUserInfo: (idUser) => (dispatch, getState, api) => {
    return api.post(`/user`, {
      idUser: idUser
    })
      .then((response) => {
        const user = response.data;

        dispatch(ActionCreator.setAuthorizationUser(user));
      })
      .catch((error) => {
        throw error;
      });
  },

  loginUser: (login, password) => (dispatch, getState, api) => {
    return api.post('/login', {
      login: login,
      password: password
    })
      .then((response) => {
        const user = response.data;

        if (user) {
          dispatch(ActionCreator.setIsErrorLogin(false));
          dispatch(ActionCreator.setAuthorizationUser(user));
          dispatch(ActionCreator.setAuthorizationStatus(AuthorizationStatus.AUTH));
          localStorage.setItem('authorizationStatus', AuthorizationStatus.AUTH);
          localStorage.setItem('idUser', user.id);
        } else {
          dispatch(ActionCreator.setIsErrorLogin(true));
          dispatch(ActionCreator.setAuthorizationStatus(AuthorizationStatus.NO_AUTH));
          localStorage.setItem('authorizationStatus', AuthorizationStatus.NO_AUTH);
        }
      })
      .catch((error) => {
        throw error;
      })
  },
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_AUTHORIZATION_USER:
      return Object.assign({}, state, {
        user: action.payload
      })
    case ActionType.SET_AUTHORIZATION_STATUS:
      return Object.assign({}, state, {
        authorizationStatus: action.payload
      })
    case ActionType.SET_IS_ERROR_LOGIN:
      return Object.assign({}, state, {
        isErrorLogin: action.payload
      })
  }

  return state;
}

export {reducer, ActionCreator, Operation};
