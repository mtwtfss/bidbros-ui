'use strict';

import Reflux from 'reflux';
import React from 'react/addons';
import Actions from '../actions/Actions';
import { Navigation, TransitionHook } from 'react-router';

import ListingsStore from '../stores/ListingsStore';
import AgentStore from '../stores/AgentStore';
import Spinner from '../components/Spinner';
import Listing from '../components/Listing';

const Listings = React.createClass({
  propTypes: {
    params: React.PropTypes.object
  },

  mixins: [
    Navigation,
    TransitionHook,
    Reflux.listenTo(ListingsStore, 'updateListings')
  ],

  getInitialState() {
    let listingsData = ListingsStore.getDefaultData();

    return {
      loading: true,
      listings: listingsData.listings,
      listingRange: listingsData.listingRange
    };
  },

  componentDidMount() {
    Actions.fetchListings();
  },

  routerWillLeave() {},

  updateListings(listingsData) {
    var agents = AgentStore.getAgents();
    listingsData.listings.forEach(function(listings) {
      var agent = agents[listings.agent_id];

      if (agent) {
        listings.agentname = agents[listings.agent_id].agentname;
      } else {
        listings.agentname = 'Agent ' + listings.agent_id;
      }
    });

    this.setState({
      loading: false,
      listings: listingsData.listings,
      listingRange: listingsData.listingRange
    });
  },

  loadMoreListings() {
    Actions.expandListingRange();
  },

  render() {
    let listings = this.state.listings;
    let listingRange = this.state.listingRange;

    if (listings.length) {
      listings = listings.slice(0, listingRange).map(function(listing) {
        return <Listing listing={ listing } key={ listing.id } />;
      });
    } else {
      listings = 'There are no listings yet!';
    }

    return (
      <div className="content full-width">
        <div className="listings">
          { this.state.loading ? <Spinner /> : listings }
        </div>
        {
          this.state.listings.length > this.state.listingRange ? (
            <nav className="pagination">
              <hr />
              <a onClick={ this.loadMoreListings } className="load-more">Load More Listings</a>
            </nav>
          ) : null
        }
      </div>
    );
  }
});

export default Listings;
