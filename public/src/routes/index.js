import React from 'react'
import App from '../container/app';
import Note from '../modules/note';
import { Router, Route, IndexRoute } from 'react-router';
import Notes_list from '../components/note_list';
import Notes_header from '../components/note_header';



const Routes = (
  <Router path="/" component={ Notes_header }>
    <IndexRoute component={ Notes_list }/>
    <Route path="/article/:noteid" component={ Note } />
  </Router>
);

export default Routes;
