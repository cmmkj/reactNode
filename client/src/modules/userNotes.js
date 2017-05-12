'use strict'

import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router'
import Notes_item from '../components/note_item'
import * as actions from '../action/note'

class UserNotes extends React.Component{
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const userInfo = this.props.loginInfo ? this.props.loginInfo : JSON.parse(localStorage.getItem('userInfo'))
    this.props.actions.findUserNotes(userInfo.userid, userInfo.token);
  }

  onDeleteNote (noteid) {
    const userInfo = this.props.loginInfo ? this.props.loginInfo : JSON.parse(localStorage.getItem('userInfo'))
    let data = {noteid, userid: userInfo.userid}
    this.props.actions.deleteNote(data, userInfo.token)
    const path = '/user/notes'
    browserHistory.push(path)
  }

  render() {
    let notes = this.props.userNotes
    const userInfo = this.props.loginInfo ? this.props.loginInfo : JSON.parse(localStorage.getItem('userInfo'))
    return (
      <ul className="notes_list">
        {
          notes.map((note, index) => {
            note.userid = this.props.userid
            note.isLogin = true
            return <Notes_item note={ note } onDeleteNote={ this.onDeleteNote.bind(this) }/>
          })
        }
      </ul>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userNotes: state.userNotes,
    loginInfo: state.loginInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserNotes)
