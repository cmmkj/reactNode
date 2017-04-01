'use strict'
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { initNotes, addNote, deleteNote } from '../action/article.js';
import { createUser, loginUser} from '../action/user.js'
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
      formUserLoginDisplayed: false
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

  onNewNote(newNote) {
    this.props.dispatch(addNote(newNote));
  }
    
  onDeleteNote(datet) {
    /*根据日期来删除笔记*/
    let delete_date = {
      date: datet
    };
    this.props.dispatch(deleteNote(delete_date));
  }
  
  onUserCreateForm() {
    this.setState({
      formUserCreateDisplayed: !this.state.formUserCreateDisplayed
    });
  }
  
  onUserLoginForm() {
    this.setState({
      formUserLoginDisplayed: !this.state.formUserLoginDisplayed
    });
    console.log(this.state.formUserLoginDisplayed);
  }

  onCreateUser(newUser) {
    this.props.dispatch(createUser(newUser));
  }
  
  onLoginUser(userData) {
    this.props.dispatch(loginUser(userData));
  }

  render() {
    const { notes ,isCreated, token} = this.props;
    return (
      <div className="container">
        <Notes_header onToggleForm={ this.onToggleForm.bind(this) } onUserCreateForm={ this.onUserCreateForm.bind(this) } onUserLoginForm={ this.onUserLoginForm.bind(this) }/>
        <div className="container_main">
          <Notes_form onToggleForm={ this.onToggleForm.bind(this) }
            formDisplayed={ this.state.formDisplayed } onNewNote={ this.onNewNote.bind(this) }/>
          <Notes_createUser isCreated={ isCreated } onUserCreateForm={ this.onUserCreateForm.bind(this) } 
            formUserCreateDisplayed={ this.state.formUserCreateDisplayed } 
            onCreateUser={ this.onCreateUser.bind(this) } />
          <Notes_loginUser onUserLoginForm={ this.onUserLoginForm.bind(this) } 
            formUserLoginDisplayed={ this.state.formUserLoginDisplayed }
            onLoginUser={ this.onLoginUser.bind(this) }/>
          <Notes_list notes={ notes } onDeleteNote={ this.onDeleteNote.bind(this) }/>
        </div>
      </div>
    );
  }
}

Notes.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired
    }).isRequired       
  ).isRequired   
}
function select(state) {
  return {
    notes: state.notes,
    isCreated: state.isCreated,
    token: state.token
  };
}

export default connect(select)(Notes);
