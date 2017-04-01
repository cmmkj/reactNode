'use strict'

import $ from '../jquery.min.js';

export const CREATE_USER = 'CREATE_USER';
export const LOGIN_USER = 'LOGIN_USER';

export function createUser(newUser) {
  return function(dispatch, getState) {
    $.ajax({
      url: '/user/createUser',
      type: 'post',
      contentType: 'application/json; charsetrset=utf-8',
      dataType: 'json',
      data: JSON.stringify(newUser),
      cache: false,
      success: function(token) {
        console.log('注册用户成功');
        console.log(token)
        dispatch({type: CREATE_USER, isCreated:true});
      }.bind(this),
      error: function() {
        console.log('注册用户失败');
      }.bind(this)
    });
  }
}

export function loginUser(data) {
  return function(dispatch, getState) {
    $.ajax({
      url: '/user/loginUser',
      type: 'post',
      contentType: 'application/json; charsetrset=utf-8',
      dataType: 'json',
      data: JSON.stringify(data),
      cache: false,
      success: function(token) {
        console.log('登录成功');
        console.log(token)
        dispatch({type: LOGIN_USER, token});
      }.bind(this),
      error: function() {
        console.log('登录失败');
      }.bind(this)
    });
  }  
}
