'use strict';

import Reflux from 'reflux';
import React from 'react/addons';
import Actions from '../actions/Actions';
import { Navigation, TransitionHook } from 'react-router';

import SingleListingStore from '../stores/SingleListingStore';
import ListingsStore from '../stores/ListingsStore';
import AgentStore from '../stores/AgentStore';
import Spinner from '../components/Spinner';
import Listing from '../components/Listing';

const SingleListing = React.createClass({
  propTypes: {
    params: React.PropTypes.object
  },

  mixins: [
    Navigation,
    TransitionHook,
    Reflux.listenTo(ListingsStore, 'newListing'),
    Reflux.listenTo(SingleListingStore, 'updateListing')
  ],

  getInitialState() {
    let listingData = SingleListingStore.getDefaultData();

    return {
      loading: true,
      listing: listingData.listing
    };
  },

  componentDidMount() {
    let { listingId } = this.props.params;
    Actions.fetchListing(listingId);
  },

  routerWillLeave() {},

  newListing(data) {
    var listing = data.listings[0];
    this.setState({ listing: listing });
    this.transitionTo(`/listing/${listing.id}`);
  },

  updateListing(listing) {
    if (!listing.id) {
      this.transitionTo('/404');
      return;
    }

    var agent = AgentStore.getAgent(listing.agent_id);
    if (agent) {
      listing.agentname = agent.agentname;
    } else {
      listing.agentname = 'Agent ' + listing.agent_id;
    }

    this.setState({ listing: listing, loading: false });
  },

  render() {
    let content;
    let { loading, listing } = this.state;
    let { listingId } = this.props.params;

    if (loading) {
      content = <Spinner />;
    } else {
      content = (
        <div>
          <Listing listing={ listing } key={ listingId } />
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

export default SingleListing;
