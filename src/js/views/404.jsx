'use strict';

import Reflux from 'reflux';
import React from 'react/addons';
import Actions from '../actions/Actions';
import BidsStore from '../stores/BidsStore';
import { Navigation, TransitionHook } from 'react-router';

// components
const Link = require('react-router').Link;

const uhOh = React.createClass({
  mixins: [
    Navigation,
    TransitionHook,
    Reflux.listenTo(BidsStore, 'newBid')
  ],

  routerWillLeave() {},

  newBid(data) {
    var bid = data.bids[0];
    this.setState({ bid: bid });
    this.transitionTo(`/bid/${bid.id}`);
  },

  render() {
    return (
      <div className="content full-width">
        <h1>{ 'That Page Doesn\'t Exist' }</h1>
        <p><Link to="/">Return to the homepage</Link></p>
      </div>
    );
  }
});

export default uhOh;
