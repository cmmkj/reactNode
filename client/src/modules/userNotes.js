'use strict'

import React from 'react'
import { connect } from 'react-redux';

import Notes_item from '../components/note_item'
import { findUserNotes } from '../action/note'

class UserNotes extends React.Component{
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const userInfo = this.props.loginInfo ? this.props.loginInfo : JSON.parse(localStorage.getItem('userInfo'))
    this.props.dispatch(findUserNotes(userInfo.userid, userInfo.token));
  }
  render() {
    let notes = this.props.userNotes
    return (
      <ul className="notes_list">
        {
          notes.map((note, index) => {
            note.userid = this.props.userid
            return <Notes_item note={ note }/>
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

export default connect(mapStateToProps)(UserNotes)
