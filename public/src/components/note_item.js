'use strict'
import React, { PropTypes } from 'react';
import { Button } from 'antd';
import { Link } from 'react-router';
class Notes_item extends React.Component{

  render() {
    let date = this.props.date;
    let postDate = 'posted @' + date;
    //date = new Date(date);
    //let postDate = 'posted @' + date.getFullYear() + '-' + (date.getMonth()+1)+ '-' + date.getDate()+ " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return (
      <div>
        <div className="notes_item" >
          <h4><Link to={{pathname:'/article/' + this.props.noteid,state: {note: this.props, onDeleteNote: this.props.onDeleteNote}}}>{ this.props.title }</Link></h4>
          <p>{ this.props.content }</p>
          <span className="tag">
            <span className="tag-left">{ postDate }</span>
            <span className="tag-right">浏览({ this.props.pv }){' '}留言({ 0 })</span> 
          </span>
        </div>
      </div>
    );
  }
}

Notes_item.propTypes = {
  title : PropTypes.string.isRequired,
  content : PropTypes.string.isRequired,
  date : PropTypes.string.isRequired,
  onDeleteNote : PropTypes.func.isRequired
}
export default Notes_item;
