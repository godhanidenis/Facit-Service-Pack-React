import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';

import createSagaMiddleware from 'redux-saga';
import teamReducer from './ducks/teams';
import usersReducer from './ducks/users';
import watcherSaga from './sagas/rootSaga';

const reducer = combineReducers({
	users: usersReducer,
	teams: teamReducer,
});

const sagaMiddleWares = createSagaMiddleware();

const middleWares = [sagaMiddleWares];

if (process.env.NODE_ENV === 'development') {
	middleWares.push(logger);
}

const store = createStore(reducer, applyMiddleware(...middleWares));

sagaMiddleWares.run(watcherSaga);

export default store;
