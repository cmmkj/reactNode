'use strict'

import React, {  Component, PropTypes } from 'react';
import {Input, Button} from 'antd';

class Notes_form extends React.Component{
  handleSubmit(event) {
    event.preventDefault();
    if(this.refs.title.value == '') return ;
    let newNote = {
      title: this.refs.title.value,
      description: this.refs.description.value,
      date: 'posted @' + new Date()
    };
    this.refs.yout_form.reset();
    this.props.onNewNote(newNote);
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
          <textarea ref="description" className="your_description" placeholder="笔记内容"/>
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
