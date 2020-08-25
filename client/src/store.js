import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

import { setAuthToken } from './services/authService';

const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

// localhost debugoláshoz
// élesben ki kell szedni
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