import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Notes_header from '../components/note_header.js';
import { Button } from 'antd';
import { findOneNote } from '../action/article'
console.log("??????????????????????????????????????????");

class Notecomponent extends React.Component{
  constructor (props) {
    super(props);
    this.article
  }  

  
  componentDidMount() {
    console.log("cccccccccccccccccccccccccccccccccc");
    this.props.dispatch(findOneNote(this.props.params.noteid));
  }

  render(){
    console.log("nnnnnnnnnnnnnnnnnnnnnnnnnnnn");
    console.log(this.props);
    let {note} = this.props;
    let tagMessage;
    let message
/*    if(note.userid == note.noteuserid) {
      tagMessage = (
        <span onClick={ this.handleDelete }>{' '}删除{' '}</span>
      )
    } */
    if(note) {
      message = (
        <div className="article_main">
        <h4>{ note.title }</h4>
        <pre>{ note.content }</pre>
        <span className="article-tag">
          <span>{'作者:' + note.author }&nbsp;&nbsp;</span>
          <span className="tag-left">{ 'posted @' + note.date }</span>
          <span className="tag-right">浏览({ note.pv }){' '}留言({ 0 })</span> 
          {tagMessage}
        </span>
        </div>
      )
    }
    return (
      <div className="article">
        {message}          
      </div>
    )
  }
};
const mapStateToProps=(state)=>{
  return {note:state.note}
}
const Note = connect(
  mapStateToProps    
)(Notecomponent)

export default Note
