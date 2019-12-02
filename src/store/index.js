import { createStore, applyMiddleware, combineReducers } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import BlocksReducer from './blocks/Blocks.reducer';

const middlewares = [thunk];

const rootReducer = combineReducers({ BlocksReducer });

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;
