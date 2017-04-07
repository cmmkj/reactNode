import React from 'react'
import App from '../container/app';
import Article from '../modules/article';
import { Router, Route, IndexRoute } from 'react-router';
import Notes_list from '../components/note_list';


const Routes = (
  <Router>
    <Route path="/" component={ App }/>
    <Route path="/article/:noteid" component={ Article } />
  </Router>
);

export default Routes;
