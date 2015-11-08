'use strict';

import React from 'react/addons';
import { Router, Route, Redirect } from 'react-router';

import App from './App';
import Bids from './views/Bids';
import SingleBid from './views/Single';
import UhOh from './views/404';

export default (
  <Router>
    <Route component={ App }>
      <Route name="404" path="/404" component={ UhOh } />
      <Route name="bid" path="/bid/:bidId" component={ SingleBid } />
      <Route name="bids" path="/bids" component={ Bids } ignoreScrollBehavior />
      <Redirect from="/" to="/bids" />
      <Redirect from="*" to="/404" />
    </Route>
  </Router>
);
