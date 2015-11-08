'use strict';

import Reflux from 'reflux';
import API from '../util/api';
import Actions from '../actions/Actions';

let listing = {};

const SingleStore = Reflux.createStore({
  listenables: Actions,

  onFetchListing(listingId) {
    var _this = this;
    API.fetchData('listing/' + listingId).then(function(listingData) {
      listing = listingData.data;
      _this.trigger(listing);
    }).fail(function() {
      listing = {};
      _this.trigger(listing);
    });
  },

  getDefaultData() {
    return listing;
  }
});

export default SingleStore;
