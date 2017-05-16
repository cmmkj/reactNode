'use strict'

import $ from '../jquery.min.js';

export const ADD_COMMENT = 'ADD_COMMENT'
export const FIND_COMMENTS = 'FIND_COMMENTS'
export const CREATE_COMMENTINDEX = 'CREATE_COMMENTINDEX'
export const COVERT_COMMENTINDEX = 'COVERT_COMMENTINDEX'

export function addComment(data, token) {
  return function (dispatch, getState) {
    $.ajax({
      url: '/v1/user/comment',
      type: 'post',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      data: JSON.stringify(data),
      cache: false,
      success: function (result) {
        console.log('评论成功啦~') 
        console.log(result)
        dispatch({type: ADD_COMMENT, comments: result.comments})
      }.bind(this),
      beforeSend: function (xhr) {
        xhr.setRequestHeader ('Authorization', 'Bearer ' + token); 
      },
      error: function () {
        console.log('添加评论失败')
      }.bind(this)
    })
  }
}

export function findNoteComments (noteid) {
  return function (dispatch, getState) {
    $.ajax({
      url: '/v1/note/comments/' + noteid,
      type: 'get',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      cache: false,
      success: function (result) {
        console.log('找到该文章的评论')
        console.log(result)
        dispatch({type: FIND_COMMENTS, comments: result.comments})
      }.bind(this),
      error: function () {
        console.log('查找失败~')
      }.bind(this)
    })
  }
}

export function createCommentIndexs (noteid) {
  return function (dispatch, getState) {
    $.ajax({
      url: '/v1/note/comments/' + noteid,
      type: 'get',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      cache: false,
      success: function (result) {
        console.log('找到该文章的评论')
        console.log(result)
        result.commentIndexs = []
        result.comments.map((comment, index) => {
          result.commentIndexs[comment._id + '_' + index] = false
          if (comment.reply && comment.reply.length !== 0) {
            comment.reply.map((reply, key) => {
              result.commentIndexs[comment._id + '_' + 'reply' + '_' + key] = false
            })
          }
        })
        console.log(result)
        dispatch({type: CREATE_COMMENTINDEX, commentIndexs: result.commentIndexs})
      }.bind(this),
      error: function () {
        console.log('查找失败~')
      }.bind(this)
    })
  }
}

export function replyIsDisplay (commentIndexs, index) {
  return function (dispatch, getState) {
    commentIndexs[index] = !commentIndexs[index]
    dispatch({type: COVERT_COMMENTINDEX, commentIndexs:commentIndexs})
  }
}
