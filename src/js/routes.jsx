'use strict';

import React from 'react/addons';
import { Router, Route, Redirect } from 'react-router';

import App from './App';
import Posts from './views/Posts';
import SinglePost from './views/Single';
import UhOh from './views/404';

export default (
  <Router>
    <Route component={ App }>
      <Route name="404" path="/404" component={ UhOh } />
      <Route name="post" path="/post/:postId" component={ SinglePost } />
      <Route name="posts" path="/posts" component={ Posts } ignoreScrollBehavior />
      <Redirect from="/" to="/posts" />
      <Redirect from="*" to="/404" />
    </Route>
  </Router>
);
