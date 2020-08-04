import React, { useEffect } from 'react';
import './App.css';
import axios from 'axios';

import store from './store';
window.store = store;

const App = () => {
  return (
    <div className="App">
      Hello World
    </div>
  );
}

export default App;
