'use strict';

import React from 'react/addons';
import Actions from '../actions/Actions';

const UserSettings = React.createClass({
  propTypes: {
    user: React.PropTypes.object
  },


  logout() {
    Actions.logout();
  },

  render() {
    return (
      <span className="user-settings">
        <span>{ this.props.user.username }</span>
        <a onClick={ this.logout }>Logout</a>
      </span>
    );
  }
});

export default UserSettings;
