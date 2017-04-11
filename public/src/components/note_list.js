'use strict'

import React, {PropTypes} from 'react';
import Notes_item from './note_item.js';
import { connect } from 'react-redux';
import { initNotes } from '../action/note'

class Notes_list extends React.Component{
  
  componentDidMount() {
    this.props.dispatch(initNotes());
  }

  handleDelete() {
    let date = this.props.note.date;
    this.props.onDeleteNote(date, this.props.token); 
  }

  
  render() {
    let notes = this.props.notes;
    return (
      <ul className="notes_list">
        {
          notes.map((note, index) => {
            note.userid = this.props.userid;
            return <
              Notes_item key={ index } note={ note }  
            />
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

let mapStateToProps = (state) => {
  return {notes: state.notes}
}

export default connect(mapStateToProps)(Notes_list);
