import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';

import createSagaMiddleware from 'redux-saga';
import usersReducer from './ducks/users';
import watcherSaga from './sagas/rootSaga';

const reducer = combineReducers({
	data: usersReducer,
});

const sagaMiddleWares = createSagaMiddleware();

const middleWares = [sagaMiddleWares];

if (process.env.NODE_ENV === 'development') {
	middleWares.push(logger);
}

const store = createStore(reducer, applyMiddleware(...middleWares));

sagaMiddleWares.run(watcherSaga);

export default store;
