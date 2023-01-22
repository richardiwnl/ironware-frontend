import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducers = persistReducer(
    {
      key: 'IRONWARE',
      storage,
      whitelist: ['auth', 'theme'],
    },
    reducers
  );

  return persistedReducers;
};
