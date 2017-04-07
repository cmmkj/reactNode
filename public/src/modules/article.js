import React from 'react';
import { Link } from 'react-router';
import Notes_header from '../components/note_header.js';
import { Button } from 'antd';

export default React.createClass({
  
  getInitialState() {
    return {create: false, login: false};
  },

  handleDelete(){
    let date = this.props.location.state.note.date;
    this.props.location.state.note.onDeleteNote(date, this.props.location.state.note.token);
  },

  handleSignup(){
    this.setState({create: !this.state.create});
  },

  handleSubmit() {
  
  },

  render(){
    let {note} = this.props.location.state;
    let tagMessage ;
    if(note.userid == note.noteuserid) {
      tagMessage = (
        <span onClick={ this.handleDelete }>{' '}删除{' '}</span>
      )
    }
    let style = {
      display: note.isLogin ? 'block' : 'none'
    };
    let unstyle = {
      display: !note.isLogin ? 'block' : 'none'
    };
    return (
      <div className="article">
        <div className="article_main">
          <h4>{ note.title }</h4>
          <pre>{ note.content }</pre>
          <span className="article-tag">
            <span className="tag-left">{ 'posted @' + note.date }</span>
            <span className="tag-right">浏览({ note.pv }){' '}留言({ 0 })</span> 
            {tagMessage}
          </span>
        </div>
      </div>
    )
  }
});


