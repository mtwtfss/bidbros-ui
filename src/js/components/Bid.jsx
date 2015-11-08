'use strict';

import React from 'react/addons';
import { Link } from 'react-router';
import Actions from '../actions/Actions';
import timeAgo from '../util/timeAgo';

const Bid = React.createClass({
  propTypes: {
    bid: React.PropTypes.object
  },

  accept() {
    Actions.acceptBid(this.props.bid.id);
  },

  decline() {
    Actions.declineBid(this.props.bid.id);
  },

  render() {
    let bid = this.props.bid;
    let agent = bid.agent;

    var imgStyle = { verticalAlign: 'middle' };

    return (
      <div className="bid">
<table className="tg">
  <tr>
    <td className="realtor-image" style={ imgStyle } rowSpan="5"> <img src="images/waldo.jpg" height="200" width="200"/> </td>
    <td className="duration" textAlign="left"> Duration (days): </td>
    <td className="duration-value"> {bid.duration} ({agent.duration_min}-{agent.duration_max})</td>
  </tr>
  <tr>
    <td className="closingprice" textAlign="left"> Closing Price: </td>
    <td className="closingprice-value"> ${bid.close_price} ({agent.profit_range_min}-{agent.profit_range_max})</td>
  </tr>
  <tr>
    <td className="commission"> Commission: </td>
    <td className="commission-value"> { bid.commission} </td>
  </tr>
  <tr>
    <td className="review"> Rating: {bid.agent.yelp_rating}/5 ({bid.agent.review_count} reviews) </td>
    <td className="review-value"></td>
  </tr>
  <tr>
    <td className="accept" onClick={ this.accept }> Accept </td>
    <td className="decline" onClick={ this.decline }> Decline </td>
  </tr>
</table>
      </div>
    );
  }
});

export default Bid;
