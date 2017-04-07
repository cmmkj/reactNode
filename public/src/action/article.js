'use strict'

import $ from '../jquery.min.js';

//事件
export const INIT_NOTES = 'INIT_NOTES';
export const ADD_NOTE = 'ADD_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';


//action创建函数
//异步action会被redus-thunk中间件拦截,传入dispatch,getState等参数后执行
export function initNotes() {
  return function(dispatch, getState) {
    $.ajax({
      url: '/init',
      type: 'get',
      dataType: 'json',
      cache: false,
      success: function(notes) {
        notes = notesSort(notes);
        dispatch({type: INIT_NOTES, notes: notes});
      }.bind(this),
      error: function() {
        console.log('notes获取失败');
      }.bind(this)
    });
  }
}



export function addNote(newNote, token) {
  return function(dispatch, getState) {
    $.ajax({
      url: '/article/addNote',
      type: 'post',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      //客户端与服务器通过json字符串进行通信
      data: JSON.stringify(newNote),
      cache: false,
      success: function(notes) {
        console.log('笔记添加成功!');
        notes = notesSort(notes);
        dispatch({type: ADD_NOTE, notes: notes});
      }.bind(this),
      beforeSend: function (xhr) {    //添加Authorization
        xhr.setRequestHeader ('Authorization', 'Bearer ' + token); 
      },
      error: function() {
        console.log('笔记添加失败啦～');
      }.bind(this)
    });    
  } 
}

export function deleteNote(delete_date, token) {
  return function(dispatch, getState) {
    $.ajax({
      url: '/article/deleteNote',
      type: 'delete',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      data:JSON.stringify(delete_date),
      cache: false,
      success: function(notes) {
        console.log('笔记已经被删除!');
        notes = notesSort(notes);
        dispatch({type: DELETE_NOTE, notes: notes});
      }.bind(this),
      beforeSend: function (xhr) {    //添加Authorization
        xhr.setRequestHeader ('Authorization', 'Bearer ' + token); 
      },
      error: function(){
        console.log('笔记删除失败~');
      }.bind(this)
    });
  }
}

function notesSort(newNotes) {
  /*将数据库取到的notes倒序排列再显示，即后添加上去的记录在最前面显示*/
  newNotes.reverse();
  return newNotes;
}