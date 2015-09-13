'use strict';

import Reflux from 'reflux';
import API from '../util/api';
import Actions from '../actions/Actions';

let data = {
  users: {},
  currentUser: null
};

let usersHash = function(users) {
  var result = {};
  users.forEach(function(user) { result[user.id] = user; });
  return result;
};

const UserStore = Reflux.createStore({
  listenables: Actions,

  onFetchUsers() {
    var _this = this;
    API.fetchData('users').then(function(users) {
      data = { users: usersHash(users.data), currentUser: data.currentUser };
      _this.trigger(data);
    }).fail(function(error) {
      Actions.modalError(error.responseText);
    });
  },

  onFetchUser() {
    var _this = this;
    API.fetchData('user').then(function(user) {
      data = { users: data.users, currentUser: user.data};
      _this.trigger(data);
    }).fail(function(error) {
      Actions.modalError(error.responseText);
    });
  },

  onLogin(loginData) {
    var _this = this;
    API.login(loginData).then(function(user) {
      data = { users: data.users, currentUser: user.data };
      _this.trigger(data);
      Actions.nextModal();
    }).fail(function(error) {
      Actions.modalError(error.responseText);
    });
  },

  onLogout() {
    var _this = this;
    API.logout().then(function(response) {
      data = { users: data.users, currentUser: null };
      _this.trigger(data);
    }).fail(function(error) {
      Actions.modalError(error.responseText);
    });
  },

  getDefaultData() {
    return data;
  },

  getUser(id) {
    return data.users[id];
  },

  getUsers() {
    return data.users;
  },

  getCurrentUser() {
    return data.currentUser;
  }
});

export default UserStore;
