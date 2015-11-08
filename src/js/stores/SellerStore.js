'use strict';

import Reflux from 'reflux';
import API from '../util/api';
import Actions from '../actions/Actions';

let data = {
  sellers: {},
  currentSeller: null
};

let sellersHash = function(sellers) {
  var result = {};
  sellers.forEach(function(seller) { result[seller.id] = seller; });
  return result;
};

const SellerStore = Reflux.createStore({
  listenables: Actions,

  onFetchSellers() {
    var _this = this;
    API.fetchData('sellers').then(function(sellers) {
      data = { sellers: sellersHash(sellers.data), currentSeller: data.currentSeller };
      _this.trigger(data);
    }).fail(function(error) {
      Actions.modalError(error.responseText);
    });
  },

  onFetchSeller() {
    var _this = this;
    API.fetchData('seller').then(function(seller) {
      data = { sellers: data.sellers, currentSeller: seller.data};
      _this.trigger(data);
    }).fail(function(error) {
      Actions.modalError(error.responseText);
    });
  },

  onSellerLogin(loginData) {
    var _this = this;
    API.sellerLogin(loginData).then(function(seller) {
      data = { sellers: data.sellers, currentSeller: seller.data };
      _this.trigger(data);
      Actions.nextModal();
    }).fail(function(error) {
      Actions.modalError(error.responseText);
    });
  },

  onSellerLogout() {
    data = { sellers: data.sellers, currentSeller: null };
    this.trigger(data);
  },

  getDefaultData() {
    return data;
  },

  getSeller(id) {
    return data.sellers[id];
  },

  getSellers() {
    return data.sellers;
  },

  getCurrentSeller() {
    return data.currentSeller;
  }
});

export default SellerStore;
