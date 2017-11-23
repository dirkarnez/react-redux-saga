import "babel-polyfill"
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Counter from './Counter'
import store from './store';

store.subscribe(() => {
  console.log(`subscribe ${store.getState()}`);
});

ReactDOM.render(
  <Provider store={store}>
    <Counter/>
  </Provider>
, document.getElementById('root'));
