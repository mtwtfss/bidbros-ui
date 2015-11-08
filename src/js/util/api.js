'use strict';

module.exports = {
  fetchData: function(path) {
    return $.ajax({
      url: 'http://localhost:9292/' + path,
      xhrFields: { withCredentials: true },
      crossDomain: true,
      cache: false
    }).promise();
  },

  putData: function(path, data) {
    return $.ajax({
      type: 'PUT',
      data: data,
      url: 'http://localhost:9292/' + path,
      xhrFields: { withCredentials: true },
      crossDomain: true,
      cache: false
    }).promise();
  },

  postData: function(path, data) {
    return $.ajax({
      type: 'POST',
      data: data,
      url: 'http://localhost:9292/' + path,
      xhrFields: { withCredentials: true },
      crossDomain: true,
      cache: false
    }).promise();
  },

  agentLogin: function(loginData) {
    return $.ajax({
      type: 'POST',
      data: loginData,
      url: 'http://localhost:9292/agent_login',
      xhrFields: { withCredentials: true },
      crossDomain: true,
      cache: false
    }).promise();
  },

  sellerLogin: function(loginData) {
    return $.ajax({
      type: 'POST',
      data: loginData,
      url: 'http://localhost:9292/seller_login',
      xhrFields: { withCredentials: true },
      crossDomain: true,
      cache: false
    }).promise();
  },

  registerSeller: function(sellerData) {
    return $.ajax({
      type: 'POST',
      data: sellerData,
      url: 'http://localhost:9292/seller',
      xhrFields: { withCredentials: true },
      crossDomain: true,
      cache: false
    }).promise();
  },

  registerAgent: function(agentData) {
    return $.ajax({
      type: 'POST',
      data: agentData,
      url: 'http://localhost:9292/agent',
      xhrFields: { withCredentials: true },
      crossDomain: true,
      cache: false
    }).promise();
  }
};
