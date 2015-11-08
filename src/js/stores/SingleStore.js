'use strict';

import Reflux from 'reflux';
import API from '../util/api';
import Actions from '../actions/Actions';

let bid = {};

const SingleStore = Reflux.createStore({
  listenables: Actions,

  onFetchBid(bidId) {
    var _this = this;
    API.fetchData('bid/' + bidId).then(function(bidData) {
      bid = bidData.data;
      _this.trigger(bid);
    }).fail(function() {
      bid = {};
      _this.trigger(bid);
    });
  },

  getDefaultData() {
    return bid;
  }
});

export default SingleStore;
