import { configureStore } from '@reduxjs/toolkit'
import thunk, { ThunkDispatch } from "redux-thunk";
import { rootReducers } from './rootReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['authReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducers);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})

export const persistor = persistStore(store);
