'use strict';

import React from 'react/addons';
import { Link } from 'react-router';
import Actions from '../actions/Actions';
import timeAgo from '../util/timeAgo';

const Listing = React.createClass({
  propTypes: {
    seller: React.PropTypes.object,
    listing: React.PropTypes.object
  },

  render() {
    let seller = this.props.seller;
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
          </div>
        </div>
      </div>
    );
  }
});

export default Listing;
