'use strict';

import React from 'react/addons';
import { Link } from 'react-router';
import Actions from '../actions/Actions';
import AgentStore from '../stores/AgentStore';
import timeAgo from '../util/timeAgo';

const Listing = React.createClass({
  propTypes: {
    agent: React.PropTypes.object,
    listing: React.PropTypes.object
  },

  newBid() {
    if (Actions.setCurrentListing(this.props.listing) && AgentStore.getCurrentAgent()) {
      Actions.showModal('newbid');
    } else {
      Actions.showModal('agentlogin', 'You have to be logged in as an Agent to do that', ['newbid']);
    }
  },

  render() {
    let listing = this.props.listing;

    return (
      <div className="listing">
        <div className="listing-link">
          <Link className="listing-title" to={ `/listing/${listing.id}` }>Listing { listing.id }</Link>
        </div>
        <div className="listing-info">
          <div className="listinged-by">
            <span className="listing-info-item">
              <Link to={ `/seller/${listing.seller_id}` }>Seller { listing.seller_id }</Link>
            </span>
            <span className="listing-info-item">
              { timeAgo(listing.created_at) }
            </span>
            <a className="newlisting-link" onClick={ this.newBid }>
              <i className="fa fa-plus-square-o"></i>
              <span className="sr-only">Bid on this listing</span>
            </a>
          </div>
        </div>
      </div>
    );
  }
});

export default Listing;
