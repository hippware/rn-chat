import { compose, createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger'
import reducer from './reducers/root';
import { persistStore, autoRehydrate } from 'redux-persist'
const loggerMiddleware = createLogger();
import {PERSIST, DEBUG} from './globals';
const createStoreWithMiddleware = DEBUG ? applyMiddleware(loggerMiddleware)(createStore) : createStore;
import { createEffectCapableStore } from 'redux-side-effects';

const createPersistStore = PERSIST ? compose(autoRehydrate())(createStoreWithMiddleware) : createStoreWithMiddleware;

const createEffectStoreWithMiddleware = createEffectCapableStore(createPersistStore);
export default createEffectStoreWithMiddleware(reducer);
