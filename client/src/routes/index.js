import React from 'react'
import Note from '../modules/note';
import { Router, Route, IndexRoute } from 'react-router';
import Notes_list from '../components/note_list';
import Index from '../components/index';
import createNote from '../modules/createNote'
import userNotes from '../modules/userNotes'
import About from '../modules/about'


const Routes = (
  <Router path="/" component={ Index }>
    <IndexRoute component={ Notes_list }/>
    <Route path="/note/:noteid" component={ Note } />
    <Route path="/user/note" component={ createNote }/>
    <Route path="/user/notes" component={ userNotes } />
    <Route path="/about" component={ About }/>
  </Router>
);

export default Routes;
