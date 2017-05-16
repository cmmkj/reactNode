
'user strict'
import React from 'react'

class CommentReply extends React.Component{
  
  handleSubmit (event) {
    event.preventDefault()
    let comment = this.props.comment
    let commentData = {
      noteid: comment.noteid,
      commentid: comment._id,
      fromUserid: this.props.fromUserid,
      toUserid: comment.fromUserid,
      content: this.refs.content.value
    }
    this.props.onCreateComment(commentData, this.props.commentIndex)
  }
  render() {
    let comment_bt
    if (this.props.fromUserid) {
      comment_bt = (
        <input type="submit" value="提交" className="comment_button" />    
      )
    } else {
      comment_bt = (
        <p className="comment_pre">登录后再评论</p>    
      )
    }
    let style = {
      display: this.props.onDisplay[this.props.commentIndex] ? 'block' : 'none'
    }
    let reply
      if ((this.props.comment._id + '_' + 'reply_' + this.props.comment.index) === this.props.commentIndex) {
      reply = (
        <form ref="comment_form" className="comment_post" onSubmit={ this.handleSubmit.bind(this) }>
          <textarea ref="content" className="comment_content" placeholder={ "回复" + this.props.comment.fromUserid.name + ":"} />
          { comment_bt }
        </form>
      )
    }
    return (
      <div className="note_comment" style={ style }>
        { reply }
      </div>
    )
  }
}

export default CommentReply
