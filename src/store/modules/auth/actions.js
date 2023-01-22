import * as types from '../types';

export function loginRequest() {
  return {
    type: types.LOGIN_REQUEST,
  };
}

export function loginSuccess(payload) {
  return {
    type: types.LOGIN_SUCCESS,
    payload,
  };
}

export function loginFailure() {
  return {
    type: types.LOGIN_FAILURE,
  };
}
