'use strict';

import Reflux from 'reflux';
import API from '../util/api';

const Actions = Reflux.createActions([
  // agent actions
  'agentLogin',
  'agentLogout',
  'registerAgent',
  'fetchAgent',
  'fetchAgents',
  // bid actions
  'fetchBid',
  'fetchBids',
  'submitBid',
  'getCurrentBid',
  'setCurrentBid',
  'acceptBid',
  'declineBid',
  'expandBidRange',
  // listing actions
  'fetchListing',
  'fetchListings',
  'submitListing',
  'getCurrentListing',
  'setCurrentListing',
  'expandListingRange',
  // seller actions
  'sellerLogin',
  'sellerLogout',
  'registerSeller',
  'fetchAgent',
  'fetchAgents',
  // modal actions
  'showModal',
  'hideModal',
  'nextModal',
  'modalError'
]);

export default Actions;
