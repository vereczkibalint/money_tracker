import React, { useEffect } from 'react';
import './App.css';
import axios from 'axios';

import store from './store';
window.store = store;

const App = () => {
  useEffect(() => {
    axios.post('/api/auth', {
	      email: 'vereczkibalint@gmail.com', 
        password: 'asdasda'
        }, 
        {
          headers: {
              'Content-Type': 'application/json; charset=UTF-8'
          }
        })
        .then(response => { 
          console.log(response)
        })
        .catch(error => {
            console.log(error.response)
        });
  }, []);
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
