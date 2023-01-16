import { all } from 'redux-saga/effects';

import example from './example/sagas';

export default function* rootSaga() {
  yield all([example]);
}
