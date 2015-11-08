'use strict';

import React from 'react/addons';
import Actions from '../actions/Actions';

const SellerSettings = React.createClass({
  propTypes: {
    seller: React.PropTypes.object
  },


  logout() {
    Actions.sellerLogout();
  },

  render() {
    return (
      <span id="header">
        <h1><a href="index.html"></a>{ this.props.seller.full_name }</h1>
        <div id="nav">
        <a onClick={ this.logout }>Logout</a>
        </div>
      </span>
    );
  }
});

export default SellerSettings;


