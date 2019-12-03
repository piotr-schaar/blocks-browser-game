import { createStore, applyMiddleware, combineReducers } from 'redux';

import thunk from 'redux-thunk';

import BlocksReducer from './blocks/Blocks.reducer';

const middlewares = [thunk];

const rootReducer = combineReducers({ BlocksReducer });

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
