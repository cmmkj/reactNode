'use strict'

import $ from '../jquery.min.js';

export const CREATE_USER = 'CREATE_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export function createUser(newUser) {
  return function(dispatch, getState) {
    $.ajax({
      url: '/v1/user/createUser',
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
      rror: function() {
        console.log('注册用户失败');
}.bind(this)
    });
  }
}

export function login(data) {
  return function(dispatch, getState) {
    $.ajax({
      url: '/v1/user/login',
      type: 'post',
      contentType: 'application/json; charsetrset=utf-8',
      dataType: 'json',
      data: JSON.stringify(data),
      cache: false,
      success: function(result) {
        console.log('登录成功');
        result.isLogin = true;
        dispatch({type: LOGIN_USER, loginInfo: result});
      }.bind(this),
      error: function() {
        console.log('登录失败');
      }.bind(this)
    });
  }  
}

export function logout(){
  return function(dispatch, getState) {
    let result = {
      token: null,
      isLogin: false
    };
    dispatch({type: LOGOUT_USER, loginInfo: result});
  }
} 
