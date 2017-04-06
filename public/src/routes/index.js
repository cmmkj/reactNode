import React from 'react'
import App from '../container/app';
import Article from '../modules/article';
import { Router, Route, browserHistory } from 'react-router';

const Routes = (
  <Router history={ browserHistory }>
    <Route path="/" component={ App } />
    <Route path="/article/:noteid" component={ Article } />
  </Router>
);

export default Routes;
