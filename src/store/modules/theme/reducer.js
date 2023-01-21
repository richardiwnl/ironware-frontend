import * as types from '../types';

const initialState = {
  theme: 'dark',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SWITCH_THEME: {
      const newState = { ...state };

      if (newState.theme === 'dark') {
        newState.theme = 'light';
      } else {
        newState.theme = 'dark';
      }
      return newState;
    }
    default: {
      return state;
    }
  }
};
