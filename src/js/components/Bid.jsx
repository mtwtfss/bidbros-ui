'use strict';

import React from 'react/addons';
import { Link } from 'react-router';

import Actions from '../actions/Actions';

import abbreviateNumber from '../util/abbreviateNumber';
import pluralize from '../util/pluralize';
import hostNameFromUrl from '../util/hostNameFromUrl';
import timeAgo from '../util/timeAgo';

const Bid = React.createClass({
  propTypes: {
    agent: React.PropTypes.object,
    bid: React.PropTypes.object
  },

  render() {
    let agent = this.props.agent;
    let bid = this.props.bid;

    if (bid.isDeleted) {
      // bid doesn't exist
      return (
        <div className="bid cf">
          <div className="bid-link">
            [deleted]
          </div>
        </div>
      );
    }

    return (
      <div className="bid">
        <div className="bid-link">
          <Link className="bid-title" to={ `/bid/${bid.id}` }>{ bid.title }</Link>
          <span className="hostname">
            (<a href={ bid.url }>{ hostNameFromUrl(bid.url) }</a>)
          </span>
        </div>
        <div className="bid-info">
          <div className="bided-by">
            <span className="bid-info-item">
              <Link to={ `/agent/${bid.agent_id}` }>{ bid.agentname }</Link>
            </span>
            <span className="bid-info-item">
              { timeAgo(bid.created_at) }
            </span>
          </div>
        </div>
      </div>
    );
  }
});

export default Bid;
