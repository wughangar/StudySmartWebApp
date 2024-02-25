import {combineReducers, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import users from './users';
import app from './app';
import topics from "./topics";

const rootReducer = combineReducers({
                                        app,
                                        users,
                                        topics,
                                    });

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store     = createStore(persistedReducer);
export const persistor = persistStore(store);
