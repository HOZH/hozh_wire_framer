/* eslint-disable no-underscore-dangle */
import React from 'react';
import ReactDOM from 'react-dom';
import './css/fonts/Lexend Exa/css.css';
import './css/todo_layout.css'
import './css/todo_style.css'
import './css/item_card.css'
import './css/my.css'

import ReactReduxFirebaseApp from './store/ReactReduxFirebaseApp'

ReactDOM.render(
  <ReactReduxFirebaseApp />, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();