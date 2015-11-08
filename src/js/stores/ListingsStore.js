'use strict';

import Reflux from 'reflux';
import API from '../util/api';
import Actions from '../actions/Actions';

let listingRangeStep = 10;

let data = {
  listings: [],
  currentListing: null,
  listingRange: 10
};

const ListingsStore = Reflux.createStore({
  listenables: Actions,

  onFetchListings() {
    var _this = this;
    API.fetchData('listings').then(function(listingsData) {
      data.listings = listingsData.data;
      _this.trigger(data);
    }).fail(function() {
      window.alert('Unable to fetch listing data');
    });
  },

  onSetCurrentListing(listing) {
    data.currentListing = listing;
    this.trigger(data);
  },

  onSubmitListing(listingData) {
    var _this = this;
    API.postData('listing', listingData).then(function(listing) {
      data.listings.unshift(listing.data);
      _this.trigger(data);
      Actions.hideModal();
    }).fail(function(error) {
      Actions.modalError(error.responseText);
    });
  },

  onExpandListingRange() {
    data.listingRange = data.listingRange + listingRangeStep;
    this.trigger(data);
  },

  getDefaultData() {
    return data;
  },

  getCurrentListing() {
    return data.currentListing;
  }
});

export default ListingsStore;
