import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducers = persistReducer(
    {
      key: 'IRONWARE',
      storage,
      whitelist: ['theme'],
    },
    reducers
  );

  return persistedReducers;
};
