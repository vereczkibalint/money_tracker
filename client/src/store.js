import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducers';

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

console.log(store.getState());
window.store = store;

export default store;