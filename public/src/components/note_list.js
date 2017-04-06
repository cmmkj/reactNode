'use strict'

import React, {PropTypes} from 'react';
import Notes_item from './note_item.js';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class Notes_list extends React.Component{
  render() {
    let notes = this.props.notes;
    let token = this.props.token;
    let isLogin = this.props.isLogin;
    return (
      <ul className="notes_list">
        { 
          notes.map((note, index) => {
            return <Notes_item key={ index } noteid={ note._id } noteuserid={ note.authorid } userid={ this.props.userid } pv={ note.__v } title={ note.title } content={ note.content } date={ note.date } token={ token } isLogin={ isLogin } onDeleteNote={ this.props.onDeleteNote }/>
          })
        }
      </ul>
    )
  }
}
Notes_list.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

export default Notes_list;
