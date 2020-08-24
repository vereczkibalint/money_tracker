import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

import { setAuthToken } from './services/authService';

const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk)
);

window.store = store;

let currentState = store.getState();

store.subscribe(() => {
  let previousState = currentState;
  currentState = store.getState();
  if (previousState.auth.token !== currentState.auth.token) {
    const token = currentState.auth.token;
    setAuthToken(token);
  }
});

export default store;