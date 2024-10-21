import { configureStore } from '@reduxjs/toolkit'
import { persistStore } from 'redux-persist'
import rootReducer from './reducer/rootReducer';

export const store = configureStore({
    reducer: rootReducer
})

export const persistor = persistStore(store)