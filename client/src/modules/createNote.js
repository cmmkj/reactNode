'use strict'
import React from 'react'
import {Input, Button} from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import * as actions from '../action/note'

class CreateNote extends React.Component{
  constructor(props) {
    super(props) ;
  }

  handleSubmit(event) {
    event.preventDefault();
    let now = new Date();
    let month = (now.getMonth()+1) >= 10 ? (now.getMonth()+1) : '0' + (now.getMonth()+1);
    let hour = now.getHours() >= 10 ? now.getHours() : '0' + now.getHours();
    let day = now.getDate() >= 10 ? now.getDate() : '0' + now.getDate();
    let min = now.getMinutes() >= 10 ? now.getMinutes() : '0' + now.getMinutes();
    let sec = now.getSeconds() >=10 ? now.getSeconds() : '0' + now.getSeconds();
    if(this.refs.title.value == '') return ;
    const userInfo = this.props.loginInfo ? this.props.loginInfo : JSON.parse(localStorage.getItem('userInfo'))
    let newNote = {
      title: this.refs.title.value,
      content: this.refs.content.value,
      date: now.getFullYear() + '-' + month + '-' + day + " " + hour + ":" + min + ":" + sec,
      authorid: userInfo.userid,
      author: userInfo.username
    };
    const path = '/user/notes'
    this.refs.yout_form.reset()
    this.props.actions.addNote(newNote, userInfo.token)
    browserHistory.push(path);
  }
 
  cancelHandleSubmit (event) {
    event.preventDefault()
    const path = '/user/notes'
    this.refs.yout_form.reset()
    browserHistory.push(path);
  }

  render() {
 
    return (
      <form ref="yout_form" className="note_form" onSubmit={ this.handleSubmit.bind(this) }>
        <h5>编辑文章</h5>
        <input ref="title" type="text" className="your_title" placeholder="文章标题" />
        <textarea ref="content" className="your_content" placeholder="文章内容"/>
        <Button className="cancel_btn" onClick={ this.cancelHandleSubmit.bind(this) }>取消</Button>
        <input type="submit" value="确认" className="confirm_btn"/>
      </form>
    )
  }
}
const mapStateToProps = (state) => {
  return {loginInfo: state.loginInfo}
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNote)
