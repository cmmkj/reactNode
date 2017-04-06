import React from 'react';
import { Link } from 'react-router';

export default React.createClass({
  
  handleDelete(){
    let date = this.props.location.state.note.date;
    this.props.location.state.onDeleteNote(date, this.props.location.state.note.token);
  },

  render(){
    let {note} = this.props.location.state;
    let tagMessage ;
    if(note.userid == note.noteuserid) {
      tagMessage = (
        <span onClick={ this.handleDelete }>{' '}删除{' '}</span>
      )
    }
    return (
      <div className="article">
        <h4>{ note.title }</h4>
        <pre>{ note.content }</pre>
        <span className="article-tag">
          <span className="tag-left">{ 'posted @' + note.date }</span>
          <span className="tag-right">浏览({ note.pv }){' '}留言({ 0 })</span> 
          {tagMessage}
        </span>
      </div>
    )
  }
});


