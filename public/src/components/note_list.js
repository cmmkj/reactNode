'use strict'

import React, {PropTypes} from 'react';
import Notes_item from './note_item.js';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class Notes_list extends React.Component{
  render() {
    let notes = this.props.notes;
    return (
      <ul className="notes_list">
        { 
          notes.map((note, index) => {
            return <Notes_item key={ index } title={ note.title } description={ note.description } date={ note.date } onDeleteNote={ this.props.onDeleteNote }/>
          })
        }
      </ul>
    )

    /*
    return (
      <div className="notes_list">
        <ReactCSSTransitionGroup transitionName="notes" transitionEnterTimeout={500} transitionLeaveTImeout={500}>{ notes_items }</ReactCSSTransitionGroup> 
      </div>
    );*/
  }
}
Notes_list.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

export default Notes_list;
