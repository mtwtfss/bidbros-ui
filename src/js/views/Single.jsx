'use strict';

import Reflux from 'reflux';
import React from 'react/addons';
import Actions from '../actions/Actions';
import { Navigation, TransitionHook } from 'react-router';

import SingleStore from '../stores/SingleStore';
import BidsStore from '../stores/BidsStore';
import UserStore from '../stores/UserStore';
import Spinner from '../components/Spinner';
import Bid from '../components/Bid';

const SingleBid = React.createClass({
  propTypes: {
    params: React.PropTypes.object
  },

  mixins: [
    Navigation,
    TransitionHook,
    Reflux.listenTo(BidsStore, 'newBid'),
    Reflux.listenTo(SingleStore, 'updateBid')
  ],

  getInitialState() {
    let bidData = SingleStore.getDefaultData();

    return {
      loading: true,
      bid: bidData.bid
    };
  },

  componentDidMount() {
    let { bidId } = this.props.params;
    Actions.fetchBid(bidId);
  },

  routerWillLeave() {},

  newBid(data) {
    var bid = data.bids[0];
    this.setState({ bid: bid });
    this.transitionTo(`/bid/${bid.id}`);
  },

  updateBid(bid) {
    if (!bid.id) {
      this.transitionTo('/404');
      return;
    }

    var user = UserStore.getUser(bid.user_id);
    if (user) {
      bid.username = user.username;
    } else {
      bid.username = 'User ' + bid.user_id;
    }

    this.setState({ bid: bid, loading: false });
  },

  render() {
    let content;
    let { loading, bid } = this.state;
    let { bidId } = this.props.params;

    if (loading) {
      content = <Spinner />;
    } else {
      content = (
        <div>
          <Bid bid={ bid } key={ bidId } />
        </div>
      );
    }

    return (
      <div className="content full-width">
        { content }
      </div>
    );
  }
});

export default SingleBid;
