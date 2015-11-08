'use strict';

import React from 'react/addons';
import Actions from '../actions/Actions';

const LoginLinks = React.createClass({
  render() {
    return (
      <span className="login-links">
        <a onClick={ () => Actions.showModal('sellerlogin') }>Seller Sign In</a>
        <a onClick={ () => Actions.showModal('sellerregister') } className="register-link">Seller Register</a>
        <a onClick={ () => Actions.showModal('agentlogin') }>Agent Sign In</a>
        <a onClick={ () => Actions.showModal('agentregister') } className="register-link">Agent Register</a>
      </span>
    );
  }
});

export default LoginLinks;
