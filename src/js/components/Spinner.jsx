'use strict';

import React from 'react/addons';

const Spinner = React.createClass({
  render() {
    var bars = [];
    var barStyle;

    for (var i = 0; i < 12; i++) {
      barStyle = {};
      barStyle.WebkitAnimationDelay = barStyle.animationDelay =
        (i - 12) / 10 + 's';
      barStyle.WebkitTransform = barStyle.transform =
        'rotate(' + (i * 30) + 'deg) translate(146%)';
      bars.push(
        <div style={ barStyle } className="react-spinner_bar" key={ i } />
      );
    }

    return (
      <div { ...this.props } className="react-spinner">
        { bars }
      </div>
    );
  }
});

export default Spinner;
