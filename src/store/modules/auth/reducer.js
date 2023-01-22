import * as types from '../types';

const initialState = {
  isLoggedIn: false,
  isLoading: false,
  token: '',
  user: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_REQUEST: {
      const newState = { ...state };
      newState.isLoading = true;
      return newState;
    }
    case types.LOGIN_FAILURE: {
      const newState = { ...state };
      newState.isLoading = false;
      return newState;
    }
    case types.LOGIN_SUCCESS: {
      const newState = { ...state };
      newState.isLoggedIn = true;
      newState.isLoading = false;
      newState.user = action.payload.user;
      newState.token = action.payload.token;
      return newState;
    }
    default: {
      return state;
    }
  }
};
