'use strict'

import React, {PropTypes} from 'react';
import Notes_item from './note_item.js';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class Notes_list extends React.Component{

  handleDelete() {
    let date = this.props.note.date;
    this.props.onDeleteNote(date, this.props.token); 
  }

  render() {
    let notes = this.props.notes;
    let isLogin = this.props.isLogin;
    let noteMessage;
    let note = this.props.note;
    let tagMessage;

    if(this.props.isClickTitle ) {
      note.userid = this.props.userid
      if(note.userid == note.authorid) {
        tagMessage = (
          <span onClick={ this.handleDelete.bind(this) }>{' '}删除{' '}</span>
        )
      }
      noteMessage = (
        <div className="article">
          <div className="article_main">
            <h4>{ note.title }</h4>
            <pre>{ note.content }</pre>
            <span className="article-tag">
              <span>{'作者:' + note.author }&nbsp;&nbsp;</span>
              <span className="tag-left">{ 'posted @' + note.date }</span>
              <span className="tag-right">浏览({ note.__v }){' '}留言({ 0 })</span> 
              { tagMessage }
            </span>
          </div>
        </div>
      )
    } else {
      noteMessage = (
        notes.map((note, index) => {
          note.userid = this.props.userid;
          return <
            Notes_item key={ index } note={ note } onIsClickTitle={ this.props.onIsClickTitle } onNote={ this.props.onNote }  
          />
        })
      )
    }
    return (
      <ul className="notes_list">
        {
          noteMessage
        }
      </ul>
    )
  }
}
Notes_list.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

export default Notes_list;
