'use strict'

import { combineReducers } from 'redux';
import { INIT_NOTES, ADD_NOTE, DELETE_NOTE, FIND_ONE, USER_INIT_NOTES } from '../action/note.js';
import { CREATE_USER, LOGIN_USER, LOGOUT_USER } from '../action/user.js'

//处理笔记初始化，添加和删除请求
function notes(state = [], action) {
  //每一次操作无论添加，删除，还是初始化，全部笔记内容会被重新更新一次
  switch(action.type) {
    case INIT_NOTES:
      return [...action.notes];
    default:
      return state;
  }
}

function userNotes(state = [], action) {
  switch(action.type) {
    case USER_INIT_NOTES:
      return [...action.userNotes];
    case DELETE_NOTE:
      return [...action.userNotes];
    default:
      return state;
  }
}

function createUser(state = false, action){
  switch(action.type) {
    case CREATE_USER: 
      return action.isCreated;
    default:
      return state;
  }
}

function loginOrOut(state = null, action) {
  switch(action.type) {
    case LOGIN_USER: 
      return action.loginInfo;
    case LOGOUT_USER:
      return action.loginInfo
    default:
      return state;
  }
}

function findOneNote(state = null, action) {
  switch(action.type) {
    case FIND_ONE:
      return action.note;
    default:
      return state;
  }
}


const rootReducer = combineReducers({
  notes, 
  isCreated: createUser, 
  loginInfo: loginOrOut,
  note: findOneNote,
  userNotes: userNotes
});
export default rootReducer;

