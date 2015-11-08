'use strict';

import React from 'react/addons';
import { Link } from 'react-router';
import Actions from '../actions/Actions';
import timeAgo from '../util/timeAgo';

const Bid = React.createClass({
  propTypes: {
    agent: React.PropTypes.object,
    bid: React.PropTypes.object
  },

  render() {
    let agent = this.props.agent;
    let bid = this.props.bid;

    return (
      <div className="bid">
        <div className="bid-link">
          <Link className="bid-title" to={ `/bid/${bid.id}` }>Bid { bid.id }</Link>
        </div>
        <div className="bid-info">
          <div className="bided-by">
            <span className="bid-info-item">
              <Link to={ `/agent/${bid.agent_id}` }>Agent { bid.agent_id }</Link>
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
