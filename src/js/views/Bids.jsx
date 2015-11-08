'use strict';

import Reflux from 'reflux';
import React from 'react/addons';
import Actions from '../actions/Actions';
import { Navigation, TransitionHook } from 'react-router';

import BidsStore from '../stores/BidsStore';
import AgentStore from '../stores/AgentStore';
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
    var agents = AgentStore.getAgents();
    bidData.bids.forEach(function(bid) {
      var agent = agents[bid.agent_id];

      if (agent) {
        bid.agentname = agents[bid.agent_id].agentname;
      } else {
        bid.agentname = 'Agent ' + bid.agent_id;
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



                                <section id="main" className="container">

                                        <section className="box special">
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

                                        </section>
				</section>

    );
  }
});

export default Bids;
