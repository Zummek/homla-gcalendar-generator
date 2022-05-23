import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';
// import rootSaga from '@/store/rootSaga';

// const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
    // sagaMiddleware,
  ],
  ...composeWithDevTools(applyMiddleware(thunk))
});

export const persistor = persistStore(store);

// sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const dispatch = store.dispatch;

export default store;
