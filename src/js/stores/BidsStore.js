'use strict';

import Reflux from 'reflux';
import API from '../util/api';
import Actions from '../actions/Actions';

let bidRangeStep = 10;

let data = {
  bids: [],
  bidRange: 10
};

const BidsStore = Reflux.createStore({
  listenables: Actions,

  onFetchBids() {
    var _this = this;
    API.fetchData('bids').then(function(bidsData) {
      data.bids = bidsData.data;
      _this.trigger(data);
    }).fail(function() {
      window.alert('Unable to fetch bid data');
    });
  },

  onSubmitBid(bidData) {
    var _this = this;
    API.bidData('bid', bidData).then(function(bid) {
      data.bids.unshift(bid.data);
      _this.trigger(data);
      Actions.hideModal();
    }).fail(function(error) {
      Actions.modalError(error.responseText);
    });
  },

  onExpandBidRange() {
    data.bidRange = data.bidRange + bidRangeStep;
    this.trigger(data);
  },

  getDefaultData() {
    return data;
  }
});

export default BidsStore;
