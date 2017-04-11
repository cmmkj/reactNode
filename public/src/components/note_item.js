'use strict'
import React, { PropTypes } from 'react';
import { Button } from 'antd';
import { Link } from 'react-router';
class Notes_item extends React.Component{
  //<h4><Link to={{pathname:'/article/' + this.props.noteid,state: {note: this.props}}}>{ this.props.title }</Link></h4>
          //<h4 onClick={ this.handleTitle.bind(this) }>{ this.props.note.title }</h4>

  render() {
    let date = this.props.note.date;
    let postDate = 'posted @' + date;
    return (
      <div>
        <div className="notes_item" >
          <h4><Link to={ '/note/' + this.props.note._id }>{ this.props.note.title }</Link></h4>
          <p>{ this.props.note.content.substr(0,50) + '...' }</p>
          <span className="tag">
            <span>{ '作者:' + this.props.note.author }&nbsp;&nbsp;</span>
            <span className="tag-left">{ postDate }</span>
            <span className="tag-right">浏览({ this.props.note.__v }){' '}留言({ 0 })</span> 
          </span>
        </div>
      </div>
    );
  }
}

export default Notes_item;
