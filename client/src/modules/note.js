import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'antd';
import * as actions from '../action/comment'
import * as actionNotes from '../action/note'
import Comment from '../components/comment.js'
import CommentReply from '../components/commentReply.js'

class Notecomponent extends React.Component{
  constructor (props) {
    super(props)
    this.state = {
      commentIndex: ''
    }
  }  

  onCommentDisplay(index, event) {
    event.preventDefault()
    this.setState({
      commentIndex: index
    })
    this.props.actions.replyIsDisplay(this.props.commentIndexs, index)
  }

  componentDidMount() {
    this.props.actionNotes.findOneNote(this.props.params.noteid);
    this.props.actions.findNoteComments(this.props.params.noteid),
    this.props.actions.createCommentIndexs(this.props.params.noteid)
  }

  handleSubmit (event) {
    event.preventDefault()
    if (this.refs.content.value == '') return
    const userInfo = this.props.loginInfo ? this.props.loginInfo : JSON.parse(localStorage.getItem('userInfo'))
    const note = this.props.note
    let commentData = {
      noteid: note._id,
      fromUserid: userInfo.userid,
      content: this.refs.content.value
    }
    this.props.actions.addComment(commentData, userInfo.token)
  }
  
  onCreateComment (commentData, index) {
    const userInfo = this.props.loginInfo ? this.props.loginInfo : JSON.parse(localStorage.getItem('userInfo'))
    this.props.actions.replyIsDisplay(this.props.commentIndexs, index)
    this.props.actions.addComment(commentData, userInfo.token)
  }

  render(){
    const userInfo = this.props.loginInfo ? this.props.loginInfo : JSON.parse(localStorage.getItem('userInfo'))
    let {note} = this.props;
    let message
    let comment_bt
    if (userInfo) {
      comment_bt = (
        <input type="submit" value="提交" className="comment_button" />    
      )
    } else {
      comment_bt = (
        <p className="comment_pre">登录后再评论</p>    
      )
    }
    let comment_message
    let comments = this.props.comments ? this.props.comments: null
    let commentIndexs = this.props.commentIndexs ? this.props.commentIndexs: {}
    if (comments) {
      comment_message = comments.map((comment, index) => {
        comment.index = index
        return (
          <div className="comment_list">
            <strong> { comment.fromUserid.name } 说:</strong>
            <li className="comment_li">{ comment.content } </li>
            <div className="reply"><span onClick={ this.onCommentDisplay.bind(this, comment._id + '_' + index) }>回复</span>
            <Comment comment={ comment } fromUserid={ userInfo.userid } onCreateComment={ this.onCreateComment.bind(this)} onDisplay={ commentIndexs } commentIndex={ this.state.commentIndex } />
            </div>
            {
              comment.reply.map((reply, index) => {
                reply.index = index
                reply._id = comment._id
                reply.noteid = comment.noteid
                return (
                  <ul>
                    <strong className="reply_str"> { reply.fromUserid.name } 回复 { reply.toUserid.name } 说:</strong>
                    <li className="reply_li">{ reply.content } </li>
                    <div className="reply"><span onClick={ this.onCommentDisplay.bind(this, comment._id + '_reply_' + index) }>回复</span></div>
                    <CommentReply comment={ reply } fromUserid={ userInfo.userid } onCreateComment={ this.onCreateComment.bind(this)} onDisplay={ commentIndexs } commentIndex={ this.state.commentIndex } />
                  </ul>
                )
              })
            }
          </div>
        )
      })
    }
    if(note) {
      message = (
        <div>
          <div className="article_main">
            <h4>{ note.title }</h4>
            <pre>{ note.content }</pre>
            <span className="article-tag">
              <span>{'作者:' + note.author }&nbsp;&nbsp;</span>
              <span className="tag-left">{ 'posted @' + note.date }</span>
              <span className="tag-right">浏览({ note.pv || 0 }){' '}留言({ note.commentCnt || 0 })</span> 
            </span>
          </div>
          <div className="comment_show">
            <h4>评论区</h4>
            {
              comment_message
            }
          </div>
          <div className="note_comment">
            <form ref="comment_form" action="#" className="comment_post" onSubmit={ this.handleSubmit.bind(this) }>
              <textarea ref="content" className="comment_content" placeholder="评论内容" />
              { comment_bt }
            </form>
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
    note:state.note,
    loginInfo: state.loginInfo,
    comments: state.comments,
    commentIndexs: state.commentIndexs
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
    actionNotes: bindActionCreators(actionNotes, dispatch)
  }
}

const Note = connect(
  mapStateToProps, mapDispatchToProps    
)(Notecomponent)


export default Note
