import { compose, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas'
const sagaMiddleware = createSagaMiddleware(rootSaga);
import createLogger from 'redux-logger'
import reducer from './reducers/root';
import { persistStore, autoRehydrate } from 'redux-persist'
const loggerMiddleware = createLogger();
import {PERSIST, DEBUG} from './globals';
const createStoreWithMiddleware = DEBUG ? applyMiddleware(sagaMiddleware, loggerMiddleware)(createStore) : applyMiddleware(sagaMiddleware)(createStore);

export default PERSIST ? compose(autoRehydrate())(createStoreWithMiddleware)(reducer) : createStoreWithMiddleware(reducer);
