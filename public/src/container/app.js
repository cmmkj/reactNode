'use strict'
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { initNotes, addNote, deleteNote } from '../action/article.js';
import { createUser, login, logout} from '../action/user.js'
import Notes_header from '../components/note_header.js';
import Notes_form from '../components/note_form.js';
import Notes_list from '../components/note_list.js';
import Notes_createUser  from '../components/note_createUser.js';
import Notes_loginUser from '../components/note_loginUser.js'

class Notes extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      formDisplayed: false,
      formUserCreateDisplayed: false,
      formUserLoginDisplayed: false,
    };
  }

  componentDidMount() {
    this.props.dispatch(initNotes());
  }

  onToggleForm() {
    this.setState({
      formDisplayed: !this.state.formDisplayed
    });
  }

  onNewNote(newNote, token) {
    this.props.dispatch(addNote(newNote, token));
  }
    
  onDeleteNote(date, token) {
    /*根据日期来删除笔记*/
    let delete_date = {
      date: date
    };
    this.props.dispatch(deleteNote(delete_date, token));
  }
  
  onUserCreateForm() {
    this.setState({
      formUserCreateDisplayed: !this.state.formUserCreateDisplayed,
      formUserLoginDisplayed: false
    });
  }
  
  onUserLoginForm() {
    this.setState({
      formUserLoginDisplayed: !this.state.formUserLoginDisplayed,
      formUserCreateDisplayed: false
    });
    console.log(this.state.formUserLoginDisplayed);
  }

  onCreateUser(newUser) {
    this.props.dispatch(createUser(newUser));
  }
  
  onLoginUser(userData) {
    this.props.dispatch(login(userData));
  }
  
  onLogoutUser() {
    this.setState({
      formDisplayed: false
    });
    this.props.dispatch(logout()); 
  }
  
  render() {
    const { notes ,isCreated, loginInfo} = this.props;
    const {token, isLogin, userid} = loginInfo ? loginInfo : {};
    return (
      <div className="container">
        <Notes_header isLogin={ isLogin } onToggleForm={ this.onToggleForm.bind(this) } onUserCreateForm={ this.onUserCreateForm.bind(this) } onUserLoginForm={ this.onUserLoginForm.bind(this) }
          onLogoutUser={ this.onLogoutUser.bind(this) }/>
        <div className="container_main">
          <Notes_form token={ token } onToggleForm={ this.onToggleForm.bind(this) } userid={ userid }
            formDisplayed={ this.state.formDisplayed } onNewNote={ this.onNewNote.bind(this) }/>
          <Notes_createUser isCreated={ isCreated } onUserCreateForm={ this.onUserCreateForm.bind(this) } 
            formUserCreateDisplayed={ this.state.formUserCreateDisplayed } 
            onCreateUser={ this.onCreateUser.bind(this) } />
          <Notes_loginUser onUserLoginForm={ this.onUserLoginForm.bind(this) } 
            formUserLoginDisplayed={ this.state.formUserLoginDisplayed }
            onLoginUser={ this.onLoginUser.bind(this) }/>
          <Notes_list notes={ notes } token={ token } isLogin={ isLogin } userid={userid} onDeleteNote={ this.onDeleteNote.bind(this) }/>
        </div>
      </div>
    );
  }
}

Notes.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired
    }).isRequired       
  ).isRequired   
}
function select(state) {
  return {
    notes: state.notes,
    isCreated: state.isCreated,
    loginInfo: state.loginInfo
  };
}

export default connect(select)(Notes);
