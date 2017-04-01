'use strict'
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux';
import Notes from './container/app.js'
import rootReducer from './reducer/reducer.js';

let loggerMiddleware = createLogger();

//创建携带所传入中间件的store
let createStoreWithMiddleware = applyMiddleware(thunkMiddleware, loggerMiddleware)(createStore);
let store = createStoreWithMiddleware(rootReducer);

//监听state的每一次变化，若调用返回函数unsubscribe(),则监听取消
let unsubscribe = store.subscribe(() => console.log(store.getState()));

ReactDOM.render(
    <Provider store = { store }>
      <Notes/>
    </Provider>, document.getElementById('app'));
