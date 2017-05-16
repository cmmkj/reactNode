'use strict'
import React, { PropTypes } from 'react';
import { Button } from 'antd';
import { Link } from 'react-router';
import * as actions from '../action/note'

class Notes_item extends React.Component{

  onDeleteNote (event) {
    event.preventDefault()
    this.props.onDeleteNote(this.props.note._id)
  }

  render() {
    let date = this.props.note.date;
    let postDate = 'posted @' + date;
    let deleteChoice 
    if (this.props.note.isLogin) {
      deleteChoice = (
        <span className="deleteNote" onClick={ this.onDeleteNote.bind(this) }> 删除 </span>
      )
    }
    return (
      <div>
        <div className="notes_item" >
          <h4><Link to={ '/note/' + this.props.note._id }>{ this.props.note.title }</Link></h4>
          <p>{ this.props.note.content.substr(0,50) + '...' }</p>
          <span className="tag">
            <span>{ '作者:' + this.props.note.author }&nbsp;&nbsp;</span>
            <span className="tag-left">{ postDate }</span>
            <span className="tag-right">浏览({ this.props.note.pv || 0 }){' '}留言({ this.props.note.commentCnt || 0})</span> 
            { deleteChoice }
          </span>
        </div>
      </div>
    );
  }
}

export default Notes_item;
