'use strict';

import React from 'react/addons';
import Actions from '../actions/Actions';

const AgentSettings = React.createClass({
  propTypes: {
    agent: React.PropTypes.object
  },


  logout() {
    Actions.agentLogout();
  },

  render() {
    return (

      <span id="header">
        <h1><a href="index.html"></a>{ this.props.agent.agent_id }</h1>
        <div id="nav">
        <a onClick={ this.logout }>Logout</a>
        </div>
      </span>



    );
  }
});

export default AgentSettings;
