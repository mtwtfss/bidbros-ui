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

  login: function(loginData) {
    return $.ajax({
      type: 'POST',
      data: { user: loginData },
      url: 'http://localhost:9292/login',
      xhrFields: { withCredentials: true },
      crossDomain: true,
      cache: false
    }).promise();
  },

  logout: function(path) {
    return $.ajax({
      url: 'http://localhost:9292/logout',
      xhrFields: { withCredentials: true },
      crossDomain: true,
      cache: false
    }).promise();
  }
};
