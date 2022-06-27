import { createStore, applyMiddleware } from 'redux';
import Logger from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import RootReducer from './reducers';

const persistConfig = {
    key: 'root',
    storage,
}
let middlewares = [Logger]
const persistedReducer = persistReducer(persistConfig, RootReducer)
const store = createStore(persistedReducer, applyMiddleware(...middlewares))
let persistor = persistStore(store)

export { store, persistor }