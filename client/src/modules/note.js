import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { findOneNote } from '../action/note'

class Notecomponent extends React.Component{
  constructor (props) {
    super(props);
  }  

  
  componentDidMount() {
    this.props.dispatch(findOneNote(this.props.params.noteid));
  }

  render(){
    let {note} = this.props;
    let tagMessage;
    let message
    if(note) {
      message = (
        <div>
          <div className="article_main">
            <h4>{ note.title }</h4>
            <pre>{ note.content }</pre>
            <span className="article-tag">
              <span>{'作者:' + note.author }&nbsp;&nbsp;</span>
              <span className="tag-left">{ 'posted @' + note.date }</span>
              <span className="tag-right">浏览({ note.pv || 0 }){' '}留言({ 0 })</span> 
              {tagMessage}
            </span>
          </div>
          <hr/>
          <div className="note_comment">
            
          </div>
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
  return {
    note:state.note
  }
}
const Note = connect(
  mapStateToProps    
)(Notecomponent)

export default Note
