import { get } from 'lodash';
import { all, takeLatest } from 'redux-saga/effects';

import * as types from '../types';

import axios from '../../../services/axios';

function persistRehydrate({ payload }) {
  const token = get(payload, 'auth.token', '');

  if (!token) return;

  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

export default all([takeLatest(types.PERSIST_REHYDRATE, persistRehydrate)]);
