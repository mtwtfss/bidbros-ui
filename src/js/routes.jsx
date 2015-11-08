'use strict';

import React from 'react/addons';
import { Router, Route, Redirect } from 'react-router';

import App from './App';
import Bids from './views/Bids';
import Listings from './views/Listings';
import SingleBid from './views/SingleBid';
import SingleListing from './views/SingleListing';
import UhOh from './views/404';

export default (
  <Router>
    <Route component={ App }>
      <Route name="404" path="/404" component={ UhOh } />
      <Route name="bid" path="/bid/:bidId" component={ SingleBid } />
      <Route name="bids" path="/bids" component={ Bids } ignoreScrollBehavior />
      <Route name="listing" path="/listing/:listingId" component={ SingleListing } />
      <Route name="listings" path="/listings" component={ Listings } ignoreScrollBehavior />
      <Redirect from="/" to="/listings" />
      <Redirect from="*" to="/404" />
    </Route>
  </Router>
);
