import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';

import createSagaMiddleware from 'redux-saga';
import lobReducer from './ducks/lobs';
import locationReducer from './ducks/locations';
import teamLeadReducer from './ducks/teamLeads';
import teamReducer from './ducks/teams';
import usersReducer from './ducks/users';
import watcherSaga from './sagas/rootSaga';

const reducer = combineReducers({
	users: usersReducer,
	teams: teamReducer,
	locations: locationReducer,
	teamLeads: teamLeadReducer,
	lobs: lobReducer,
});

const sagaMiddleWares = createSagaMiddleware();

const middleWares = [sagaMiddleWares];

if (process.env.NODE_ENV === 'development') {
	middleWares.push(logger);
}

const store = createStore(reducer, applyMiddleware(...middleWares));

sagaMiddleWares.run(watcherSaga);

export default store;
