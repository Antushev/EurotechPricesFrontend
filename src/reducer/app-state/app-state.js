import {TypeScreen} from '../../utils/const';

const initialState = {
  currentPageApp: TypeScreen.MAIN_PAGE
}

const ActionType = {
  CHANGE_SCREEN: 'CHANGE_SCREEN'
}

const ActionCreator = {
  changeScreen(typeScreen) {
    return {
      type: 'CHANGE_SCREEN',
      payload: typeScreen
    }
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_SCREEN:
      return Object.assign({}, state, {
        currentPageApp: action.payload
      });
  }

  return state;
}

export {reducer, ActionCreator, ActionType};
