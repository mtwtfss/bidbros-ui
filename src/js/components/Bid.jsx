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

    var imgStyle = { verticalAlign: 'middle' };

    return (
      <div className="bid">
<table className="tg">
  <tr>
    <td className="realtor-image" style={ imgStyle } rowSpan="5"> <img src="images/waldo.jpg" height="200" width="200"/> </td>
    <td className="duration" textAlign="left"> Duration (days): </td>
    <td className="duration-value"> {bid.duration} </td>
  </tr>
  <tr>
    <td className="closingprice" textAlign="left"> Closing Price: </td>
    <td className="closingprice-value"> ${bid.close_price} </td>
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
    <td className="accept"> Accept </td>
    <td className="decline"> Decline </td>
  </tr>
</table>
      </div>
    );
  }
});

export default Bid;
