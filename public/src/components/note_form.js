'use strict'

import React, {  Component, PropTypes } from 'react';
import {Input, Button} from 'antd';

class Notes_form extends React.Component{
  handleSubmit(event) {
    event.preventDefault();
    let now = new Date();
    let month = (now.getMonth()+1) >= 10 ? (now.getMonth()+1) : '0' + (now.getMonth()+1);
    let hour = now.getHours() >= 10 ? now.getHours() : '0' + now.getHours();
    let day = now.getDate() >= 10 ? now.getDate() : '0' + now.getDate();
    let min = now.getMinutes() >= 10 ? now.getMinutes() : '0' + now.getMinutes();
    let sec = now.getSeconds() >=10 ? now.getSeconds() : '0' + now.getSeconds();
    if(this.refs.title.value == '') return ;
    let newNote = {
      title: this.refs.title.value,
      content: this.refs.content.value,
      date: now.getFullYear() + '-' + month + '-' + day + " " + hour + ":" + min + ":" + sec,
      authorid: this.props.userid,
      author: this.props.username
    };
    this.props.onToggleForm();
    this.props.onNewNote(newNote, this.props.token);
  }

  render() {
    let style = {
      display: this.props.formDisplayed ? 'block' : 'none'
    };
    return (
      <div className="note_form_wrap"> 
        <form ref="yout_form" action="#" className="note_form" style={ style } onSubmit={ this.handleSubmit.bind(this) }>
          <h5>笔记</h5>
          <input ref="title" type="text" className="your_title" placeholder="你的笔记标题" />
          <textarea ref="content" className="your_content" placeholder="笔记内容"/>
          <Button className="cancel_btn" onClick={ this.props.onToggleForm }>取消</Button>
          <input type="submit" value="确认" className="confirm_btn"/>
        </form>
      </div>
    );
  }
}

Notes_form.propTypes = {
  onToggleForm: PropTypes.func.isRequired,
  formDisplayed: PropTypes.bool.isRequired,
  onNewNote: PropTypes.func.isRequired
};

export default Notes_form;
