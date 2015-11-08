'use strict';

import React from 'react/addons';
import { Link } from 'react-router';

import Actions from '../actions/Actions';

import abbreviateNumber from '../util/abbreviateNumber';
import pluralize from '../util/pluralize';
import hostNameFromUrl from '../util/hostNameFromUrl';
import timeAgo from '../util/timeAgo';

const Listing = React.createClass({
  propTypes: {
    agent: React.PropTypes.object,
    listing: React.PropTypes.object
  },

  render() {
    let agent = this.props.agent;
    let listing = this.props.listing;

    if (listing.isDeleted) {
      // listing doesn't exist
      return (
        <div className="listing cf">
          <div className="listing-link">
            [deleted]
          </div>
        </div>
      );
    }

    return (
      <div className="listing">
        <div className="listing-link">
          <Link className="listing-title" to={ `/listing/${listing.id}` }>{ listing.title }</Link>
          <span className="hostname">
            (<a href={ listing.url }>{ hostNameFromUrl(listing.url) }</a>)
          </span>
        </div>
        <div className="listing-info">
          <div className="listinged-by">
            <span className="listing-info-item">
              <Link to={ `/agent/${listing.agent_id}` }>{ listing.agentname }</Link>
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
