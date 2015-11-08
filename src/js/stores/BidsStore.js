'use strict';

import Reflux from 'reflux';
import API from '../util/api';
import Actions from '../actions/Actions';
import SellerStore from './SellerStore';

let bidRangeStep = 10;

let data = {
  bids: [],
  currentBid: null,
  bidRange: 10
};

const BidsStore = Reflux.createStore({
  listenables: Actions,

  onFetchBids() {
    var _this = this;
    API.fetchData('bids?seller_id=' + SellerStore.getCurrentSeller().id).then(function(bidsData) {
      data.bids = bidsData.data;
      _this.trigger(data);
    }).fail(function(response) {
      window.alert('Unable to fetch bid data');
    });
  },

  onSubmitBid(bidData) {
    var _this = this;
    API.postData('bid', bidData).then(function(bid) {
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

  onSetCurrentBid(bid) {
    data.currentBid = bid;
    this.trigger(data);
  },

  onAcceptBid(bidId) {
    API.putData('bid/' + bidId, { accepted: 1 }).then(function(bid) {
      Actions.fetchBids();
      Actions.hideModal();
    }).fail(function(error) {
      Actions.modalError(error.responseText);
    });
  },

  onDeclineBid(bidId) {
    API.putData('bid/' + bidId, { accepted: -1 }).then(function(bid) {
      Actions.fetchBids();
      Actions.hideModal();
    }).fail(function(error) {
      Actions.modalError(error.responseText);
    });
  },

  getCurrentBid() {
    return data.currentBid;
  },

  getDefaultData() {
    return data;
  }
});

export default BidsStore;
