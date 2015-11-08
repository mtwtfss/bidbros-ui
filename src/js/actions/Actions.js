'use strict';

import Reflux from 'reflux';
import API from '../util/api';

const Actions = Reflux.createActions([
  // agent actions
  'agentLogin',
  'agentLogout',
  'agentRegister',
  'fetchAgent',
  'fetchAgents',
  // bid actions
  'fetchBid',
  'fetchBids',
  'submitBid',
  'expandBidRange',
  // listing actions
  'fetchListing',
  'fetchListings',
  'submitListing',
  'setCurrentListing',
  'expandListingRange',
  // seller actions
  'sellerLogin',
  'sellerLogout',
  'sellerRegister',
  'fetchAgent',
  'fetchAgents',
  // modal actions
  'showModal',
  'hideModal',
  'nextModal',
  'modalError'
]);

export default Actions;
