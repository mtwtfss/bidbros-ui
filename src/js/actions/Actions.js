'use strict';

import Reflux from 'reflux';
import API from '../util/api';

const Actions = Reflux.createActions([
  // agent actions
  'login',
  'logout',
  'register',
  'fetchAgent',
  'fetchAgents',
  // bid actions
  'fetchBid',
  'fetchBids',
  'submitBid',
  'expandBidRange',
  // modal actions
  'showModal',
  'hideModal',
  'nextModal',
  'modalError'
]);

export default Actions;
