'use strict';

import Reflux from 'reflux';
import React from 'react/addons';
import Bids from './Bids';
import Listings from './Listings';

const Base = React.createClass({
  render() {
    if (this.props.agent) {
      return <Listings />;
    } else if (this.props.seller) {
      return <Bids />;
    } else {
      return <div className="content full-width">Please login</div>;
    }
  }
});

export default Base;
