'use strict';

import Reflux from 'reflux';
import React from 'react/addons';
import Actions from '../actions/Actions';
import { Navigation, TransitionHook } from 'react-router';

import BidsStore from '../stores/BidsStore';
import UserStore from '../stores/UserStore';
import Spinner from '../components/Spinner';
import Bid from '../components/Bid';

const Bids = React.createClass({
  propTypes: {
    params: React.PropTypes.object
  },

  mixins: [
    Navigation,
    TransitionHook,
    Reflux.listenTo(BidsStore, 'updateBids')
  ],

  getInitialState() {
    let bidData = BidsStore.getDefaultData();

    return {
      loading: true,
      bids: bidData.bids,
      bidRange: bidData.bidRange
    };
  },

  componentDidMount() {
    Actions.fetchBids();
  },

  routerWillLeave() {},

  updateBids(bidData) {
    var users = UserStore.getUsers();
    bidData.bids.forEach(function(bid) {
      var user = users[bid.user_id];

      if (user) {
        bid.username = users[bid.user_id].username;
      } else {
        bid.username = 'User ' + bid.user_id;
      }
    });

    this.setState({
      loading: false,
      bids: bidData.bids,
      bidRange: bidData.bidRange
    });
  },

  loadMoreBids() {
    Actions.expandBidRange();
  },

  render() {
    let bids = this.state.bids;
    let bidRange = this.state.bidRange;

    if (bids.length) {
      bids = bids.slice(0, bidRange).map(function(bid) {
        return <Bid bid={ bid } key={ bid.id } />;
      });
    } else {
      bids = 'There are no bids yet!';
    }

    return (
      <div className="content full-width">
        <div className="bids">
          { this.state.loading ? <Spinner /> : bids }
        </div>
        {
          this.state.bids.length > this.state.bidRange ? (
            <nav className="pagination">
              <hr />
              <a onClick={ this.loadMoreBids } className="load-more">Load More Bids</a>
            </nav>
          ) : null
        }
      </div>
    );
  }
});

export default Bids;
