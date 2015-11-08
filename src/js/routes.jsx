'use strict';

import React from 'react/addons';
import { Router, Route, Redirect } from 'react-router';

import App from './App';
import Base from './views/Base';
import SingleBid from './views/SingleBid';
import SingleListing from './views/SingleListing';
import UhOh from './views/404';

export default (
  <Router>
    <Route component={ App }>
      <Route name="404" path="/404" component={ UhOh } />
      <Route name="bid" path="/bid/:bidId" component={ SingleBid } />
      <Route name="listing" path="/listing/:listingId" component={ SingleListing } />
      <Route name="base" path="/" component={ Base } ignoreScrollBehavior />
      <Redirect from="*" to="/404" />
    </Route>
  </Router>
);
