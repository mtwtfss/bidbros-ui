'use strict';

import Reflux from 'reflux';
import React from 'react/addons';
import Actions from '../actions/Actions';
import { Navigation, TransitionHook } from 'react-router';

import SingleBidStore from '../stores/SingleBidStore';
import BidsStore from '../stores/BidsStore';
import AgentStore from '../stores/AgentStore';
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
    Reflux.listenTo(SingleBidStore, 'updateBid')
  ],

  getInitialState() {
    let bidData = SingleBidStore.getDefaultData();

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

    var agent = AgentStore.getAgent(bid.agent_id);
    if (agent) {
      bid.agentname = agent.agentname;
    } else {
      bid.agentname = 'Agent ' + bid.agent_id;
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
